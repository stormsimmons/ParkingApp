import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchDateCriteriaComponent } from './search-date-criteria.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockAbsenceViewModel } from '../absence-view-list/mock-absence-view.model';
import { AbsenceViewModel } from '../absence-view-list/absence-view.model';
import { AbsenceViewListService } from '../absence-view-list/absence-view-list.service';
import { MockAbsenceViewListService } from '../absence-view-list/mock-absence-view-list.service';
import {
  Http,
  BaseRequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('SearchDateCriteriaComponent', () => {
  let component: SearchDateCriteriaComponent;
  let fixture: ComponentFixture<SearchDateCriteriaComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchDateCriteriaComponent],
      providers: [  
        { provide: AbsenceViewModel, useValue: MockAbsenceViewModel.getModel() }
       ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })

      .overrideComponent(SearchDateCriteriaComponent,
      {
        set: {
          providers: [
            { provide: AbsenceViewListService, useClass: MockAbsenceViewListService },
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
        }})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDateCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should contain 3 buttons`,
    () => {
      let de = fixture.debugElement.queryAllNodes(By.css('button'));
      expect(de.length).toBe(3);
    });

  it(`should contain button with text "Today"`,
    () => {
      let de = fixture.debugElement.query(By.css('#Today'));
      htmlElement = de.nativeElement;
      expect(htmlElement.textContent).toContain('Today');
    });

  it(`should contain button with text "Week"`,
    () => {
      let de = fixture.debugElement.query(By.css('#Week'));
      htmlElement = de.nativeElement;
      expect(htmlElement.textContent).toContain('Week');
    });

  it(`should contain button with text "Month"`,
    () => {
      let de = fixture.debugElement.query(By.css('#Month'));
      htmlElement = de.nativeElement;
      expect(htmlElement.textContent).toContain('Month');
    });

});
