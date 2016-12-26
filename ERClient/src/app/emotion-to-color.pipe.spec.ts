/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EmotionToColorPipe } from './emotion-to-color.pipe';

describe('EmotionToColorPipe', () => {
  it('create an instance', () => {
    let pipe = new EmotionToColorPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform a value', () => {
    let pipe = new EmotionToColorPipe();
    expect(pipe.transform('surprise')).toEqual('gold');
  });

  it('transform an unknown value', () => {
    let pipe = new EmotionToColorPipe();
    expect(pipe.transform('aaa')).toEqual('black');
  });
});
