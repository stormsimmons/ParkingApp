import { Component, Input } from '@angular/core';
import { WebMapModel } from '../web-map/web-map.model';
import { ParkingBayModel } from '../web-map/parkingbay.model';

@Component({
  selector: 'app-bay-owners-list',
  templateUrl: './bay-owners-list.component.html',
  styleUrls: ['./bay-owners-list.component.css']
})
export class BayOwnersListComponent {

  @Input() webMapModel: WebMapModel;

  mouseOver(parkingBay:ParkingBayModel){   
    this.webMapModel.selectedParkingBay = parkingBay;
  }

  mouseOut(){
    this.webMapModel.selectedParkingBay = null;
  }

}
