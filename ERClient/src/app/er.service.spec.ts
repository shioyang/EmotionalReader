/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';

import { ErService } from './er.service';

describe('ErService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ErService]
    });
  });

  it('should ...', inject([ErService], (service: ErService) => {
    expect(service).toBeTruthy();
  }));
});
