import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
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
    return this.http.post(this.erServerUrl + '/sentence', sentence)
            .map(response => response.json() as Emotion);
  }
}
