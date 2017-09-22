
export interface ParkingBayOverlay {
    parkingBayId: number;
    polygonCoords: string;
    textCoords: Point;
    rectCoords:Point;
}

export interface Point{
    x: number;
    y: number;
}