import { Component, OnInit } from '@angular/core';
import { ErService } from './er.service';
import { Emotion } from './emotion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'app works!';
  emotion: Emotion;
  story: string = '';
  response: string = '';

  constructor(private erService: ErService){}

  ngOnInit(): void {
    this.title = 'loaded!';
  }

  onSubmit(): void {
    this.title = 'submitted!';
    console.log(this.story);
//    this.erService.getSampleEmotion()
//      .subscribe(emo => this.emotion = emo);
    this.showSentenceEmotion();
  }

  showSentenceEmotion(): void {
    this.erService.getEmotion(this.story)
      .subscribe((emo: Emotion) => this.response = emo.toString());
  }
}
