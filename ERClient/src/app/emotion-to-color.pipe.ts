import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emotionToColorPipe'
})
export class EmotionToColorPipe implements PipeTransform {
  defaultColor: string = 'black';
  colorMap: any = {
    anger: 'red',
    joy: 'deeppink',
    fear: 'green',
    sadness: 'blue',
    surprise: 'gold'
  };

  transform(value: string): string {
    return this.colorMap[value] || this.defaultColor;
  }

}
