import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import { Location } from '@angular/common'
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import {MatDatepicker} from "@angular/material/datepicker";
import {Address, Common, ErrorMessages, Names, SnackBarStatus, Students} from "../../../constants";
import {Sponsor, Student} from "../../../types";
import {HelperService} from "../../../services/helper.service";
import {StudentsService} from "../../../services/students.service";
import {SponsorsService} from "../../../services/sponsors.service";
import { ActivatedRoute } from "@angular/router";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.scss'],
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
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
    student!: Student;
    studentId = "";
    mode!: number;

    constructor(
        private formBuilder: FormBuilder,
        private helperService: HelperService,
        private studentsService: StudentsService,
        private sponsorsService: SponsorsService,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.route.params.subscribe(params => {
            this.studentId = params['id'];
        });
        let modeStr = this.route.snapshot.queryParamMap.get("mode");
        if (modeStr === null || modeStr === undefined) {
            this.mode = 2;
        } else {
            this.mode = +modeStr;
        }
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
        AddressText: this.formBuilder.control(''),
        City: this.formBuilder.control(''),
        State: this.formBuilder.control(''),
        ZipCode: this.formBuilder.control(''),
        StandingOrderNumber: this.formBuilder.control(''),
        Country: this.formBuilder.control(''),
        Notes: this.formBuilder.control(''),
        ScholarshipStartDate: this.formBuilder.control(''),
        Institute: this.formBuilder.control(''),
        Course: this.formBuilder.control(''),
        CourseDuration: this.formBuilder.control(''),
        StartDate: this.formBuilder.control(''),
        ExpectedCompletionDate: this.formBuilder.control(''),
        StudentsStudyYear: this.formBuilder.control(''),
        Sponsor: this.formBuilder.control('', [Validators.required]),
    });

    async ngOnInit() {
        if (this.mode == 1 || this.mode == 0) {
            this.student = (await this.studentsService.getStudent(this.studentId)).data as Student;
            this.TITLE = this.STUDENT_MESSAGES.EDIT;
            this.studentForm.controls['ID'].setValue(this.student.ID);
            this.studentForm.controls['FirstName'].setValue(this.student.Name.First);
            this.studentForm.controls['MiddleName'].setValue(this.student.Name.Middle);
            this.studentForm.controls['LastName'].setValue(this.student.Name.Last);
            this.studentForm.controls['Email'].setValue(this.student.Email);
            this.studentForm.controls['ContactNumber'].setValue(this.student.Phone);
            this.studentForm.controls['Address1'].setValue(this.student.Address.Address1);
            this.studentForm.controls['Address2'].setValue(this.student.Address.Address2);
            this.studentForm.controls['AddressText'].setValue(this.student.AddressText);
            this.studentForm.controls['City'].setValue(this.student.Address.City);
            this.studentForm.controls['State'].setValue(this.student.Address.State);
            this.studentForm.controls['ZipCode'].setValue(this.student.Address.ZipCode);
            this.studentForm.controls['StandingOrderNumber'].setValue(this.student.StandingOrderNumber);
            this.studentForm.controls['ScholarshipStartDate'].setValue((this.student.ScholarshipStartDate as Timestamp).toDate());
            this.studentForm.controls['Country'].setValue(this.student.Address.Country);
            this.studentForm.controls['Notes'].setValue(this.student.Notes);
            this.studentForm.controls['Institute'].setValue(this.student.Institute);
            this.studentForm.controls['Course'].setValue(this.student.Course);
            this.studentForm.controls['CourseDuration'].setValue(this.student.CourseDuration);
            this.studentForm.controls['ExpectedCompletionDate'].setValue((this.student.ExpectedCompletionDate as Timestamp).toDate());
            try{
                this.studentForm.controls['StartDate'].setValue((this.student.StartDate as Timestamp).toDate());
            } catch (e) { }
            this.studentForm.controls['StudentsStudyYear'].setValue(this.student.StudentsStudyYear);

        } else {
            this.TITLE = this.STUDENT_MESSAGES.ADD_NEW;
            let studentId = await this.studentsService.nextStudentId();
            this.studentForm.controls['ID'].setValue(studentId);
        }

        if (this.mode == 0) {
            this.TITLE = this.STUDENT_MESSAGES.VIEW;
            this.studentForm.disable();
        }

        this.subscriptions.push(this.sponsorsService.getAllSponsors().subscribe(data => {
            if (data !== undefined) {
                this.sponsors = data;
                console.log(this.sponsors);
                if (this.student?._Sponsor) {
                    const _sponsor = this.sponsors.find(s => String(s._ID) == this.student._Sponsor?.id);
                    if (_sponsor && String(_sponsor._ID) === 'NONE' || !_sponsor) {
                        this.studentForm.controls['Sponsor'].setValue('NONE');
                    } else {
                        this.studentForm.controls['Sponsor'].setValue(_sponsor);
                    }
                }
            }
        }));
    }

    onCancel() {
        this.location.back();
    }

    setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.studentForm.controls['StartDate'].value;
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.studentForm.controls['StartDate'].setValue(ctrlValue);
        datepicker.close();
    }

    setCompletionMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.studentForm.controls['ExpectedCompletionDate'].value;
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.studentForm.controls['ExpectedCompletionDate'].setValue(ctrlValue);
        datepicker.close();
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
                IsAttachmentsAvailable: false,
                Notes: this.studentForm.value.Notes ?? "",
                AddressText: this.studentForm.value.AddressText ?? "",
                Institute: this.studentForm.value.Institute ?? "",
                Course: this.studentForm.value.Course ?? "",
                StandingOrderNumber: this.studentForm.value.StandingOrderNumber ?? "",
                ScholarshipStartDate: this.studentForm.value.ScholarshipStartDate != "" ? new Date(this.studentForm.value.ScholarshipStartDate) : null,
                CourseDuration: this.studentForm.value.CourseDuration ?? "",
                StartDate: this.studentForm.value.StartDate != "" ? new Date(this.studentForm.value.StartDate) : null,
                ExpectedCompletionDate: this.studentForm.value.ExpectedCompletionDate != "" ? new Date(this.studentForm.value.ExpectedCompletionDate) : null,
                StudentsStudyYear: this.studentForm.value.StudentsStudyYear ?? "",
                _Sponsor: this.studentForm.value.Sponsor ? this.sponsorsService.getRef(this.studentForm.value.Sponsor) : this.sponsorsService.getRef(),
                PaymentRecords: "",
                Completed: false,

                IsActive: true,
                _Deleted: false,
            }

            if (this.mode == 1) {
                student._ID = this.student._ID;
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
