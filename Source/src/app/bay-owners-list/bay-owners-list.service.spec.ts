import { TestBed, inject } from '@angular/core/testing';
import {
    Http,
    Response,
    BaseRequestOptions,
    ConnectionBackend,
    XHRBackend,
    ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BayOwnersListService } from './bay-owners-list.service';
import { AbsenceView } from '../dtos/absenceView';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';
import { MockBayOwners } from './bay-owners-list.data.mock';

describe('AbsenceViewListService', () => {

    let service: BayOwnersListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BayOwnersListService,
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

        service = TestBed.get(BayOwnersListService);
    });

    it('should be created', inject([BayOwnersListService], (service: BayOwnersListService) => {
        expect(service).toBeTruthy();
    }));

    it('should contain the getBayOwnersList function', (() => {
        expect(service.getBayOwnersList).toBeDefined();
    }));

    it('getBayOwnersList should return employees', inject([BayOwnersListService, MockBackend], (service: BayOwnersListService, backend: MockBackend) => {

        let response = new ResponseOptions({
            body: JSON.stringify(MockBayOwners)
        });

        const baseResponse = new Response(response);

        backend.connections.subscribe(
            (c: MockConnection) => c.mockRespond(baseResponse)
        );

        return service.getBayOwnersList().subscribe(data => {

            expect(data.length).toEqual(2);
            expect(data[0].FirstName).toEqual('Rick');
            expect(data[0].Id).toEqual(12);
            expect(data[0].ParkingBay.BayNumber).toEqual(50);
        });
    }));
});