import {ItemsResponse} from './items-response';
import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {URLSearchParams, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {
  constructor(public http: HttpClient) { }
  baseUrl = 'https://www.googleapis.com/youtube/v3/';
  myKey = 'AIzaSyBuQrouVr4vRimrNnam9mVvRsGV07dm6nY';
  getVideosList(limit:string='10',searchQuery:string, action:string){
    // console.log('url',this.url);
    const url = `${this.baseUrl}${action}?`;
    const params = new HttpParams().set('q',searchQuery)
    .set('part','snippet')
    .set('maxResults',limit)
    .set('key',this.myKey);
    return this.http
                .get(url, {params})
                .map((res:Response)=>res)
                .catch(this.handleError);
  }
  getPlaylist(limit:string, playlistId:string){
    const url = `${this.baseUrl}playlistItems?`;
    const params = new HttpParams().set('playlistId',playlistId)
                                    .set('maxResults',limit)
                                    .set('part','snippet,contentDetails')
                                    .set('key',this.myKey);
    return this.http
                .get(url, {params})
                .map((res:Response)=>res)
                .catch(this.handleError);
  }
  getPlaylistFromChannelId(channelId:string){
    const url = `${this.baseUrl}channels?`;
    const params = new HttpParams().set('id',channelId)
                                    .set('part','snippet,contentDetails')
                                    .set('key',this.myKey);
    return this.http
                .get(url, {params})
                .map((res:Response)=>res)
                .catch(this.handleError);
  }
  private handleError(err:HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
