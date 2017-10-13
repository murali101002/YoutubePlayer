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
    .set('key',this.myKey);
    // params.del ete('maxResult');
    return this.http
                .get(url, {params})
                .map((res:Response)=>res)
                .filter(data=>data['items'])
                .catch(this.handleError);
  }
  private handleError(err:HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
