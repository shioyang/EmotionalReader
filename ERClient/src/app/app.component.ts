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

  // Images
  img_path: string = 'assets/images/';
  img_anger: string = this.img_path + 'mad_32x32.png';
  img_joy: string = this.img_path + 'happy_32x32.png';
  img_fear: string = this.img_path + 'crying_32x32.png';
  img_sadness: string = this.img_path + 'unhappy_32x32.png';
  img_surprise: string = this.img_path + 'surprised_32x32.png';
  img_s_anger: string = this.img_path + 'mad_16x16.png';
  img_s_joy: string = this.img_path + 'happy_16x16.png';
  img_s_fear: string = this.img_path + 'crying_16x16.png';
  img_s_sadness: string = this.img_path + 'unhappy_16x16.png';
  img_s_surprise: string = this.img_path + 'surprised_16x16.png';
  imgMap = {
    anger: this.img_anger,
    joy: this.img_joy,
    fear: this.img_fear,
    sadness: this.img_sadness,
    surprise: this.img_surprise
  };

  debugMode: boolean = false;

  constructor(private erService: ErService){}

  ngOnInit(): void {
    this.status = 'App Loaded!';
  }

  onClear(): void {
    this.emotions = [];
    this.paragraph = "";
    this.status = 'Cleared!';
  }

  onSample(): void {
    // CHAPTER II
    //   The Pool of Tears - Giant Alice watching Rabbit run away
    // Ref: https://www.cs.cmu.edu/~rgs/alice-table.html
    this.paragraph = "Alice took up the fan and gloves, and, as the hall was very hot, she kept fanning herself all the time she went on talking: `Dear, dear! How queer everything is to-day! And yesterday things went on just as usual. I wonder if I've been changed in the night? Let me think: was I the same when I got up this morning? I almost think I can remember feeling a little different. But if I'm not the same, the next question is, Who in the world am I? Ah, that's the great puzzle!' And she began thinking over all the children she knew that were of the same age as herself, to see if she could have been changed for any of them.";
    this.status = 'Input Sample!';
  }

  onSubmit(): void {
    this.showParagraphEmotion(this.paragraph);
    this.status = 'Submitted!';
  }

  showSentenceEmotion(paragraph: string): void {
    if(!paragraph){ return; }
    this.erService.getEmotion(paragraph)
      .subscribe((emo: Emotion) => this.emotions = [emo]);
      // .subscribe((emo: Emotion) => this.emotions = emo.toString());
  }

  showParagraphEmotion(paragraph: string): void {
    if(!paragraph){ return; }
    this.erService.getEmotionsFromParagraph(paragraph)
      .subscribe((emotions: Array<Emotion>) => this.emotions = emotions);
      // .subscribe((emotions: Array<Emotion>) => this.response = this.emotionsToString(emotions));
  }

  private emotionsToString(emotions: Array<Emotion>): string {
    let ret: string = "";
    return emotions.map(function(emo){
             return emo.toString();
           }).join('\n');
  }

  getImgPath(emotion: Emotion): string {
    return this.imgMap[emotion.topEmotion] || '';
  }
}
