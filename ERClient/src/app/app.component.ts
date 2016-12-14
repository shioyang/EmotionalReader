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
    // this.showSentenceEmotion();
  }

  showSentenceEmotion(): void {
    this.erService.getEmotion(this.story)
      .subscribe((emo: Emotion) => this.response = emo.toString());
  }

  showParagraphEmotion(): void {
    this.erService.getEmotionsFromParagraph(this.story)
      .subscribe((emotions: Array<Emotion>) => this.response = this.emotionsToString(emotions));
  }

  private emotionsToString(emotions: Array<Emotion>): string {
    let ret: string = "";
    emotions.forEach(function(emo){
      ret += emo.toString();
    });
    return ret;
  }
}
