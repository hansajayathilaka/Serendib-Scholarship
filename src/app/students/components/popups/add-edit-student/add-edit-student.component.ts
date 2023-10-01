import { Component, Inject, OnInit } from '@angular/core';
import { Address, Common, ErrorMessages, Names, SnackBarStatus, Students } from "../../../../constants";
import { FormBuilder } from "@angular/forms";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Sponsor, Student } from "../../../../types";
import { StudentsService } from "../../../../services/students.service";
import { Subscription } from "rxjs";
import { SponsorsService } from "../../../../services/sponsors.service";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
    selector: 'app-add-edit-student',
    templateUrl: './add-edit-student.component.html',
    styleUrls: ['./add-edit-student.component.scss']
})
export class AddEditStudentComponent implements OnInit {

    TITLE!: string;
    COMMON_MESSAGES = Common;
    STUDENT_MESSAGES = Students;
    NAME_MESSAGES = Names;
    ADDRESS_MESSAGES = Address;

    VALIDATION_MESSAGES = ErrorMessages;

    isSubmitted = false;
    showErrorMessage = false;

    sponsors: Sponsor[] = [];
    subscriptions: Subscription[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private helperService: HelperService,
        private studentsService: StudentsService,
        private sponsorsService: SponsorsService,
        // private store: Store,
        private dialogRef: MatDialogRef<AddEditStudentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { student: Student, mode: number }
    ) {
    }

    studentForm = this.formBuilder.group({
        ID: this.formBuilder.control(''),
        FirstName: this.formBuilder.control(''),
        MiddleName: this.formBuilder.control(''),
        LastName: this.formBuilder.control(''),
        Email: this.formBuilder.control(''),
        ContactNumber: this.formBuilder.control(''),
        Address1: this.formBuilder.control(''),
        Address2: this.formBuilder.control(''),
        City: this.formBuilder.control(''),
        State: this.formBuilder.control(''),
        ZipCode: this.formBuilder.control(''),
        Country: this.formBuilder.control(''),

        Institute: this.formBuilder.control(''),
        Course: this.formBuilder.control(''),
        CourseDuration: this.formBuilder.control(''),
        StartDate: this.formBuilder.control(''),
        StudentsStudyYear: this.formBuilder.control(''),
        Sponsor: this.formBuilder.control(''),
    });

    async ngOnInit() {
        if (this.data.mode == 1 || this.data.mode == 0) {
            this.TITLE = this.STUDENT_MESSAGES.EDIT;
            this.studentForm.controls['ID'].setValue(this.data.student.ID);
            this.studentForm.controls['FirstName'].setValue(this.data.student.Name.First);
            this.studentForm.controls['MiddleName'].setValue(this.data.student.Name.Middle);
            this.studentForm.controls['LastName'].setValue(this.data.student.Name.Last);
            this.studentForm.controls['Email'].setValue(this.data.student.Email);
            this.studentForm.controls['ContactNumber'].setValue(this.data.student.Phone);
            this.studentForm.controls['Address1'].setValue(this.data.student.Address.Address1);
            this.studentForm.controls['Address2'].setValue(this.data.student.Address.Address2);
            this.studentForm.controls['City'].setValue(this.data.student.Address.City);
            this.studentForm.controls['State'].setValue(this.data.student.Address.State);
            this.studentForm.controls['ZipCode'].setValue(this.data.student.Address.ZipCode);
            this.studentForm.controls['Country'].setValue(this.data.student.Address.Country);

            this.studentForm.controls['Institute'].setValue(this.data.student.Institute);
            this.studentForm.controls['Course'].setValue(this.data.student.Course);
            this.studentForm.controls['CourseDuration'].setValue(this.data.student.CourseDuration);
            try{
                this.studentForm.controls['StartDate'].setValue((this.data.student.StartDate as Timestamp).toDate());
            } catch (e) { }
            this.studentForm.controls['StudentsStudyYear'].setValue(this.data.student.StudentsStudyYear);

        } else {
            this.TITLE = this.STUDENT_MESSAGES.ADD_NEW;
        }

        if (this.data.mode == 0) {
            this.TITLE = this.STUDENT_MESSAGES.VIEW;
            this.studentForm.disable();
        }

        this.subscriptions.push(this.sponsorsService.getAllSponsors().subscribe(data => {
            if (data !== undefined) {
                this.sponsors = data;
                if (this.data.student._Sponsor) {
                    const _sponsor = this.sponsors.find(s => String(s._ID) == this.data.student._Sponsor?.id);
                    if (_sponsor && String(_sponsor._ID) === 'NONE' || !_sponsor) {
                        this.studentForm.controls['Sponsor'].setValue('NONE');
                    } else {
                        this.studentForm.controls['Sponsor'].setValue(_sponsor);
                    }
                }
            }
        }));
    }

    onClickSave() {
        this.isSubmitted = true;

        if (this.studentForm.valid) {
            const student: Student = {
                ID: this.studentForm.value.ID,
                Name: {
                    First: this.studentForm.value.FirstName ?? "",
                    Middle: this.studentForm.value.MiddleName ?? "",
                    Last: this.studentForm.value.LastName ?? ""
                },
                Email: this.studentForm.value.Email ?? "",
                Phone: this.studentForm.value.ContactNumber ?? "",
                Address: {
                    Address1: this.studentForm.value.Address1 ?? "",
                    Address2: this.studentForm.value.Address2 ?? "",
                    City: this.studentForm.value.City ?? "",
                    State: this.studentForm.value.State ?? "",
                    ZipCode: this.studentForm.value.ZipCode ?? "",
                    Country: this.studentForm.value.Country ?? ""
                },
                Institute: this.studentForm.value.Institute ?? "",
                Course: this.studentForm.value.Course ?? "",
                CourseDuration: this.studentForm.value.CourseDuration ?? "",
                StartDate: this.studentForm.value.StartDate ?? "",
                StudentsStudyYear: this.studentForm.value.StudentsStudyYear ?? "",
                _Sponsor: this.studentForm.value.Sponsor ? this.sponsorsService.getRef(this.studentForm.value.Sponsor) : this.sponsorsService.getRef(),

                IsActive: true,
                _Deleted: false,
            }

            this.dialogRef.close();

            if (this.data.mode == 1) {
                student._ID = this.data.student._ID;
                this.studentsService.updateStudent(student).then(r => {
                    if (!r.status) {
                        this.helperService.openSnackBar({
                            text: r.message,
                            status: SnackBarStatus.FAILED
                        });
                    } else {
                        this.helperService.openSnackBar({
                            text: Students.UPDATED_SUCCESS,
                            status: SnackBarStatus.SUCCESS
                        });
                    }
                });
            } else {
                this.studentsService.createStudent(student).then(r => {
                    if (!r.status) {
                        this.helperService.openSnackBar({
                            text: r.message,
                            status: SnackBarStatus.FAILED
                        });
                    } else {
                        this.helperService.openSnackBar({
                            text: Students.ADDED_SUCCESS,
                            status: SnackBarStatus.SUCCESS
                        });
                    }
                })
            }
        } else {
            this.showErrorMessage = true;
            this.studentForm.markAllAsTouched();
        }
    }

}
