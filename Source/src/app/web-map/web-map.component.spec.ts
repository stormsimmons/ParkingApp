import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WebMapComponent } from './web-map.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnChanges, Input, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { WebMapModel } from './web-map.model';
import { NullBayOwnersListService } from '../bay-owners-list/null-bay-owners-list.service';
import { BayOwnersListService } from '../bay-owners-list/bay-owners-list.service';
import { MockBayOwnersListService } from '../bay-owners-list/mock-bay-owners-list.service';
import {
  Http,
  Response,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MockWebMapModel } from './mock-web-map.model';
import { OverlayService } from './overlay.service';
import { AbsenceViewListService } from '../absence-view-list/absence-view-list.service';
import { AbsenceView } from '../dtos/absenceView';
import { Employee } from '../dtos/employee';


@Component({
  selector: 'test-web-map',
  template: `<app-web-map [absenceDtos]='absenceDtos' [employeeDtos]='employeeDtos'></app-web-map>`,
})
export class WebMapHostComponent {
  @ViewChild(WebMapComponent)
  public webMapHostComponent: WebMapComponent;
  public absenceDtos: AbsenceView[];
  public employeeDtos: Employee[];

  webMapModel: WebMapModel;

  ngOnInit() {
    this.webMapModel = new WebMapModel();
    this.webMapModel = MockWebMapModel.getModel();
  }
}


describe('WebMapComponent', () => {
  let component: WebMapComponent;
  let fixture: ComponentFixture<WebMapComponent>;

  let hostFixture, testHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebMapComponent, WebMapHostComponent],
      providers: [OverlayService, AbsenceViewListService, MockBayOwnersListService, { provide: WebMapModel, useValue: MockWebMapModel.getModel() }, { provide: BayOwnersListService, useClass: NullBayOwnersListService }, {
        provide: Http,
        useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        },

        deps: [MockBackend, BaseRequestOptions]
      },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should return populated 2 polygons when given populated model with 2 bays',
    () => {

      let de = fixture.debugElement.query(By.css('div'));
      let svg = de.children.find(d => d.name === 'svg');
      let el = svg.children.filter(x => x.name === 'g');

      expect(el.length).toEqual(2);

      expect(el[0].children[0].name).toEqual('polygon');
      expect(el[0].children[1].nativeElement.innerHTML).toEqual('1');

      expect(el[1].children[0].name).toEqual('polygon');
      expect(el[1].children[1].nativeElement.innerHTML).toEqual('2');
    });

  it('Check if mouseOver is called on mouseenter on a parking bay', () => {
    component.webMapModel = MockWebMapModel.getModel();

    let de = fixture.debugElement.query(By.css('div'));
    let svg = de.children.find(d => d.name === 'svg');
    let el = svg.children.filter(x => x.name === 'g');
    const mouseOverSpy = spyOn(component, 'mouseOver');

    el[0].triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.mouseOver).toHaveBeenCalledTimes(1);
    })
  });

  it('Check if mouseOut is called on mouseleave on a parking bay', () => {
    component.webMapModel = MockWebMapModel.getModel();

    let de = fixture.debugElement.query(By.css('div'));
    let svg = de.children.find(d => d.name === 'svg');
    let el = svg.children.filter(x => x.name === 'g');
    const mouseOutSpy = spyOn(component, 'mouseOut');

    el[0].triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.mouseOut).toHaveBeenCalledTimes(1);
    })
  });

  it('Check if mouseOver on a parking bay sets that parking bay as selectedParkingBay in webMapModel', () => {
    component.webMapModel = MockWebMapModel.getModel();
    let event = new Event('mouseenter');

    component.mouseOver(event, component.webMapModel.parkingBays[0]);

    expect(component.webMapModel.selectedParkingBay).toEqual(component.webMapModel.parkingBays[0]);
  });

  it('should call ngOnChanges when absenceDtos input changes',
    () => {
      hostFixture = TestBed.createComponent(WebMapHostComponent);
      testHostComponent = hostFixture.componentInstance;

      let absenceviews = <AbsenceView[]>[
        { EmployeeId: 1, ParkingBaynumber: { BayNumber: 50 }, Absence: { StartDate: new Date(1501797600000), EndDate: new Date(1502834400000), ReservedBy: null }, BayOwner: "Brendan Huysamen" },
        { EmployeeId: 13, ParkingBaynumber: { BayNumber: 51 }, Absence: { StartDate: new Date(1500847200000), EndDate: new Date(1503784800000), ReservedBy: null }, BayOwner: "Quinton Walker" },
      ];

      testHostComponent.absenceDtos = absenceviews;

      spyOn(testHostComponent.webMapHostComponent, 'ngOnChanges').and.callThrough();

      hostFixture.detectChanges();
      expect(testHostComponent.webMapHostComponent.ngOnChanges).toHaveBeenCalled();
      expect(testHostComponent.webMapHostComponent.absenceDtos).toEqual(absenceviews);
    });

  it('should call ngOnChanges when employeeDtos input changes',
    () => {
      hostFixture = TestBed.createComponent(WebMapHostComponent);
      testHostComponent = hostFixture.componentInstance;

      let employees = <Employee[]>[{
          Id: 1,
          UserName: "Lindokuhle.Dlamini",
          FirstName: "Lindokuhle ",
          LastName: "Dlamini",
          Email: "Lindokuhle.Dlamini.@euromonitor.com",
          AbsenceList: [
            {
              StartDate: new Date(1501797600000),
              EndDate: new Date(1502834400000),
              ReservedBy: null
            }
          ],
          ParkingBay: {
            BayNumber: 50
          }
        }];

      testHostComponent.employeeDtos = employees;

      spyOn(testHostComponent.webMapHostComponent, 'ngOnChanges').and.callThrough();

      hostFixture.detectChanges();
      expect(testHostComponent.webMapHostComponent.ngOnChanges).toHaveBeenCalled();
      expect(testHostComponent.webMapHostComponent.employeeDtos).toEqual(employees);
    });

});



