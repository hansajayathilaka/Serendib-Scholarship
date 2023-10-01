import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../../services/helper.service";
import {ActionMenuItem, Sponsor} from "../../../types";
import {Common, Projects, SnackBarStatus, Sponsors} from "../../../constants";
import {DeleteConfirmPopupComponent} from "../../../shared/delete-confirm-popup/delete-confirm-popup.component";
import {AddEditSponsorComponent} from "../popups/add-edit-sponsor/add-edit-sponsor.component";
import {SponsorsService} from "../../../services/sponsors.service";
import { FileUploadComponent } from "../../../shared/file-upload/file-upload.component";

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private sponsorsService: SponsorsService,
        private helperService: HelperService
    ) { }

    @Input() data!: Sponsor;

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
        const dialogRef = this.matDialog.open(AddEditSponsorComponent, {
            width: '800px',
            height: '500px',
            data: {sponsor: this.data, mode: 1}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onClickView(): void {
        const dialogRef = this.matDialog.open(AddEditSponsorComponent, {
            width: '800px',
            height: '500px',
            data: {sponsor: this.data, mode: 0}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
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
                title: Sponsors.DELETE_TITLE,
                body: Sponsors.DELETE_CONFIRM,
                entityName: this.data.Name.First + " " + this.data.Name.Last
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.sponsorsService.deleteSponsor(this.data).then(() => {
                    this.helperService.openSnackBar({
                        text: Sponsors.DELETED_SUCCESS,
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
