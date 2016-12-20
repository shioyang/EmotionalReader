import { Component, OnInit } from '@angular/core';
import { ErService } from './er.service';
import { Emotion } from './emotion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Emotional Reader';
  status: string = 'App Works!';
  emotions: Array<Emotion> = [];
  paragraph: string = '';
  debugMode: boolean = false;

  constructor(private erService: ErService){}

  ngOnInit(): void {
    this.status = 'App Loaded!';
  }

  onSubmit(): void {
    this.status = 'Submitted!';
    console.log(this.paragraph);
    this.showParagraphEmotion();
  }

  showSentenceEmotion(): void {
    this.erService.getEmotion(this.paragraph)
      .subscribe((emo: Emotion) => this.emotions = [emo]);
      // .subscribe((emo: Emotion) => this.emotions = emo.toString());
  }

  showParagraphEmotion(): void {
    this.erService.getEmotionsFromParagraph(this.paragraph)
      .subscribe((emotions: Array<Emotion>) => this.emotions = emotions);
      // .subscribe((emotions: Array<Emotion>) => this.response = this.emotionsToString(emotions));
  }

  private emotionsToString(emotions: Array<Emotion>): string {
    let ret: string = "";
    return emotions.map(function(emo){
             return emo.toString();
           }).join('\n');
  }
}
