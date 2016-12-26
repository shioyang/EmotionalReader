/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { HttpModule, Http, BaseRequestOptions,
  Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ErService } from './er.service';
import { Emotion } from './emotion';

describe('ErService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ErService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  it('should create the service', inject([ErService], (service: ErService) => {
    expect(service).toBeTruthy();
  }));

  it('should return Array<Emotion>', async(inject([ErService, MockBackend], (service: ErService, mockBackend: MockBackend) => {
    const mockResponse = {
      list: [
        { anger: 0.1, joy: 0.2, fear: 0.3, sadness: 0.4, surprise: 0.5, sentence: 'test1' },
        { anger: 0.1, joy: 0.2, fear: 0.3, sadness: 0.4, surprise: 0.5, sentence: 'test2' },
        { anger: 0.1, joy: 0.2, fear: 0.3, sadness: 0.4, surprise: 0.5, sentence: 'test3' }
      ]
    };

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        headers: new Headers({ 'Content-Type': 'application/json'}),
        body: JSON.stringify(mockResponse)
      })));
    });

    service.getEmotionsFromParagraph('aaa').subscribe((emotions: Array<Emotion>) => {
      expect(emotions.length).toBe(3);
      expect(emotions[0].topEmotion).toEqual('surprise');
    });

  })));
});
