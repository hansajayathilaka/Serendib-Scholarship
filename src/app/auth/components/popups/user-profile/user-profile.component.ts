import { Component, OnInit } from '@angular/core';
import { AuthMessages, Common, ErrorMessages, SnackBarStatus, UserMessages } from "../../../../constants";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { User } from "../../../../types";
import { UserService } from "../../../../services/user.service";
import { HelperService } from "../../../../services/helper.service";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../services/auth.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    constructor(
        private formBuilder: UntypedFormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private dialogRef: MatDialogRef<UserProfileComponent>,
        private helperService: HelperService
    ) {
    }

    selectedTabIndex = 0;

    isSubmitted: boolean = false;
    isSubmittedBasicDataForm: boolean = false;
    hideCurrentPassword: boolean = true;
    hideNewPassword: boolean = true;
    hideConfirmPassword: boolean = true;
    isIncorrectOldPassword: boolean = false;
    user!: User
    title: string = UserMessages.EDIT_USER_PROFILE_TITLE;

    VALIDATION_MESSAGES = ErrorMessages;
    AUTH_MESSAGES = AuthMessages;
    COMMON_MESSAGES = Common;
    USER_MESSAGES = UserMessages;

    passwordForm = this.formBuilder.group({
        oldPassword: this.formBuilder.control('', [Validators.required]),
        newPassword: this.formBuilder.control('', [Validators.required, Validators.pattern(AuthMessages.STRONG_PASSWORD_REGEX)]),
        confirmPassword: this.formBuilder.control('', [Validators.required])
    });

    basicDataForm = this.formBuilder.group({
        firstName: this.formBuilder.control('', [Validators.required]),
        lastName: this.formBuilder.control('', [Validators.required]),
        phone: this.formBuilder.control('', [Validators.required, Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
    });

    ngOnInit(): void {
        const loggedUserId = JSON.parse(localStorage.getItem('user')!)['uid'];
        this.userService.GetAUser(loggedUserId)
            .subscribe(userData => {
                if (userData !== undefined) {
                    this.user = userData;
                    this.basicDataForm.patchValue({
                        firstName: userData.FirstName,
                        lastName: userData.LastName,
                        phone: userData.PhoneNumber
                    });
                }
            });
    }

    changeTitle(index: number) {
        if (index === 0) {
            this.selectedTabIndex = 0;
            this.title = UserMessages.EDIT_USER_PROFILE_TITLE;
        } else {
            this.selectedTabIndex = 1;
            this.title = this.AUTH_MESSAGES.CHANGE_PASSWORD_TITLE;
        }
    }

    onSaveClick(): void {
        this.isSubmittedBasicDataForm = true;
        if (this.basicDataForm.valid) {
            if (this.passwordForm.controls['newPassword'].value !== this.passwordForm.controls['confirmPassword'].value) {
                this.passwordForm.controls['confirmPassword'].setErrors({notMatch: true});
            } else {
                this.passwordForm.controls['confirmPassword'].setErrors(null);
                this.user.FirstName = this.basicDataForm.controls['firstName'].value;
                this.user.LastName = this.basicDataForm.controls['lastName'].value;
                this.user.PhoneNumber = this.basicDataForm.controls['phone'].value;
                this.userService.UpdateUserData(this.user).then(result => {
                    if (result.status) {
                        this.dialogRef.close();
                        this.helperService.openSnackBar({
                            text: result.message,
                            status: SnackBarStatus.SUCCESS
                        });
                    } else {
                        this.helperService.openSnackBar({
                            text: result.message,
                            status: SnackBarStatus.FAILED
                        });
                    }
                })
            }
        } else {
            this.basicDataForm.markAllAsTouched();
        }
    }

    getNewPasswordErrorMessage() {
        if (this.passwordForm.controls['newPassword'].hasError('pattern')) {
            return ErrorMessages.STRONG_PASSWORD_MESSAGE_TEXT;
        }
        return ErrorMessages.required(this.AUTH_MESSAGES.NEW_PASSWORD_LABEL);
    }

    getConfirmPasswordErrorMessage() {
        if (this.passwordForm.controls['confirmPassword'].hasError('notMatch')) {
            return ErrorMessages.PASSWORDS_NOT_MATCHING;
        }
        return ErrorMessages.required(this.AUTH_MESSAGES.CONFIRM_PASSWORD_LABEL);
    }

    onChangePassword() {
        this.isSubmitted = true;
        if (this.passwordForm.valid) {
            this.authService.ChangePassword(this.passwordForm.controls['oldPassword'].value, this.passwordForm.controls['newPassword'].value).then(result => {
                if (result.status) {
                    this.helperService.openSnackBar({
                        text: result.message,
                        status: SnackBarStatus.SUCCESS
                    });
                    this.dialogRef.close();
                } else {
                    if (result.data.code === 'auth/wrong-password') {
                        this.isIncorrectOldPassword = true;
                        this.passwordForm.get('oldPassword')!.setErrors({valid: false});
                        this.passwordForm.markAllAsTouched();
                    } else {
                        this.isIncorrectOldPassword = false;
                        this.helperService.openSnackBar({
                            text: result.message,
                            status: SnackBarStatus.FAILED
                        });
                    }
                }
            });
        } else {
            this.passwordForm.markAllAsTouched();
        }
    }
}
