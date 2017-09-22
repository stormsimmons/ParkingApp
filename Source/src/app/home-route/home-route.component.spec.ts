import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeRouteComponent } from './home-route.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbsenceViewListService } from '../absence-view-list/absence-view-list.service';
import { MockAbsenceViewListService } from '../absence-view-list/mock-absence-view-list.service';
import {
  Http,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {BayOwnersListService} from '../bay-owners-list/bay-owners-list.service';
import {MockBayOwnersListService} from '../bay-owners-list/mock-bay-owners-list.service';
import { EmployeeList } from '../shared-models/employee-list-model';

describe('HomeRouteComponent', () => {
  let component: HomeRouteComponent;
  let fixture: ComponentFixture<HomeRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeRouteComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })

      .overrideComponent(HomeRouteComponent,
      {
        set: {
          providers: [ EmployeeList,
            { provide: AbsenceViewListService, useClass: MockAbsenceViewListService },
            { provide: BayOwnersListService, useClass: MockBayOwnersListService},
            {
              provide: Http,
              useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
              },
              deps: [MockBackend, BaseRequestOptions]
            },
            { provide: MockBackend, useClass: MockBackend },
            { provide: BaseRequestOptions, useClass: BaseRequestOptions }
          ],
        }
      })
      .compileComponents();
  }));


   it(`should contain app-search-date-criteria selector`,
    () => {
      const fixture = TestBed.createComponent(HomeRouteComponent);
      fixture.detectChanges();
      let el = fixture.debugElement.queryAllNodes(By.css('app-search-date-criteria'));
      expect(el.length).not.toBe(0);
    });

  it(`should contain app-web-map selector`,
    () => {
      const fixture = TestBed.createComponent(HomeRouteComponent);
      fixture.detectChanges();
      let el = fixture.debugElement.queryAllNodes(By.css('app-web-map'));
      expect(el.length).not.toBe(0);
    });

  it(`should contain app-absence-view-list selector`,
    () => {
      const fixture = TestBed.createComponent(HomeRouteComponent);
      fixture.detectChanges();
      let el = fixture.debugElement.queryAllNodes(By.css('app-absence-view-list'));
      expect(el.length).not.toBe(0);
    });

  it(`should contain app-add-absence-modal selector`,
    () => {
      const fixture = TestBed.createComponent(HomeRouteComponent);
      fixture.detectChanges();
      let el = fixture.debugElement.queryAllNodes(By.css('app-add-absence-modal'));
      expect(el.length).not.toBe(0);
    });
});
