import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbsenceView } from '../dtos/absenceView';
import { AbsenceViewListService } from './absence-view-list.service';
import { AbsenceViewModel } from './absence-view.model';
import { AbsenceViewModelBuilder } from '../absence-view-list/absence-view.modelbuilder';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';

@Component({
  selector: 'app-absence-view-list',
  templateUrl: './absence-view-list.component.html',
  styleUrls: ['./absence-view-list.component.css'],
  providers: [DatePipe],
})

export class AbsenceViewListComponent {

  @Input() absenceDtos: AbsenceView[];
  @Output() absenceDtosChange = new EventEmitter<AbsenceView[]>();
  fullName:string[] ;
  firstName:string;
  lastName:string;
  @Input() selectedSearchPeriod: SearchDateCriteria;
  dateRange: string;
  now = new Date();
  date = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
  lastDate: Date;

  constructor(private ref: ChangeDetectorRef, private _absenceViewListService: AbsenceViewListService, public absenceViewModel: AbsenceViewModel, private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('absenceDtos') && this.absenceDtos) {
      AbsenceViewModelBuilder.buildAbsenceViewModel(this.absenceViewModel, this.absenceDtos);
    }

    if (changes.hasOwnProperty('selectedSearchPeriod') && this.selectedSearchPeriod) {

      if (this.selectedSearchPeriod == 1) {
        this.lastDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate())
        this.dateRange = this.datePipe.transform(this.date, 'dd MMMM yyyy');
      }
      else {
        this.lastDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + this.selectedSearchPeriod)
        this.dateRange = this.datePipe.transform(this.date, 'dd MMMM yyyy') + " - " + this.datePipe.transform(this.lastDate, 'dd MMMM yyyy');
      }
    }

    this.fullName = localStorage.getItem('user') ? localStorage.getItem('user').split(".") : null;
    if (this.fullName) {
      this.firstName = this.fullName[0].charAt(0).toUpperCase() + this.fullName[0].slice(1);
      this.lastName = this.fullName[1].charAt(0).toUpperCase() + this.fullName[1].slice(1);
    }
  }

  ReserveAbsence(absenceView: AbsenceView) {
    this.fullName = localStorage.getItem('user').split(".");
    this.firstName = this.fullName[0].charAt(0).toUpperCase() + this.fullName[0].slice(1);
    this.lastName = this.fullName[1].charAt(0).toUpperCase() + this.fullName[1].slice(1);

    let loggedInUser = {
      "Id": 23,
      "FirstName": this.firstName,
       "LastName": this.lastName
    }

    this._absenceViewListService.postReserveParking(loggedInUser, absenceView, response => {
      if (response.ok) {
        absenceView.Absence.ReservedBy = loggedInUser;  
       this.absenceDtosChange.emit(this.absenceDtos);
        this.ref.detectChanges();
        
       
      }
    });
    

  }

  CancelReservedParkingbay(absenceView: AbsenceView) {

    this.fullName = localStorage.getItem('user').split(".");
    this.firstName = this.fullName[0].charAt(0).toUpperCase() + this.fullName[0].slice(1);
    this.lastName = this.fullName[1].charAt(0).toUpperCase() + this.fullName[1].slice(1);

    let loggedInUser = {
      "Id": 23,
      "FirstName": this.firstName,
      "LastName": this.lastName
    }

    this._absenceViewListService.postCancelReservedParkingbay(loggedInUser, absenceView, response => {
      if (response.ok) {
        absenceView.Absence.ReservedBy = null;
        this.absenceDtosChange.emit(this.absenceDtos);
        this.ref.detectChanges();
      }
    });
  }
}
