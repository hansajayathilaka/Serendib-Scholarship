import { Component, OnInit, ViewChild } from '@angular/core';
import { Common, SnackBarStatus, UserManagementMessages } from "../../../constants";
import { User } from "../../../types";
import { UserService } from "../../../services/user.service";
import { HelperService } from "../../../services/helper.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { DeleteConfirmPopupComponent } from "../../../shared/delete-confirm-popup/delete-confirm-popup.component";
import { AddEditUserComponent } from "../popups/add-edit-user/add-edit-user.component";

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
    constructor(
        private matDialog: MatDialog,
        private userService: UserService,
        private helperService: HelperService
    ) {
    }

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
        UserManagementMessages.FIRSTNAME_LABEL,
        UserManagementMessages.LASTNAME_LABEL,
        UserManagementMessages.EMAIL_LABEL,
        UserManagementMessages.CONTACT_NUMBER_LABEL,
        UserManagementMessages.DELETE_USER_TITLE,
        UserManagementMessages.IS_DISABLE_LABEL
    ];

    dataSource: MatTableDataSource<User> = new MatTableDataSource();
    isLoading = true;
    USERS_MESSAGES = UserManagementMessages;

    ngOnInit() {
        this.userService.GetAllUsers()
            .then(data => {
                if (data === undefined || data.length === 0) {
                    this.isLoading = true;
                } else {
                    data = Array.from(data!);
                    this.dataSource = new MatTableDataSource(data);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                    this.isLoading = false;
                }
            });
    }

    onUserActiveStatusChange(user: User) {
        const snackBarRef = this.helperService.openAndGetSnackBar({
            text: Common.SAVING,
            status: SnackBarStatus.INFO
        });

        this.userService.UpdateUserStatus(user.UID!, !user.Disabled!).then(r => {
            snackBarRef.dismiss();
            if (!r.status) {
                this.helperService.openSnackBar({text: r.message, status: SnackBarStatus.FAILED});
            }
        });
    }

    onClickAddNewUser() {
        const dialogRef = this.matDialog.open(AddEditUserComponent, {width: '400px'});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onClickDelete(id: string) {
        const userName = this.dataSource.data.find(u => u.UID == id);
        const dialogRef = this.matDialog.open(DeleteConfirmPopupComponent, {
            width: '400px',
            data: {
                title: UserManagementMessages.DELETE_USER_TITLE,
                body: UserManagementMessages.DELETE_USER_MESSAGE,
                entityName: userName!.FirstName
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.DeleteUser(id).then((result) => {
                    if (result.status) {
                        window.location.reload();
                        this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.SUCCESS});
                    } else {
                        this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.FAILED});
                    }
                });
            }
        });
    }

}
