import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Employee } from '../dtos/employee';
import { EmployeeView } from '../dtos/employee-view';

@Injectable()
export class MockBayOwnersListService {

  constructor(public http: Http) { }
  getBayOwnersList(): Observable<Employee[]> {

    return new Observable<Employee[]>(observer => {
      observer.next([
        {
          Id: 1,
          UserName: "Lindokuhle.Dlamini",
          FirstName: "Lindokuhle ",
          LastName: "Dlamini",
          Email: "Lindokuhle.Dlamini.@euromonitor.com",
          AbsenceList: [
            {
              StartDate: new Date(1501797600000),
              EndDate: new Date(1502834400000),
              ReservedBy: {
                Id: 23,
                FirstName: "DJ",
                LastName: "Coetzee"
              }
            },
            {
              StartDate: new Date(1503180000000),
              EndDate: new Date(1504130400000),
              ReservedBy: {
                Id: 23,
                FirstName: "DJ",
                LastName: "Coetzee"
              }
            },
            {
              StartDate: new Date(1502575200000),
              EndDate: new Date(1505253600000),
              ReservedBy: {
                Id: 11,
                FirstName: "Kaanita",
                LastName: "ColeMan"
              }
            }
          ],
          ParkingBay: {
            BayNumber: 50
          }
        },
        {
          Id: 1,
          UserName: "Rick.Grimes",
          FirstName: "Rick",
          LastName: "Grimes",
          Email: "Rick.Grimes.@euromonitor.com",
          AbsenceList: [
            {
              StartDate: new Date(1501797600000),
              EndDate: new Date(1502834400000),
              ReservedBy: {
                Id: 23,
                FirstName: "DJ",
                LastName: "Coetzee"
              }
            },
            {
              StartDate: new Date(1503180000000),
              EndDate: new Date(1504130400000),
              ReservedBy: {
                Id: 23,
                FirstName: "DJ",
                LastName: "Coetzee"
              }
            },
            {
              StartDate: new Date(1502575200000),
              EndDate: new Date(1505253600000),
              ReservedBy: {
                Id: 11,
                FirstName: "Kaanita",
                LastName: "ColeMan"
              }
            }
          ],
          ParkingBay: {
            BayNumber: 51
          }
        }
      ]);
    })
  }
}
