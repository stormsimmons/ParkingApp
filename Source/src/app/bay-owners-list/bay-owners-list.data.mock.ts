import { Employee } from '../dtos/employee';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';

let now = new Date();

export const MockBayOwners = <Employee[]>[
    {
        Id: 12,
        FirstName: "Rick",
        LastName: "James",
        Email: "rick.james@euromonitor.com",
        AbsenceList: <Absence[]>[
            <Absence>{
                StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
                EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
                ReservedBy: null
            }
        ],
        ParkingBay: <ParkingBay>{
            BayNumber: 50
        }
    },
    {
        Id: 13,
        FirstName: "Mike",
        LastName: "Ross",
        Email: "mike.ross@euromonitor.com",
        AbsenceList: <Absence[]>[
            <Absence>{
                StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
                EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
                ReservedBy: null
            }
        ],
        ParkingBay: <ParkingBay>{
            BayNumber: 55
        }
    }
];