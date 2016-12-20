export class Emotion {
  anger: number;
  joy: number;
  fear: number;
  sadness: number;
  surprise: number;

  sentence: string;
  topEmotion: string; // anger, joy, fear, sadness, or surprise

  constructor(json: any){
    let arr = ["anger", "joy", "fear", "sadness", "surprise", "sentence"];
    arr.forEach(function(val){
      if(json[val]){
        this[val] = json[val];
      }
    }, this);
    this.calcTopEmotion();
  }

  private calcTopEmotion(): void {
    let arr = ["anger", "joy", "fear", "sadness", "surprise"];
    let topValue = Math.max(this.anger, this.joy, this.fear, this.sadness, this.surprise);
    arr.forEach(function(val){
      if(this[val] >= topValue){
        this.topEmotion = val;
      }
    }, this);
  }

  toString(): string {
    return "anger: " + this.anger +
            ", joy: " + this.joy +
            ", fear: " + this.fear +
            ", sadness: " + this.sadness +
            ", surprise: " + this.surprise +
            ", sentence: " + this.sentence;
  }
}
