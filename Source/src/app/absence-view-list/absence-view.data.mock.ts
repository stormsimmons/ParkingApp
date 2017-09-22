import { AbsenceViewModel } from './absence-view.model';
import { AbsenceView } from '../dtos/absenceView';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';

let now = new Date();

export const MockAbsenceViews = <AbsenceView[]>[
    {
        EmployeeId: 1,
        ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
        Absence: <Absence>{
            StartDate: new Date(1503180000000),
            EndDate: new Date(1504130400000),
            ReservedBy: null
        },
        BayOwner: 'John Wick'
    },
    {
        EmployeeId: 2,
        ParkingBaynumber: <ParkingBay>{ BayNumber: 27 },
        Absence: <Absence>{
            StartDate: new Date(1502575200000),
            EndDate: new Date(1505253600000),
            ReservedBy: null
        },
        BayOwner: 'Jason Black'
    }
];