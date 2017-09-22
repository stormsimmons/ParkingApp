import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Absence} from '../dtos/absence';
import {environment} from '../../environments/environment';

@Injectable()
export class AddAbsenceService {

  constructor(public http:Http) { }

   postLogAbsence(startDate:Date,endDate:Date, id:number, successHandler: (response: any) => void) {
    var base = environment.apiUrl + "employee/absence";
    this.http.post(base, { id, StartDate: startDate, EndDate: endDate  }).subscribe();
  }

}

