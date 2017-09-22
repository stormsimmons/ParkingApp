import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable , Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AbsenceView } from '../dtos/absenceView';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { EmployeeView } from '../dtos/employeeView';
import {environment} from '../../environments/environment';

@Injectable()
export class AbsenceViewListService {

  constructor(public http: Http) { }

  getAbsenceViewList(input: SearchDateCriteria): Observable<AbsenceView[]> {

    var base = environment.apiUrl + "employee/availableparkingbays?searchCriteria=";
    var searchCriteriaPeriod = base + input;
    var json = this.http.get(searchCriteriaPeriod)
      .map((res: Response) => res.json());

    return json;
  }

  postReserveParking(employeeView: EmployeeView, absenceView: AbsenceView, successHandler: (response: any) => void) {

    var base = environment.apiUrl+ "employee/reserveparking";
    this.http.post(base, { employeeViewDto: employeeView, absenceViewDto: absenceView }).subscribe(successHandler);
  }

  postCancelReservedParkingbay(employeeView: EmployeeView, absenceView: AbsenceView , successHandler: (response: any) => void) {

    var base = environment.apiUrl + "employee/cancelreservedbay";
    this.http.post(base, { employeeViewDto: employeeView, absenceViewDto: absenceView }).subscribe(successHandler);
  }

}
