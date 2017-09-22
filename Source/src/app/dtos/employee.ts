import { Absence } from './absence';
import { ParkingBay } from './parking-bay';

export interface Employee {
    Id: number;
    UserName:string;
    FirstName: string;
    LastName: string;
    Email: string;
    AbsenceList: Absence[];
    ParkingBay: ParkingBay;
}
