import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ItemsResponse} from '../items-response';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css'],
  providers:[ApiService]
})
export class YoutubePlayerComponent{
  private player;
  private ytEvent;
  id = 'aatr_2MstrI';
  videos: ItemsResponse;
  constructor(public apiService:ApiService) { }
  onStateChange(event){
    this.ytEvent = event.data;
    console.log('event', event);
  }
  savePlayer(player){
    this.player = player;
  }
  playVideo(){
    this.player.playVideo();
  }
  pauseVideo(){
    this.player.pauseVideo();
  }
  // search(){
  //   this.apiService.getVideosList().subscribe(videos=>{
  //     this.videos=videos['items'];
  //     console.log('videos',this.videos);
  //   });

}
