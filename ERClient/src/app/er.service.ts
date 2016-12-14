import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Emotion } from './emotion';

import 'rxjs/Rx'; //for operators

@Injectable()
export class ErService {
  private erServerUrl = 'er';

  constructor(private http: Http) {}

  getSampleEmotion(): Observable<Emotion> {
    return this.http.get(this.erServerUrl + '/emotion')
            .map(response => response.json() as Emotion);
  }

  getEmotion(sentence: string): Observable<Emotion> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.erServerUrl + '/sentence', JSON.stringify({sentence: sentence}), options)
            .map(response => new Emotion(response.json()));
  }

  getEmotionsFromParagraph(paragraph: string): Observable<Emotion[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.erServerUrl + '/paragraph', JSON.stringify({paragraph: paragraph}), options)
            .map(res => this.createEmotionsFromJson(res.json()));
  }

  private createEmotionsFromJson(json: any): Array<Emotion> {
    let arr = json.list;
    let ret: Array<Emotion> = [];
    if(arr && arr.length > 0){
      arr.forEach(function(obj){
        ret.push(new Emotion(obj));
      })
    }
    return ret;
  }
}
