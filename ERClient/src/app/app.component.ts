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
  paragraph: string = '';
  response: string = '';

  constructor(private erService: ErService){}

  ngOnInit(): void {
    this.title = 'loaded!';
  }

  onSubmit(): void {
    this.title = 'submitted!';
    console.log(this.paragraph);
//    this.erService.getSampleEmotion()
//      .subscribe(emo => this.emotion = emo);
    this.showSentenceEmotion();
    // this.showSentenceEmotion();
  }

  showSentenceEmotion(): void {
    this.erService.getEmotion(this.paragraph)
      .subscribe((emo: Emotion) => this.response = emo.toString());
  }

  showParagraphEmotion(): void {
    this.erService.getEmotionsFromParagraph(this.paragraph)
      .subscribe((emotions: Array<Emotion>) => this.response = this.emotionsToString(emotions));
  }

  private emotionsToString(emotions: Array<Emotion>): string {
    let ret: string = "";
    return emotions.map(function(emo){
             return emo.toString();
           }).join('\n');
  }
}
