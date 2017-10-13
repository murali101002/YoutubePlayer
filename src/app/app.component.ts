import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {ApiService} from './api.service';
import {ItemsResponse} from './items-response';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {YoutubePlayer} from 'youtube-player';
import {Video} from './video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  results: string[];
  title = 'app';
  videos: string[];
  user: Observable<firebase.User>;
  videoId:any;
  videoObject:any;
  player:YT.Player;
  searchQuery:string;
  constructor(public authService: AuthService, private router:Router, 
    firebaseAuth: AngularFireAuth, private apiService: ApiService) {
    this.user = firebaseAuth.authState;
    if(firebaseAuth.auth.currentUser!==null){ 
      this.router.navigate(['/player']);
    }
    // this.search();
  }
  loadVideo(id){
    this.videoId = id;
    this.player.loadVideoById(this.videoId);
  }
  logout(){
    this.authService.logout();
  }
  savePlayer(player){
    this.player = player;
    this.player.loadVideoById(this.videoId);
    console.log('id',this.videoId);
    console.log('player',player);
  }
  search(){
    this.videoId = '';
    this.apiService.getVideosList('5',this.searchQuery,'search').subscribe(videos=>{
      this.videos=videos['items'];
      console.log('videos',this.videos);
      this.videoObject = this.videos.length>0?this.videos[0]['id']:'';
      const videoObjectKeys = Object.keys(this.videoObject);
      console.log('videoObject',this.videoObject);
      const action = videoObjectKeys.length>0?
                        videoObjectKeys[1]==='playlistId'?
                          'playlistitems':videoObjectKeys[1]==='channelId'?
                              'channels':'search':
                                'search';
      
      console.log('action',action);
      this.videoId = this.videoObject?this.videoObject['videoId']:'';
    });
  }
}
