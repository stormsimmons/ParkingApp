import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AbsenceViewListComponent } from './absence-view-list.component';
import { MockAbsenceViewListService } from './mock-absence-view-list.service';
import { AbsenceViewListService } from './absence-view-list.service';
import {
  Http,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MockAbsenceViewModel } from './mock-absence-view.model';
import { AbsenceViewModel } from './absence-view.model';
import { DatePipe } from '@angular/common';
import { AbsenceView } from '../dtos/absenceView';
import { Absence } from '../dtos/absence';
import { ParkingBay } from '../dtos/parking-bay';
import { EmployeeView } from '../dtos/employeeView';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { Component, Input, OnChanges, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'test-absence-list',
  template: `<app-absence-view-list [absenceDtos]='absenceDtos'></app-absence-view-list>`,
})
export class AbsenceViewListHostComponent {
  @ViewChild(AbsenceViewListComponent)
  public absenceViewListHostComponent: AbsenceViewListComponent;
  public absenceDtos: AbsenceView[];
  absenceViewModel: AbsenceViewModel;

  ngOnInit() {
    this.absenceViewModel = new AbsenceViewModel();
    this.absenceViewModel = MockAbsenceViewModel.getModel();
  }
}

describe('AbsenceViewListComponent', () => {
  let component: AbsenceViewListComponent;
  let fixture: ComponentFixture<AbsenceViewListComponent>;
  let htmlEl: HTMLElement;
  let hostFixture, testHostComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [AbsenceViewListComponent, AbsenceViewListHostComponent]
    })
      .overrideComponent(AbsenceViewListComponent,
      {
        set: {
          providers: [
            { provide: AbsenceViewListService, useClass: MockAbsenceViewListService },
            { provide: AbsenceViewModel, useValue: MockAbsenceViewModel.getModel() },
            {
              provide: Http,
              useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
              },

              deps: [MockBackend, BaseRequestOptions]
            },
            { provide: MockBackend, useClass: MockBackend },
            { provide: BaseRequestOptions, useClass: BaseRequestOptions },
            DatePipe
          ],
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AbsenceViewListComponent);
    component = fixture.componentInstance;
    component.absenceViewModel = MockAbsenceViewModel.getModel();
  });

  it('should be created', () => {
    component.absenceViewModel = new AbsenceViewModel();
    component.absenceViewModel.absenceViews = [];
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it(`should contain table`, () => {
    let el = fixture.debugElement.queryAllNodes(By.css('table'));
    expect(el.length).not.toBe(0);
  });

  it(`should contain table with rows when absenceViews provided`, () => {
    let el = fixture.debugElement.queryAllNodes(By.css('tr'));
    expect(el.length).toBeGreaterThan(0);
  });

  it(`should contain tabel heading "Available Bays: "`, () => {
    component.absenceViewModel = new AbsenceViewModel();
    fixture.detectChanges();

    let el = fixture.debugElement.queryAll(By.css('tr'));

    expect(el[0].children[0].name).toEqual('td');
    expect(el[0].children[0].nativeElement.innerHTML).toEqual('Available Bays: ');

  });

  it('should contain table head with headings: Bay #, Date Available, Bay Owner, Reserved By', () => {
    component.absenceViewModel = new AbsenceViewModel();
    component.absenceViewModel.absenceViews = [];
    fixture.detectChanges();

    let thead = fixture.debugElement.queryAll(By.css('th'));

    expect(thead.length).toEqual(6);
    expect(thead[0].nativeElement.innerHTML).toEqual('Bay #');
    expect(thead[1].nativeElement.innerHTML).toEqual('Date Available');
    expect(thead[2].nativeElement.innerHTML).toEqual('Bay Owner');
    expect(thead[3].nativeElement.innerHTML).toEqual('Reserved By');
  });

  it('should return empty list of absenceViews when empty input', () => {
    component.absenceViewModel = new AbsenceViewModel();
    component.absenceViewModel.absenceViews = [];
    fixture.detectChanges();

    expect(component.absenceViewModel.absenceViews.length).toEqual(0);
  });

  it('should return list of absenceViews when given valid input', () => {
    fixture.detectChanges();

    expect(component.absenceViewModel.absenceViews.length).toEqual(1);
  });

  it('should display correct information in table when given valid input', () => {
    fixture.detectChanges();

    let el = fixture.debugElement.queryAll(By.css('tr'));

    expect(el[2].children[0].name).toEqual('td');
    expect(el[2].children[0].nativeElement.innerHTML).toEqual('21');
    expect(el[2].children[1].name).toEqual('td');
    expect(el[2].children[1].nativeElement.innerHTML).toEqual('04 August 2017 - 16 August 2017');
    expect(el[2].children[2].name).toEqual('td');
    expect(el[2].children[2].nativeElement.innerHTML).toEqual('John Wick');
  });

  it('should render enabled Reserve button when given valid absenceView that has not been reserved', (() => {
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('.reserve-button'));

    expect(el.name).toEqual('button');
    expect(el.nativeElement.innerHTML).toEqual('Reserve');
    let reserveButton = el.nativeElement;
    expect(reserveButton.disabled).toBe(false);
  }));

  it('should render disabled Reserve button when given valid absenceView that has been reserved', (() => {
    let now = new Date();
    let absenceViewModel = new AbsenceViewModel();

    absenceViewModel.absenceViews = <AbsenceView[]>[{
      EmployeeId: 1,
      ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
      Absence: <Absence>{
        StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
        ReservedBy: <EmployeeView>{ Id: 1, FirstName: "Jan", LastName: "Blom" }
      },
      BayOwner: 'John Wick'
    }];

    component.absenceViewModel = absenceViewModel;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('.disabled-reserve-button'));

    expect(el.name).toEqual('button');
    expect(el.nativeElement.innerHTML).toEqual('Reserve');
    let reserveButton = el.nativeElement;
    expect(reserveButton.disabled).toBe(true);
  }));

  it('should render disabled Reserve button when logged in user is the owner of that bay', (() => {
    let now = new Date();
    let absenceViewModel = new AbsenceViewModel();

    component.firstName = "John";
    component.lastName = "Wick"

    absenceViewModel.absenceViews = <AbsenceView[]>[{
      EmployeeId: 1,
      ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
      Absence: <Absence>{
        StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
        ReservedBy: null
      },
      BayOwner: 'John Wick'
    }];

    component.absenceViewModel = absenceViewModel;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('.disabled-reserve-button'));

    expect(el.name).toEqual('button');
    expect(el.nativeElement.innerHTML).toEqual('Reserve');
    let reserveButton = el.nativeElement;
    expect(reserveButton.disabled).toBe(true);
  }));

  it('should render Available in Reserved By when given valid absenceView that has not been reserved', (() => {
    fixture.detectChanges();

    let el = fixture.debugElement.queryAll(By.css('tr'));

    expect(el[2].children[3].name).toEqual('td');
    expect(el[2].children[3].nativeElement.innerHTML).toEqual('Available');
  }));

  it('should render logged in user name in Reserved By when given valid absenceView that has been reserved by that logged in user', (() => {
    let now = new Date();
    let absenceViewModel = new AbsenceViewModel();

    absenceViewModel.absenceViews = <AbsenceView[]>[{
      EmployeeId: 1,
      ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
      Absence: <Absence>{
        StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
        ReservedBy: <EmployeeView>{ Id: 1, FirstName: "Jan", LastName: "Blom" }
      },
      BayOwner: 'John Wick'
    }];

    component.absenceViewModel = absenceViewModel;
    fixture.detectChanges();

    let el = fixture.debugElement.queryAll(By.css('tr'));

    expect(el[2].children[3].name).toEqual('td');
    expect(el[2].children[3].nativeElement.innerHTML).toEqual('Jan Blom');
  }));

  it('should render Cancel button when absenceView has been reserved by that logged in user', (() => {
    let now = new Date();
    let absenceViewModel = new AbsenceViewModel();

    absenceViewModel.absenceViews = <AbsenceView[]>[{
      EmployeeId: 1,
      ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
      Absence: <Absence>{
        StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
        ReservedBy: <EmployeeView>{ Id: 1, FirstName: "jan", LastName: "blom" }
      },
      BayOwner: 'John Wick'
    }];
    component.firstName = "jan";
    component.lastName = "blom";
    component.absenceViewModel = absenceViewModel;
    fixture.detectChanges();

    let el = fixture.debugElement.queryAll(By.css('.cancel-button'));

    expect(el[0].name).toEqual('button');
    expect(el[0].nativeElement.innerHTML).toEqual('Cancel');
  }));

  it('should call ReserveAbsence() on Reserve button click', async(() => {
    fixture.detectChanges();
    spyOn(component, 'ReserveAbsence');

    let el = fixture.debugElement.query(By.css('.reserve-button'));
    let button = el.nativeElement;

    button.click();

    fixture.whenStable().then(() => {
      expect(component.ReserveAbsence).toHaveBeenCalled();
    })
  }));

  it('should call CancelReservedParkingbay() on Cancel button click', async(() => {
    let now = new Date();
    let absenceViewModel = new AbsenceViewModel();

    absenceViewModel.absenceViews = <AbsenceView[]>[{
      EmployeeId: 1,
      ParkingBaynumber: <ParkingBay>{ BayNumber: 21 },
      Absence: <Absence>{
        StartDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        EndDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
        ReservedBy: <EmployeeView>{ Id: 1, FirstName: "jan", LastName: "blom" }
      },
      BayOwner: 'John Wick'
    }];
    component.firstName = "jan";
    component.lastName = "blom";
    component.absenceViewModel = absenceViewModel;

    fixture.detectChanges();
    spyOn(component, 'CancelReservedParkingbay');

    let el = fixture.debugElement.query(By.css('.cancel-button'));
    let button = el.nativeElement;

    button.click();

    fixture.whenStable().then(() => {
      expect(component.CancelReservedParkingbay).toHaveBeenCalled();
      expect(component.firstName).toEqual("jan");
      expect(component.lastName).toEqual("blom");
    })
  }));

  it('should call ngOnChanges when absenceDtos input changes',
    () => {
      hostFixture = TestBed.createComponent(AbsenceViewListHostComponent);
      testHostComponent = hostFixture.componentInstance;

      let absenceviews = <AbsenceView[]>[
        { EmployeeId: 1, ParkingBaynumber: { BayNumber: 50 }, Absence: { StartDate: new Date(1501797600000), EndDate: new Date(1502834400000), ReservedBy: null }, BayOwner: "Brendan Huysamen" },
        { EmployeeId: 13, ParkingBaynumber: { BayNumber: 51 }, Absence: { StartDate: new Date(1500847200000), EndDate: new Date(1503784800000), ReservedBy: null }, BayOwner: "Quinton Walker" },
      ];

      testHostComponent.absenceDtos = absenceviews;

      spyOn(testHostComponent.absenceViewListHostComponent, 'ngOnChanges').and.callThrough();

      hostFixture.detectChanges();
      expect(testHostComponent.absenceViewListHostComponent.ngOnChanges).toHaveBeenCalled();
      expect(testHostComponent.absenceViewListHostComponent.absenceDtos).toEqual(absenceviews);
    });

});
