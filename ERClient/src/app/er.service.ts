import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Emotion } from './emotion';

import 'rxjs/Rx'; //for operators

@Injectable()
export class ErService {
  private erServerUrl = 'er/emotion';

  constructor(private http: Http) {}

  getEmotion(): Observable<Emotion> {
    return this.http.get(this.erServerUrl)
            .map(response => response.json() as Emotion);
  }
}
