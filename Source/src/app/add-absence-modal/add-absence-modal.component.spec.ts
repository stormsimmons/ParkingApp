import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAbsenceModalComponent } from './add-absence-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddAbsenceService } from './add-absence.service';
import {
  Http,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BayOwnersListService } from '../bay-owners-list/bay-owners-list.service';

describe('AddAbsenceModalComponent', () => {
  let component: AddAbsenceModalComponent;
  let fixture: ComponentFixture<AddAbsenceModalComponent>;
let htmlElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAbsenceModalComponent],
      imports: [FormsModule, NgbModule.forRoot()],
      providers: [AddAbsenceService, BayOwnersListService,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }, { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbsenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  it(`should contain 1 buttons to add an absence if employee is a bay owner`,
    () => {
      
      component.employee = {
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
      };

      fixture.detectChanges();

      let de = fixture.debugElement.queryAllNodes(By.css('button'));
    
      expect(de.length).toBe(1);
      
    });

    it(`should contain 0 buttons to add an absence if employee is not a bay owner`,
    () => {
      
 

      let de = fixture.debugElement.queryAllNodes(By.css('button'));
    
      expect(de.length).toBe(0);
      
    });
  
  it(`should contain button with text "AddAbsence"`,
    () => {

      component.employee = {
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
      };

      fixture.detectChanges();



      let de = fixture.debugElement.query(By.css('button'));
        
      htmlElement = de.nativeElement;
      expect(htmlElement.textContent).toContain('Add Absence');
    });

      it(`should contain 1 container div`,
    () => {
      let de = fixture.debugElement.queryAll(By.css('.container'));
      
      expect(de.length).toBe(1);
      
    });
});
