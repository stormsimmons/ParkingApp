import { TestBed, inject } from '@angular/core/testing';
import { WebMapModel } from './web-map.model';
import { WebMapModelBuilder } from './web-map.modelbuilder';
import { Employee } from '../dtos/employee';
import { ParkingBayOverlay } from '../dtos/parkingbay.overlay';
import { MockBayOwnersListService } from '../bay-owners-list/mock-bay-owners-list.service';
import {AbsenceView } from '../dtos/absenceView';
import {ParkingBay  } from '../dtos/parking-bay';
import{AbsenceViewListService} from '../absence-view-list/absence-view-list.service';
import{MockAbsenceViewListService} from '../absence-view-list/mock-absence-view-list.service'
describe('WebMapModelBuilder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebMapModelBuilder,  { provide:  AbsenceViewListService , useClass: MockAbsenceViewListService }]
    });
  });

  it('should return empty list when given empty input', () => {
    let model: WebMapModel = new WebMapModel();
    WebMapModelBuilder.buildWebMapModel(model, [], [],[]);
    expect(model.parkingBays.length).toEqual(0);
  });

  it('should return empty list when employee dtos and parking bay overlays are disjoint', () => {
    let model: WebMapModel = new WebMapModel();

    // Arrange
    let overlays = <ParkingBayOverlay[]>[{ parkingBayId: 0 }, { parkingBayId: 1 }];
    let employees = <Employee[]>[{ Id: 2 }];

    // Act
    WebMapModelBuilder.buildWebMapModel(model, employees, overlays,[]);

    // Assert
    expect(model.parkingBays.length).toEqual(0);
  });

  it('should return list of models when given valid input', () => {
    let model: WebMapModel = new WebMapModel();

    let mockBayOwnerService = new MockBayOwnersListService(null);
    mockBayOwnerService.getBayOwnersList().subscribe((employees) => {

      let overlays = <ParkingBayOverlay[]>[
        { parkingBayId: 50, polygonCoords: '0,0 10,0 10,10 0,10' , textCoords: { x: 5, y: 5 } },
        { parkingBayId: 51 },
      ];

      // Act
      WebMapModelBuilder.buildWebMapModel(model, employees, overlays,[]);

      // Assert
      expect(model.parkingBays.length).toEqual(2);
      expect(model.parkingBays[0].id).toEqual(50);
      expect(model.parkingBays[0].ownerName).toEqual('Lindokuhle  Dlamini');
      expect(model.parkingBays[0].labelCoords).toBe(overlays[0].textCoords);
      expect(model.parkingBays[0].pathCoords).toEqual(overlays[0].polygonCoords);
    });
  });
  
  it('should return list of absenceview', ()=> {
     let model: WebMapModel = new WebMapModel();

    let mockBayOwnerService = new MockBayOwnersListService(null);
    mockBayOwnerService.getBayOwnersList().subscribe((employees) => {

      
      let absenceview = <AbsenceView[]>[
       {EmployeeId: 1,ParkingBaynumber: { BayNumber: 50},Absence : {StartDate :new Date(1501797600000), EndDate: new Date(1502834400000),ReservedBy:null},BayOwner:"Brendan Huysamen"},
       {EmployeeId: 13,ParkingBaynumber: { BayNumber: 51},Absence : {StartDate :new Date(1500847200000), EndDate: new Date(1503784800000),ReservedBy:null},BayOwner:"Quinton Walker"},
      ];

      // Act
      WebMapModelBuilder.buildWebMapModel(model, employees, [],absenceview);

      // Assert
      expect(absenceview.length).toEqual(2);
      expect(absenceview[0].ParkingBaynumber.BayNumber).toEqual(50);
      expect(absenceview[0].EmployeeId).toEqual(employees[0].Id);
      expect(absenceview[0].Absence.StartDate).toEqual(employees[0].AbsenceList[0].StartDate);
    });
  });


  
it('should return correct available date for partially reserved absence' , ()=> {
     let model: WebMapModel = new WebMapModel();

    let mockBayOwnerService = new MockBayOwnersListService(null);
    mockBayOwnerService.getBayOwnersList().subscribe((employees) => {

      
       let absenceview = <AbsenceView[]>[
     
       {EmployeeId: 1,ParkingBaynumber: { BayNumber: 50},Absence : {StartDate :new Date(1501797600000), EndDate: new Date(1501804800000),ReservedBy:{
          "Id": 23,
          "FirstName": "DJ",
          "LastName": "Coetzee"
        }},BayOwner:"Brendan Huysamen"},
      {EmployeeId: 1,ParkingBaynumber: { BayNumber: 50},Absence : {StartDate :new Date(1502668800000), EndDate: new Date(1502928000000),ReservedBy:null},BayOwner:"Brendan Huysamen"}
      ];
        let overlays = <ParkingBayOverlay[]>[{ parkingBayId: 50 }];
      // Act
      WebMapModelBuilder.buildWebMapModel(model, employees, overlays,absenceview);


      // Assert
      
      expect(model.parkingBays.length).toEqual(1);
      expect(model.parkingBays[0].availableDate).toEqual(new Date(1502668800000));
     
    });
  });
})
  
