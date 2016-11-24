import { Component, OnInit } from '@angular/core';
import { ErService } from './er.service';
import { Emotion } from './emotion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  emotion: Emotion;

  constructor(private erService: ErService){}

  ngOnInit(): void {
    this.erService.getEmotion()
      .subscribe(emo => this.emotion = emo);
    this.title = 'loaded!';
  }
}
