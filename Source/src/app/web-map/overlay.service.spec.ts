import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http,
  Response,
  BaseRequestOptions,
  ConnectionBackend,
  ResponseOptions
} from '@angular/http';
import { OverlayService } from './overlay.service';
import { AppModule } from '../app.module';
import { Observable } from 'rxjs/Rx';
import { ParkingBayOverlay } from '../dtos/parkingbay.overlay';


describe('Service: OverlayService', () => {

  let service: OverlayService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OverlayService, useClass: OverlayService },
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },

          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ]
    });
    service = TestBed.get(OverlayService);
  });

  it('should be created ', () => {
    expect(service).toBeDefined();
  });

  it('getRectangles should return overlay coordinates', () => {

    service.getRectangles().subscribe((coordlist: any[]) => {
      expect(coordlist.length).toBeGreaterThan(0);
    });
  });

  it('should contain the getRectangles function', (() => {
    expect(service.getRectangles).toBeDefined();
  }));

  it('getRectangles should return parkingBayCoordinates', inject([OverlayService, MockBackend], (service: OverlayService, backend: MockBackend) => {

    let response = new ResponseOptions({
      body:
      [
        { "parkingBayId": 50, "polygonCoords": "1276,154 1329,101 1298,72 1247,130", "textCoords": { "x": 1281, "y": 107 }, "rectCoords": { "x": 1002, "y": 141 } },
        { "parkingBayId": 51, "polygonCoords": "1240,121 1288,65 1259,41 1210,98", "textCoords": { "x": 1240, "y": 76 }, "rectCoords": { "x": 996, "y": 102 } }
      ]
    });

    const baseResponse = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return service.getRectangles().subscribe(data => {
      expect(data.length).toEqual(2);
      expect(data[0].parkingBayId).toEqual(50);
      expect(data[0].polygonCoords).toEqual("1276,154 1329,101 1298,72 1247,130");
    });
  }));

});
