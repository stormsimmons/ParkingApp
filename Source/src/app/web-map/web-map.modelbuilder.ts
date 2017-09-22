import { WebMapModel } from './web-map.model';
import { Employee } from '../dtos/employee';
import { ParkingBayOverlay } from '../dtos/parkingbay.overlay';
import { MockBayOwnersListService } from '../bay-owners-list/mock-bay-owners-list.service';
import { ParkingBayModel } from './parkingbay.model';
import { AbsenceView } from '../dtos/absenceView';
import {EmployeeList} from '../shared-models/employee-list-model';

export class WebMapModelBuilder {
    static buildWebMapModel(target: WebMapModel, employees: Employee[], parkingBayOverlays: ParkingBayOverlay[], absenceViews: AbsenceView[]): void {
        target.parkingBays = [];

        employees.forEach(employee => {

            let overlay = parkingBayOverlays.find(o => employee.ParkingBay && o.parkingBayId === employee.ParkingBay.BayNumber);
            if (!overlay) { return; }
            let model = new ParkingBayModel();
               model.id = overlay.parkingBayId,
                model.ownerName = `${employee.FirstName} ${employee.LastName}`,
                model.labelCoords = overlay.textCoords,
                model.pathCoords = overlay.polygonCoords,
                model.boxCoords = overlay.rectCoords;

         
            let y = absenceViews.find(t=> t.EmployeeId===employee.Id && !t.Absence.ReservedBy);
            if (y) {
                model.availableDate = y.Absence.StartDate;
                
                model.isAvailable=true;
            }
            else {
                model.availableDate = null;
                model.isAvailable=false;
            }
            target.parkingBays.push(model);
        });
    }
}