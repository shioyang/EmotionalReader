export class Emotion {
  anger: number;
  joy: number;
  fear: number;
  sadness: number;
  surprise: number;

  sentence: string;

  constructor(json: any){
    var arr = ["anger", "joy", "fear", "sadness", "surprise", "sentence"];
    arr.forEach(function(val){
      if(json[val]){
        this[val] = json[val];
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
