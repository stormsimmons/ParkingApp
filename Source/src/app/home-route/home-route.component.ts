import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BayOwnersListService } from '../bay-owners-list/bay-owners-list.service';
import { Employee } from '../dtos/employee';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { AbsenceView } from '../dtos/absenceView';
import { AbsenceViewListService } from '../absence-view-list/absence-view-list.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent implements OnInit {

  title = 'PARKING APP';
  selectedSearchPeriod: SearchDateCriteria;
  absenceDtos: AbsenceView[];
  public prefix = environment.urlPrefix;
  public emiLogo = this.prefix + "assets/emi_logo-4.png";

  loggedOnUser: string[];
  private code;
  private user;
  public firstName;
  public lastName;
  private employee: Employee;
  public employeeDtos: Employee[];

  constructor(public bayOwnerService: BayOwnersListService, public absenceViewListService: AbsenceViewListService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {


    this.loggedOnUser = localStorage.getItem('user') ? localStorage.getItem('user').split(".") : null;
    if (this.loggedOnUser) {
      this.firstName = this.loggedOnUser[0].charAt(0).toUpperCase() + this.loggedOnUser[0].slice(1);
      this.lastName = this.loggedOnUser[1].charAt(0).toUpperCase() + this.loggedOnUser[1].slice(1);
    }

    this.bayOwnerService.getBayOwnersList().subscribe(employees => {

      this.employeeDtos = employees;
      this.buildEmployee();
      
      
    })


  }

  buildEmployee() {
    if (localStorage.getItem('user')) {
      this.employee = this.employeeDtos.find(
        x => x.UserName.toLowerCase() == localStorage.getItem('user').toLowerCase());

    }
  }

  searchPeriodChanged(criteria: SearchDateCriteria) {
    this.selectedSearchPeriod = criteria;
    this.absenceViewListService.getAbsenceViewList(criteria).subscribe((absenceViews) => {
      this.absenceDtos = absenceViews;
    });
  }

  absenceDtoUpdated(list: AbsenceView[]) {

    this.absenceDtos = [];

    this.ref.detectChanges();
    this.absenceDtos = list;

  }

}
