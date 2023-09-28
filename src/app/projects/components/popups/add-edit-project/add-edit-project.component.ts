import { Component, Inject, OnInit } from '@angular/core';
import { Common, ErrorMessages, Projects, SnackBarStatus } from "../../../../constants";
import { FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../../../../services/projects.service";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Project, Tag } from "../../../../types";
import firebase from "firebase/compat";
// import { Store } from "@ngxs/store";
import Timestamp = firebase.firestore.Timestamp;

@Component({
    selector: 'app-add-edit-project',
    templateUrl: './add-edit-project.component.html',
    styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {

    TITLE!: string;
    COMMON_MESSAGES = Common;
    PROJECT_MESSAGES = Projects;
    VALIDATION_MESSAGES = ErrorMessages;

    isSubmitted = false;
    showErrorMessage = false;
    tags: Tag[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private helperService: HelperService,
        private projectService: ProjectService,
        // private store: Store,
        private dialogRef: MatDialogRef<AddEditProjectComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { project: Project, edit: number }
    ) {
    }

    projectForm = this.formBuilder.group({
        PurchasingDate: this.formBuilder.control('', [Validators.required]),
        PurchasingPrice: this.formBuilder.control(0),
        Extend: this.formBuilder.control(''),
        Address: this.formBuilder.control(''),
        LandName: this.formBuilder.control(''),
        ProjectName: this.formBuilder.control('', [Validators.required]),
        PlanNo: this.formBuilder.control(''),
        DeedNo: this.formBuilder.control(''),
        Remarks: this.formBuilder.control(''),
        ID: this.formBuilder.control('', [Validators.required]),
    });


    ngOnInit(): void {
        if (this.data.edit == 1) {
            this.TITLE = this.PROJECT_MESSAGES.EDIT_PROJECT;
            this.projectForm.controls['Address'].setValue(this.data.project.Address);
            this.projectForm.controls['Extend'].setValue(this.data.project.Extend);
            this.projectForm.controls['ProjectName'].setValue(this.data.project.ProjectName);
            this.projectForm.controls['LandName'].setValue(this.data.project.LandName);
            this.projectForm.controls['Remarks'].setValue(this.data.project.Remarks);
            this.projectForm.controls['PlanNo'].setValue(this.data.project.PlanNo);
            this.projectForm.controls['DeedNo'].setValue(this.data.project.DeedNo);

            this.projectForm.controls['PurchasingPrice'].setValue(this.data.project.PurchasingPrice);
            let date = this.data.project.PurchasingDate as Timestamp;
            this.projectForm.controls['PurchasingDate'].setValue(date.toDate());
            this.projectForm.controls['ID'].setValue(this.data.project.ID);
        } else {
            this.TITLE = this.PROJECT_MESSAGES.ADD_NEW_PROJECT;
        }
    }

    onClickSave() {
        this.isSubmitted = true;

        if (this.projectForm.valid) {
            const project: Project = {
                Address: this.projectForm.value.Address,
                Extend: this.projectForm.value.Extend,
                ProjectName: this.projectForm.value.ProjectName,
                LandName: this.projectForm.value.LandName,
                Remarks: this.projectForm.value.Remarks || "",
                PurchasingPrice: this.projectForm.value.PurchasingPrice,
                PurchasingDate: new Date(this.projectForm.value.PurchasingDate),
                ID: this.projectForm.value.ID,
                IsActive: true,
                PlanNo: this.projectForm.value.PlanNo || "-",
                DeedNo: this.projectForm.value.DeedNo || "-",
            };
            debugger;
            this.dialogRef.close();

            if (this.data.edit == 1) {
                debugger;
                this.projectService.UpdateProject(project).then(r => {
                    if (!r.status) {
                        this.helperService.openSnackBar({
                            text: r.message,
                            status: SnackBarStatus.FAILED
                        });
                    } else {
                        this.helperService.openSnackBar({
                            text: Projects.PROJECT_UPDATED_SUCCESS,
                            status: SnackBarStatus.SUCCESS
                        });
                    }
                });
            } else {
                debugger;
                this.projectService.CreateProject(project).then(r => {
                    if (!r.status) {
                        debugger;
                        this.helperService.openSnackBar({
                            text: r.message,
                            status: SnackBarStatus.FAILED
                        });
                    } else {
                        this.helperService.openSnackBar({
                            text: Projects.PROJECT_ADDED_SUCCESS,
                            status: SnackBarStatus.SUCCESS
                        });
                    }
                }).catch(err => {
                    console.log(err);
                    debugger;
                    this.helperService.openSnackBar({
                        text: err.message,
                        status: SnackBarStatus.FAILED
                    });
                });
            }
        } else {
            this.showErrorMessage = true;
            this.projectForm.markAllAsTouched();
        }
    }
}
