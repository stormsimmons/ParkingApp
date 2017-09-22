import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BayOwnersListComponent } from './bay-owners-list.component';
import { MockBayOwnersListService } from './mock-bay-owners-list.service';
import { Injectable, ReflectiveInjector } from '@angular/core';
import {
  Http,
  Response,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Employee } from '../dtos/employee';
import { WebMapModel } from '../web-map/web-map.model';
import { ParkingBayModel } from '../web-map/parkingbay.model';
import { MockWebMapModel } from '../web-map/mock-web-map.model';


describe('BayOwnersListComponent', () => {
  let component: BayOwnersListComponent;
  let fixture: ComponentFixture<BayOwnersListComponent>;
  let service: MockBayOwnersListService;
  let htmlEl: HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [BayOwnersListComponent],
    })
      .overrideComponent(BayOwnersListComponent,
      {
        set: {
          providers: [ 
            { provide: MockBayOwnersListService, useClass: MockBayOwnersListService },
            {
              provide: Http,
              useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
              },

              deps: [MockBackend, BaseRequestOptions]
            },
            { provide: MockBackend, useClass: MockBackend },
            { provide: BaseRequestOptions, useClass: BaseRequestOptions }
            
          ]
        }
      })
      .compileComponents();

  });

  it('should be created', () => {
    fixture = TestBed.createComponent(BayOwnersListComponent);
    component = fixture.componentInstance;
    component.webMapModel = new WebMapModel();
    component.webMapModel.parkingBays = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should contain table`,
    () => {
      fixture = TestBed.createComponent(BayOwnersListComponent);
      component = fixture.componentInstance;
      component.webMapModel = new WebMapModel();
      component.webMapModel.parkingBays = [];

      fixture.detectChanges();
      let el = fixture.debugElement.queryAllNodes(By.css('table'));
      expect(el.length).not.toBe(0);
    });

  it(`should contain label`,
    () => {
      fixture = TestBed.createComponent(BayOwnersListComponent);
      component = fixture.componentInstance;
      component.webMapModel = new WebMapModel();
      component.webMapModel.parkingBays = [];
      fixture.detectChanges();
      let el = fixture.debugElement.queryAllNodes(By.css('label'));
      expect(el.length).not.toBe(0);
    });

  it(`should contain label with text "Parking Bay List"`,
    () => {
      fixture = TestBed.createComponent(BayOwnersListComponent);
      component = fixture.componentInstance;
      component.webMapModel = new WebMapModel();
      component.webMapModel.parkingBays = [];

      fixture.detectChanges();

      let el = fixture.debugElement.query(By.css('label'));
      htmlEl = el.nativeElement;
      expect(htmlEl.textContent).toContain('Parking Bay List');
    });

  it('should return empty table when given empty input',
    () => {
      // Arrange
      fixture = TestBed.createComponent(BayOwnersListComponent);
      component = fixture.componentInstance;
      component.webMapModel = new WebMapModel();
      component.webMapModel.parkingBays = [];

      // Act
      fixture.detectChanges();

      // Assert
      let el = fixture.debugElement.queryAll(By.css('tr'));
      expect(el.length).toEqual(1);
    });

  it('should return populated table when given populated model',
    () => {
      // Arrange
      fixture = TestBed.createComponent(BayOwnersListComponent);
      component = fixture.componentInstance;
      component.webMapModel = MockWebMapModel.getModel();

      // Act
      fixture.detectChanges();

      // Assert
      let el = fixture.debugElement.queryAll(By.css('tr'));

      expect(el.length).toEqual(3);
      expect(el[0].children[0].name).toEqual('td');
      expect(el[0].children[0].nativeElement.innerHTML).toEqual('1');
      expect(el[0].children[1].nativeElement.innerHTML).toEqual('Jan');
      expect(el[1].children[1].name).toEqual('td');
      expect(el[1].children[0].nativeElement.innerHTML).toEqual('2');
      expect(el[1].children[1].nativeElement.innerHTML).toEqual('Koos');
    });
});
