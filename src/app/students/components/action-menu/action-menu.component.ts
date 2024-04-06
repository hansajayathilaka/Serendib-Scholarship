import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../../services/helper.service";
import {ActionMenuItem, Student} from "../../../types";
import {Common, SnackBarStatus, Students} from "../../../constants";
import {DeleteConfirmPopupComponent} from "../../../shared/delete-confirm-popup/delete-confirm-popup.component";
import {StudentsService} from "../../../services/students.service";
import { FileUploadComponent } from "../../../shared/file-upload/file-upload.component";
import { Router } from "@angular/router";

@Component({
    selector: 'app-action-menu',
    templateUrl: './action-menu.component.html',
    styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

    constructor(
        private matDialog: MatDialog,
        private studentsService: StudentsService,
        private helperService: HelperService,
        private router: Router
    ) {
    }

    @Input() data!: Student;

    ACTION_MENU_ITEMS: ActionMenuItem<ActionMenuComponent>[] = [
        {
            actionText: Common.EDIT,
            iconName: 'edit',
            action: "onClickEdit"
        },
        {
            actionText: Common.VIEW,
            iconName: 'visibility',
            action: "onClickView"
        },
        {
            actionText: Common.ATTACHMENTS,
            iconName: 'upload',
            action: "onClickUpload"
        },
        {
            actionText: Common.DELETE_BUTTON_TEXT,
            iconName: 'delete',
            action: "onClickDelete"
        }
    ];

    ngOnInit(): void {
    }

    onClickEdit(): void {
        this.router.navigate(['students/edit', this.data._ID], {queryParams: {mode: 1}}).then();
    }

    onClickView(): void {
        this.router.navigate(['students/view', this.data._ID], {queryParams: {mode: 0}}).then();
    }

    onClickUpload(): void {
        const dialogRef = this.matDialog.open(FileUploadComponent, {
            width: '800px',
            data: this.data,
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onClickDelete(): void {
        const dialogRef = this.matDialog.open(DeleteConfirmPopupComponent, {
            width: '350px',
            data: {
                title: Students.DELETE_TITLE,
                body: Students.DELETE_CONFIRM,
                entityName: this.data.Name.First + " " + this.data.Name.Last
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.studentsService.deleteStudent(this.data).then(() => {
                    this.helperService.openSnackBar({
                        text: Students.DELETED_SUCCESS,
                        status: SnackBarStatus.SUCCESS
                    });
                });
            }
        });
    }

    invokeAction(action: keyof ActionMenuComponent) {
        (this[action] as (() => void))();
    }

}
