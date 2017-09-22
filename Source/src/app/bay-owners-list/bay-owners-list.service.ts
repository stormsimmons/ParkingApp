import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { Employee } from '../dtos/employee';
import { EmployeeView } from '../dtos/employee-view';
import {environment} from '../../environments/environment';
 
@Injectable()
export class BayOwnersListService {

  constructor(public http: Http) { }

  getBayOwnersList(): Observable<Employee[]> {

    var base = environment.apiUrl;
    var json = this.http.get(base + 'employee')
      .map((res: Response) => res.json());

    return json;
  }
}

