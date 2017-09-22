import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ParkingBayOverlay } from '../dtos/parkingbay.overlay';
import {environment} from '../../environments/environment';

@Injectable()
export class OverlayService {

  constructor(private http: Http) { }

  public prefix = environment.urlPrefix;

  getRectangles(): Observable<ParkingBayOverlay[]> {
    return this.http.get(this.prefix + 'assets/ParkingBayCoordinates.json')
      .map(res => res.json());
  }
}
