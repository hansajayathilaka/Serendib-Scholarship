import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SponsorsService} from "../../../services/sponsors.service";
import {HelperService} from "../../../services/helper.service";
import {ActionMenuItem, Student} from "../../../types";
import {Common, Projects, SnackBarStatus, Sponsors, Students} from "../../../constants";
import {AddEditStudentComponent} from "../popups/add-edit-student/add-edit-student.component";
import {DeleteConfirmPopupComponent} from "../../../shared/delete-confirm-popup/delete-confirm-popup.component";
import {StudentsService} from "../../../services/students.service";

@Component({
    selector: 'app-action-menu',
    templateUrl: './action-menu.component.html',
    styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

    constructor(
        private matDialog: MatDialog,
        private studentsService: StudentsService,
        private helperService: HelperService
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
            actionText: Common.DELETE_BUTTON_TEXT,
            iconName: 'delete',
            action: "onClickDelete"
        }
    ];

    ngOnInit(): void {
    }

    onClickEdit(): void {
        const dialogRef = this.matDialog.open(AddEditStudentComponent, {
            width: '800px',
            height: '500px',
            data: {student: this.data, edit: 1}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onClickView(): void {
        const dialogRef = this.matDialog.open(AddEditStudentComponent, {
            width: '800px',
            height: '500px',
            data: {student: this.data, mode: 1}
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
            debugger;
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
