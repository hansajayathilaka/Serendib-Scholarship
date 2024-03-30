import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthMessages, ErrorMessages } from "../../../constants";
import { environment } from "../../../../environments/environment";

@Component({
    selector: 'app-forget-password-email',
    templateUrl: './forget-password-email.component.html',
    styleUrls: ['./forget-password-email.component.scss']
})
export class ForgetPasswordEmailComponent implements OnInit {
    @Input() isHidden: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService
    ) {
    }

    forgetPasswordEmailForm = this.formBuilder.group({
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
    });

    AUTH_MESSAGES = AuthMessages;
    VALIDATION_MESSAGES = ErrorMessages;

    LOGO_PATH = "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg";

    isLoading: boolean = false;
    logo: string = `${window.location.protocol}//${window.location.host}/${environment.config.loginLogo}`;

    ngOnInit(): void {
        this.spinner.hide().then();
    }

    getEmailErrorMessage(): string {
        if (this.forgetPasswordEmailForm.controls['email'].hasError('email')) {
            return this.VALIDATION_MESSAGES.EMAIL;
        }
        return this.VALIDATION_MESSAGES.required(this.AUTH_MESSAGES.EMAIL_LABEl);
    }

    onSubmit() {
        if (this.forgetPasswordEmailForm.valid) {
            this.isLoading = true;
            this.spinner.show().then(() => {

            });
        }
    }

}
