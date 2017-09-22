import { WebMapModel } from './web-map.model';
import { ParkingBayModel } from './parkingbay.model';
import { AbsenceView } from '../dtos/absenceView';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';

export class MockWebMapModel {
  static getModel(): WebMapModel {

    let result = new WebMapModel();
    result.parkingBays = [];
    let bay = new ParkingBayModel();
    bay.id = 1;
    bay.isAvailable = false;
    bay.ownerName = 'Jan';
    bay.labelCoords = { x: 15, y: 15 };
    bay.pathCoords = '10,10 20,10 20,20 10,20'; 
    result.parkingBays.push(bay);

    bay = new ParkingBayModel();
    bay.id = 2;
    bay.isAvailable = true;
    bay.ownerName = 'Koos';
    bay.labelCoords = { x: 55, y: 15 };
    bay.pathCoords = '50,10 60,10 60,20 50,20';
    let now = new Date();
    bay.availableDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    result.parkingBays.push(bay);

    return result;
  }
}