/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErService } from './er.service';

describe('ErService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErService]
    });
  });

  it('should ...', inject([ErService], (service: ErService) => {
    expect(service).toBeTruthy();
  }));
});
