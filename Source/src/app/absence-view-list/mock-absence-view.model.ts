import { AbsenceViewModel } from './absence-view.model';
import { AbsenceView } from '../dtos/absenceView';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';

export class MockAbsenceViewModel {

    static getModel(): AbsenceViewModel {

        let result = new AbsenceViewModel();
        let now = new Date();

        result.absenceViews = <AbsenceView[]>[{
            EmployeeId: 1,
            ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
            Absence: <Absence>{
                StartDate: new Date(1501797600000),
                EndDate: new Date(1502834400000),
                ReservedBy: null
            },
            BayOwner: 'John Wick'
        }];

        result.selectedSearchDate = SearchDateCriteria.Today;

        return result;
    }
}