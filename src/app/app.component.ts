import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { ItemsResponse } from './items-response';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { YoutubePlayer } from 'youtube-player';
import { Video } from './video';
import 'rxjs/add/operator/catch';
import { CookieService } from 'angular2-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  results: string[];
  title = 'app';
  limit = '5';
  videos: string[];
  user: Observable<firebase.User>;
  videoId: any;
  videoObject: any;
  player: YT.Player;
  searchQuery = '';
  playlist: any;
  channelPlaylistId: any;

  constructor(public authService: AuthService, private router: Router,
    firebaseAuth: AngularFireAuth, private apiService: ApiService,
    private cookieService: CookieService) {
    this.searchQuery = this.cookieService.get('searchQuery');
    console.log('searchQuery', this.searchQuery);
    this.user = firebaseAuth.authState;
    if (firebaseAuth.auth.currentUser !== null) {
      this.router.navigate(['/player']);
    }
  }
  loadPlaylistVideo(video) {
    this.player.loadVideoById(video['contentDetails']['videoId']);
  }
  loadVideo(video) {
    this.videoId = '';
    this.playlist = [];
    try {
      const videoObject = video['id'];
      const videoObjectKeys = Object.keys(videoObject);
      switch (videoObjectKeys[1]) {
        case 'playlistId':
          this.playlistItems(videoObject[videoObjectKeys[1]]);
          break;
        case 'videoId':
          this.videoId = videoObject['videoId'];
          this.player.loadVideoById(this.videoId);
          break;
        case 'channelId':
          this.apiService.getPlaylistFromChannelId(videoObject['channelId']).subscribe(channel => {
            console.log('channel', channel);
            if (channel.items[0].contentDetails.relatedPlaylists.hasOwnProperty('uploads')) {
              this.channelPlaylistId = channel['items']['0']['contentDetails']['relatedPlaylists']['uploads'];
              console.log('channelId', this.channelPlaylistId);
              this.playlistItems(this.channelPlaylistId);
            }
          },
            error => console.log('channel-error', error.message));
          break;
        default:
          console.log('default switch case');
          console.log('default-video', video);
      }
    } catch (ex) {
      console.log('No videos found exception:', ex.message);
    }
  }
  logout() {
    this.authService.logout();
    this.cookieService.removeAll();
    this.videos = [];
    this.videoId = '';
  }
  savePlayer(player) {
    this.player = player;
    this.player.loadVideoById(this.videoId);
    console.log('video_id', this.videoId);
    console.log('player', player);
  }
  search() {
    this.videoId = '';
    this.playlist = [];
    console.log('limit', this.limit);
    this.cookieService.put('searchQuery', this.searchQuery);
    if (this.searchQuery) {
      this.apiService.getVideosList(this.limit, this.searchQuery, 'search').subscribe(videos => {
        this.videos = videos['items'];
        console.log('videos', this.videos);
        this.loadVideo(this.videos[0]);
      },
        error => console.log('exception', error.message));
    }
  }
  playlistItems(playlistId) {
    this.apiService.getPlaylist('15', playlistId)
      .subscribe(playlist => {
        this.playlist = playlist['items'];
        console.log('playlist', this.playlist);
        this.videoId = this.playlist ? this.playlist[0]['contentDetails']['videoId'] : '';
        console.log('playlistVideoId', this.videoId);
      });
  }
  onChange(value) {
    this.search();
  }
}
