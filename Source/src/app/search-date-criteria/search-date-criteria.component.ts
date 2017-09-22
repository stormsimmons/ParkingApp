import { Component, Output, EventEmitter } from '@angular/core';
import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbsenceViewModel } from '../absence-view-list/absence-view.model';
import { AbsenceViewListService } from '../absence-view-list/absence-view-list.service';

@Component({
  selector: 'app-search-date-criteria',
  templateUrl: './search-date-criteria.component.html',
  styleUrls: ['./search-date-criteria.component.css']
})

export class SearchDateCriteriaComponent {

  public SearchDateCriteria = SearchDateCriteria;
  @Output() periodChanged = new EventEmitter<SearchDateCriteria>();

  constructor(private _absenceViewListService: AbsenceViewListService) { }

  ngOnInit() {
    this.periodChanged.emit(SearchDateCriteria.Today);
  }

  setSelectedSearchDate(input: SearchDateCriteria) {
    this.periodChanged.emit(input);
  }
}

