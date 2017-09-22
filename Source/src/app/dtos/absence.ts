import {EmployeeView} from './employee-view';

export interface Absence {
    StartDate : Date;
    EndDate : Date;
    ReservedBy: EmployeeView; 
}
