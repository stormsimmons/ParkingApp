import { TestBed, async } from '@angular/core/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { AbsenceViewListService } from './absence-view-list/absence-view-list.service';
import { MockAbsenceViewListService } from './absence-view-list/mock-absence-view-list.service';
import {
  Http,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {BayOwnersListService} from './bay-owners-list/bay-owners-list.service';
import {MockBayOwnersListService} from './bay-owners-list/mock-bay-owners-list.service';
import { EmployeeList } from './shared-models/employee-list-model';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })

      .overrideComponent(AppComponent,
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


});
