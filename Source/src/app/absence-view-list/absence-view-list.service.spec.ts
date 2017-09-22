import { TestBed, inject} from '@angular/core/testing';
import {
  Http,
  Response,
  BaseRequestOptions,
  ConnectionBackend,
  XHRBackend,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AbsenceViewListService } from './absence-view-list.service';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { AbsenceView } from '../dtos/absenceView';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';
import { MockAbsenceViews } from './absence-view.data.mock';

describe('AbsenceViewListService', () => {

  let service: AbsenceViewListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsenceViewListService,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },

          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }]
    });

    service = TestBed.get(AbsenceViewListService);
  });

  it('should be created', inject([AbsenceViewListService], (service: AbsenceViewListService) => {
    expect(service).toBeTruthy();
  }));

  it('should contain the getAbsenceViewList function', (() => {
    expect(service.getAbsenceViewList).toBeDefined();
  }));

  it('should contain the postReserveParking function', (() => {
    expect(service.postReserveParking).toBeDefined();
  }));

  it('should contain the postCancelReservedParkingbay function', (() => {
    expect(service.postCancelReservedParkingbay).toBeDefined();
  }));

  it('getAbsenceViewList should return absencViews', inject([AbsenceViewListService, MockBackend], (service: AbsenceViewListService, backend: MockBackend) => {

    let response = new ResponseOptions({
      body: JSON.stringify(MockAbsenceViews)
    });

    const baseResponse = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return service.getAbsenceViewList(SearchDateCriteria.Month).subscribe(data => {

      expect(data[0].BayOwner).toEqual('John Wick');
      expect(data.length).toEqual(2);
      expect(data[0].EmployeeId).toEqual(1);
      expect(data[0].ParkingBaynumber.BayNumber).toEqual(21);
    });
  }));
});
