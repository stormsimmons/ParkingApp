import { Point } from '../dtos/parkingbay.overlay';

export class ParkingBayModel{
    id: number;
    ownerName: string;
    availableDate: Date;
    isAvailable: boolean;
    pathCoords: string;
    labelCoords: Point;
    boxCoords: Point;
}