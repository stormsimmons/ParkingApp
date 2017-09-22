import {EmployeeList} from './employee-list-model';
import {Employee} from '../dtos/employee';

export class EmployeeListBuilder{
    static buildEmployeeModel(target: EmployeeList, employees:Employee[]){
        target.employeeList = employees;


    }
}