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
  story: string = 'ini';

  constructor(private erService: ErService){}

  ngOnInit(): void {
    this.title = 'loaded!';
  }

  onSubmit(): void {
    this.title = 'loaded!';
    console.log(this.story);
    this.erService.getEmotion()
      .subscribe(emo => this.emotion = emo);
  }
}
