import { TestBed } from '@angular/core/testing';
import { AbsenceViewModelBuilder } from './absence-view.modelbuilder';
import { AbsenceViewModel } from './absence-view.model';
import { AbsenceView } from '../dtos/absenceView';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';

describe('AbsenceViewModelBuilder', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AbsenceViewModelBuilder]
        });
    });

    it('should return empty list when given empty input', () => {
        let model: AbsenceViewModel = new AbsenceViewModel();
        AbsenceViewModelBuilder.buildAbsenceViewModel(model, []);
        expect(model.absenceViews.length).toEqual(0);
    });

    it('should return list of models when given valid input', () => {
        let model: AbsenceViewModel = new AbsenceViewModel();
        let now = new Date();

        let absenceViews = <AbsenceView[]>[{
            EmployeeId: 1,
            ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
            Absence: <Absence>{
                StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
                EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
                ReservedBy: null
            },
            BayOwner: 'John Wick'
        }];

        AbsenceViewModelBuilder.buildAbsenceViewModel(model, absenceViews);

        expect(model.absenceViews.length).toEqual(1);
        expect(model.absenceViews[0].BayOwner).toEqual("John Wick");
        expect(model.absenceViews[0].EmployeeId).toEqual(1);
        expect(model.absenceViews[0].ParkingBaynumber.BayNumber).toEqual(21);   
    });
});