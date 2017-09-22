import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import{Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { CallbackComponent } from './callback.component';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let mockRouter = {
  navigate: jasmine.createSpy('navigate')};
let mockSomeService = {
  queryParams: () => {}
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackComponent ],
      providers:[ { provide: Router, useValue: mockRouter },{ provide: ActivatedRoute, useValue: mockSomeService }, Http],
      imports: [
    RouterTestingModule.withRoutes([{ component: CallbackComponent,
  path: 'callback'}, ])
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
