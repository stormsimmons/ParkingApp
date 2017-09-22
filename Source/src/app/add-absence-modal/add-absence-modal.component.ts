import { Component, OnInit, TemplateRef, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AddAbsenceService } from './add-absence.service';
import { Absence } from '../dtos/absence';
import { Employee } from '../dtos/employee';
import { BayOwnersListService } from '../bay-owners-list/bay-owners-list.service';
import { EmployeeList } from '../shared-models/employee-list-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-absence-modal',
  templateUrl: './add-absence-modal.component.html',
  styleUrls: ['./add-absence-modal.component.css'],
  providers: [DatePipe],
})
export class AddAbsenceModalComponent {

  private modalRef: NgbModalRef;
  public employee: Employee;
  private loggedOnUser: string;
  @Input() public employeeDtos: Employee[];
  now = new Date();
  date = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());

  constructor(private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private addAbsenceService: AddAbsenceService,
    private employeeService: BayOwnersListService,
    private datePipe: DatePipe) {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty("employeeDtos") && this.employeeDtos) {
      this.loggedOnUser = localStorage.getItem('user');
      this.employee = this.employeeDtos.find(x => x.UserName.toLowerCase() == this.loggedOnUser.toLowerCase());

    }

  }

  open(content) {
    this.modalRef = this.modalService.open(content);

  }
  close() {
    this.modalRef.close();
  }

  submit(formData: NgForm) {

    var today = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    if ((<Date>formData.value.start <= <Date>formData.value.end) && (formData.value.start >=  today || formData.value.end >= today)) {

      var counter = 0;

      if (this.employee.AbsenceList.length != 0) {

        for (var absence of this.employee.AbsenceList) {
          var oldEnd = absence.EndDate.toString().substring(0, 10);
          var oldStart = absence.StartDate.toString().substring(0, 10);

          if (
            (formData.value.start == oldEnd || formData.value.end == oldEnd)

            ||

            (formData.value.start < oldEnd && formData.value.end > oldEnd)

            ||

            ((formData.value.start > oldStart && formData.value.end > oldStart) && (formData.value.start < oldEnd && formData.value.end < oldEnd))

            ||

            (formData.value.start < oldStart && formData.value.end > oldStart)

            ||

            (formData.value.start == oldStart || formData.value.end == oldStart)
            ) {

            counter++;

          }

        }

        if (counter > 0) {

          alert("Your entry overlaps with one of your existing leave dates");

        }
        else {

          this.addEnteredAbsence(<Date>formData.value.start, <Date>formData.value.end);

          this.modalRef.close();
          alert("Submission Accepted");

        }

      }
      else {

        this.addEnteredAbsence(<Date>formData.value.start, <Date>formData.value.end);
        this.modalRef.close();
        alert("Submission Accepted");

      }

    }
    else {
      alert("Please make sure that your start date is before your end date and the start date or end date has not already passed");
    }

  }

  addEnteredAbsence(startdate: Date, enddate: Date) {
    this.loggedOnUser = localStorage.getItem('user');
    this.employee = this.employeeDtos.find(x => x.UserName.toLowerCase() == this.loggedOnUser.toLowerCase());

    this.addAbsenceService.postLogAbsence(startdate, enddate, this.employee.Id, response => {
      if (response.ok) {
        this.ref.detectChanges();
      }
    });
  }

}
