import { Component, OnChanges, SimpleChanges, Input} from '@angular/core';
import { WebMapModel } from '../web-map/web-map.model';
import { BayOwnersListService } from '../bay-owners-list/bay-owners-list.service';
import { OverlayService } from './overlay.service';
import { WebMapModelBuilder } from './web-map.modelbuilder';
import { Employee } from '../dtos/employee';
import { ParkingBayOverlay } from '../dtos/parkingbay.overlay';
import { MockWebMapModel } from '../web-map/mock-web-map.model';
import { ParkingBayModel } from './parkingbay.model';
import { AbsenceViewListService } from '../absence-view-list/absence-view-list.service';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { AbsenceView } from '../dtos/absenceView';
import {EmployeeList} from '../shared-models/employee-list-model';
import {environment } from '../../environments/environment';

@Component({
  selector: 'app-web-map',
  templateUrl: './web-map.component.html',
  styleUrls: ['./web-map.component.css']
})
export class WebMapComponent implements OnChanges {

  @Input() absenceDtos: AbsenceView[];
  @Input() employeeDtos: Employee[];

  public prefix = environment.urlPrefix;
  public webMapImage = this.prefix + "assets/aerialMap.PNG";

  constructor(public webMapModel: WebMapModel, public bayOwnersListService: BayOwnersListService, public overlayService: OverlayService, public absenceViewService: AbsenceViewListService) { }

  ngOnChanges(changes: SimpleChanges) {
    
    if ((changes.hasOwnProperty('absenceDtos')|| changes.hasOwnProperty('employeeDtos')) && this.absenceDtos && this.employeeDtos) {
      
        this.overlayService.getRectangles().subscribe((overlays) => {
          WebMapModelBuilder.buildWebMapModel(this.webMapModel, this.employeeDtos, overlays, this.absenceDtos);
        });
    
    }
     
  }

  mouseOver(event: any, parkingBay: ParkingBayModel) {
    this.webMapModel.selectedParkingBay = parkingBay;
  }

  mouseOut(event: any) {

    if (event.relatedTarget.parentNode && event.relatedTarget.parentNode.attributes['id']
      && event.relatedTarget.parentNode.attributes['id'].nodeValue === 'hoverGroup') {
      return;
    }

    this.webMapModel.selectedParkingBay = null;
  }
 
  
}
