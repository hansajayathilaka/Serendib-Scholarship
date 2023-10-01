import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Common, Students } from "../../../constants";
import { MatTableDataSource } from "@angular/material/table";
import { Sponsor, Student } from "../../../types";
import { Subscription } from "rxjs";
import { StudentsService } from "../../../services/students.service";
import { MatDialog } from "@angular/material/dialog";
import { AddEditStudentComponent } from "../popups/add-edit-student/add-edit-student.component";
import { Router } from "@angular/router";
import {
    AddEditSponsorComponent
} from "../../../sponsors/components/popups/add-edit-sponsor/add-edit-sponsor.component";

@Component({
    selector: 'app-all-students',
    templateUrl: './all-students.component.html',
    styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
        Students.ID,
        Students.NAME,
        Students.EMAIL,
        Students.CONTACT_NUMBER,
        Students.SPONSOR,
        Common.ACTION_COLUMN_TEXT,
    ];

    dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

    STUDENT_MESSAGES = Students;
    COMMON_MESSAGES = Common;

    subscriptions: Subscription[] = [];
    isLoading = true;

    constructor(
        private router: Router,
        private studentsService: StudentsService,
        private matDialog: MatDialog
    ) {
    }

    async ngOnInit() {
        this.subscriptions.push(this.studentsService.getAllStudents().subscribe(data => {
            if (data === undefined) {
                this.isLoading = true;
            } else {
                data = Array.from(data!);
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.isLoading = false;
            }
        }));
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onClickSponsor(sponsor: Sponsor) {
        if (String(sponsor._ID) === 'NONE') {
            return;
        }
        const dialogRef = this.matDialog.open(AddEditSponsorComponent, {
            width: '800px',
            height: '500px',
            data: {sponsor: sponsor, mode: 0}
        })
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    ngOnClickAdd(): void {
        const dialogRef = this.matDialog.open(AddEditStudentComponent, {
            width: '800px',
            height: '500px',
            data: {edit: 0}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}
