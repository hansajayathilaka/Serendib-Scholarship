import { Component, Inject, OnInit } from '@angular/core';
import { Common, Sponsors } from "../../../../constants";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Sponsor, Student } from "../../../../types";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Student[]) { }
  TITLE = Sponsors.STUDENT_LIST
  COMMON_MESSAGES = Common;

  ngOnInit(): void {
    console.log(this.data)
  }

  protected readonly Common = Common;
}
