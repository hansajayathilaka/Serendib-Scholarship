import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddEditUserComponent } from './components/popups/add-edit-user/add-edit-user.component';
import { UserProfileComponent } from './components/popups/user-profile/user-profile.component';
import { MaterialModule } from "../app.material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { ForgetPasswordEmailComponent } from './components/forget-password-email/forget-password-email.component';
import { ResetEmailSendStatusComponent } from './components/reset-email-send-status/reset-email-send-status.component';


@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ManageUsersComponent,
        AddEditUserComponent,
        UserProfileComponent,
        ForgetPasswordEmailComponent,
        ResetEmailSendStatusComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        FormsModule
    ]
})
export class AuthModule {
}
