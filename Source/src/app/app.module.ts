import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BayOwnersListComponent } from './bay-owners-list/bay-owners-list.component';
import { BayOwnersListService } from './bay-owners-list/bay-owners-list.service';
import { MockBayOwnersListService } from './bay-owners-list/mock-bay-owners-list.service';
import { SearchDateCriteriaComponent } from './search-date-criteria/search-date-criteria.component';
import { AbsenceViewListComponent } from './absence-view-list/absence-view-list.component';
import { MockAbsenceViewListService } from './absence-view-list/mock-absence-view-list.service';
import { WebMapComponent } from './web-map/web-map.component';
import { WebMapModel } from './web-map/web-map.model';
import { OverlayService } from './web-map/overlay.service';
import { AbsenceViewListService } from './absence-view-list/absence-view-list.service';
import { AddAbsenceModalComponent } from './add-absence-modal/add-absence-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {AddAbsenceService} from './add-absence-modal/add-absence.service';
import { AbsenceViewModel } from './absence-view-list/absence-view.model';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeList} from './shared-models/employee-list-model';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeRouteComponent } from './home-route/home-route.component';
import { LogoutComponent } from './logout/logout.component';

    
const router= RouterModule.forRoot( [
    {
    component: HomeRouteComponent,
    path: '',
    canActivate: [
      AuthGuard
    ]
  },
  {  component: CallbackComponent,
  path: 'callback'
 }], {
   useHash: true
 });


@NgModule({
  declarations: [
    AppComponent,
    BayOwnersListComponent,
    SearchDateCriteriaComponent,
    AbsenceViewListComponent,
    WebMapComponent,
    AddAbsenceModalComponent,
    CallbackComponent,
    HomeRouteComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    router
  ],
  providers: [
    { provide: BayOwnersListService, useClass: BayOwnersListService }, 
    { provide: AbsenceViewListService, useClass: AbsenceViewListService },
    WebMapModel,
    AbsenceViewModel,
    OverlayService,
    AbsenceViewListService,
    AddAbsenceService,
    RouterModule,
    EmployeeList,
    AuthGuard
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
