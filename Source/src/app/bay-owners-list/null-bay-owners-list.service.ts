import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Employee } from '../dtos/employee';
import { EmployeeView } from '../dtos/employee-view';

@Injectable()
export class NullBayOwnersListService {

  constructor() { }
  getBayOwnersList(): Observable<Employee[]> {

    return new Observable<Employee[]>(observer => {
      observer.next([]);
    })
  }
}
