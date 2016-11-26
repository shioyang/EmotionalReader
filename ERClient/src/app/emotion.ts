export class Emotion {
  anger: number;
  joy: number;
  fear: number;
  sadness: number;
  surprise: number;

  sentence: string;

  toString(): string {
    return "anger: " + this.anger +
            ", joy: " + this.joy +
            ", fear: " + this.fear +
            ", sadness: " + this.sadness +
            ", surprise: " + this.surprise +
            ", sentence: " + this.sentence;
  }
}
