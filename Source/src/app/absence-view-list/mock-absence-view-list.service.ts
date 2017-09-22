import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { AbsenceView } from '../dtos/absenceView';
import { EmployeeView } from '../dtos/employeeView';

@Injectable()
export class MockAbsenceViewListService {

  constructor(public http: Http) { }

  getAbsenceViewList(input: SearchDateCriteria): Observable<AbsenceView[]> {

    return new Observable<any[]>(observer => {
      observer.next([
        {
          "EmployeeId": 1,
          "ParkingBaynumber": {
            "BayNumber": 50
          },
          "Absence": {
            "StartDate": "/Date(1501797600000-0000)/",
            "EndDate": "/Date(1502834400000-0000)/",
            "ReservedBy": {
              "Id": 23,
              "FirstName": "DJ",
              "LastName": "Coetzee"
            }
          },
          "BayOwner": "testFirstName testLastName"
        },
        {
          "EmployeeId": 1,
          "ParkingBaynumber": {
            "BayNumber": 50
          },
          "Absence": {
            "StartDate": "/Date(1503180000000-0000)/",
            "EndDate": "/Date(1504130400000-0000)/",
            "ReservedBy": {
              "Id": 23,
              "FirstName": "DJ",
              "LastName": "Coetzee"
            }
          },
          "BayOwner": "testFirstName testLastName"
        },
        {
          "EmployeeId": 1,
          "ParkingBaynumber": {
            "BayNumber": 50
          },
          "Absence": {
            "StartDate": "/Date(1502575200000-0000)/",
            "EndDate": "/Date(1505253600000-0000)/",
            "ReservedBy": {
              "Id": 11,
              "FirstName": "Kaanita",
              "LastName": "Coleman"
            }
          },
          "BayOwner": "testFirstName testLastName"
        },
        {
          "EmployeeId": 2,
          "ParkingBaynumber": {
            "BayNumber": 102
          },
          "Absence": {
            "StartDate": "/Date(1500847200000-0000)/",
            "EndDate": "/Date(1503784800000-0000)/",
            "ReservedBy": {
              "Id": 23,
              "FirstName": "DJ",
              "LastName": "Coetzee"
            }
          },
          "BayOwner": "Storm Simmons"
        },
        {
          "EmployeeId": 2,
          "ParkingBaynumber": {
            "BayNumber": 102
          },
          "Absence": {
            "StartDate": "/Date(1502316000000-0000)/",
            "EndDate": "/Date(1504130400000-0000)/"
          },
          "BayOwner": "Storm Simmons"
        },
        {
          "EmployeeId": 3,
          "ParkingBaynumber": {
            "BayNumber": 103
          },
          "Absence": {
            "StartDate": "/Date(1500847200000-0000)/",
            "EndDate": "/Date(1503784800000-0000)/",
            "ReservedBy": {
              "Id": 23,
              "FirstName": "DJ",
              "LastName": "Coetzee"
            }
          },
          "BayOwner": "Daniel Coetzee"
        },
        {
          "EmployeeId": 3,
          "ParkingBaynumber": {
            "BayNumber": 103
          },
          "Absence": {
            "StartDate": "/Date(1502316000000-0000)/",
            "EndDate": "/Date(1504130400000-0000)/"
          },
          "BayOwner": "Daniel Coetzee"
        },
        {
          "EmployeeId": 4,
          "ParkingBaynumber": {
            "BayNumber": 104
          },
          "Absence": {
            "StartDate": "/Date(1501624800000-0000)/",
            "EndDate": "/Date(1502575200000-0000)/",
            "ReservedBy": {
              "Id": 23,
              "FirstName": "DJ",
              "LastName": "Coetzee"
            }
          },
          "BayOwner": "Sbu Zamani"
        }
      ]);
    })
  }

    postReserveParking(employeeView:EmployeeView, absenceView:AbsenceView){

    var base = "http://localhost:49684/employee/reserveparking";
    this.http.post(base, {employeeViewDto:employeeView, absenceViewDto:absenceView}).subscribe();
  }
}
