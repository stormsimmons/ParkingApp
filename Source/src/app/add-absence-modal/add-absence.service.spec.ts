import { TestBed, inject } from '@angular/core/testing';
import {
  Http,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AddAbsenceService } from './add-absence.service';

describe('AddAbsenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAbsenceService, 
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }, { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ]
    });
  });

  it('should be created', inject([AddAbsenceService], (service: AddAbsenceService) => {
    expect(service).toBeTruthy();
  }));
  
});
