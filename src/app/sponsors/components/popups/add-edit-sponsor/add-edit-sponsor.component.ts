import {Component, Inject, OnInit} from '@angular/core';
import {Address, Common, ErrorMessages, Names, SnackBarStatus, Sponsors} from "../../../../constants";
import {Sponsor} from "../../../../types";
import {FormBuilder, Validators} from "@angular/forms";
import {HelperService} from "../../../../services/helper.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SponsorsService} from "../../../../services/sponsors.service";

@Component({
  selector: 'app-add-edit-sponsor',
  templateUrl: './add-edit-sponsor.component.html',
  styleUrls: ['./add-edit-sponsor.component.scss']
})
export class AddEditSponsorComponent implements OnInit {

    TITLE!: string;
    COMMON_MESSAGES = Common;
    SPONSOR_MESSAGES = Sponsors;
    NAME_MESSAGES = Names;
    ADDRESS_MESSAGES = Address;

    VALIDATION_MESSAGES = ErrorMessages;

    isSubmitted = false;
    showErrorMessage = false;

  constructor(
      private formBuilder: FormBuilder,
      private helperService: HelperService,
      private sponsorsService: SponsorsService,
      // private store: Store,
      private dialogRef: MatDialogRef<AddEditSponsorComponent>,
      @Inject(MAT_DIALOG_DATA) private data: { sponsor: Sponsor, edit: number }

  ) {

  }

    sponsorForm = this.formBuilder.group({
        ID: this.formBuilder.control('', [Validators.required]),
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
    });


    ngOnInit(): void {
        if (this.data.edit == 1) {
            this.TITLE = this.SPONSOR_MESSAGES.EDIT;
            this.sponsorForm.controls['ID'].setValue(this.data.sponsor.ID);
            this.sponsorForm.controls['FirstName'].setValue(this.data.sponsor.Name.First);
            this.sponsorForm.controls['MiddleName'].setValue(this.data.sponsor.Name.Middle);
            this.sponsorForm.controls['LastName'].setValue(this.data.sponsor.Name.Last);
            this.sponsorForm.controls['Email'].setValue(this.data.sponsor.Email);
            this.sponsorForm.controls['ContactNumber'].setValue(this.data.sponsor.Phone);
            this.sponsorForm.controls['Address1'].setValue(this.data.sponsor.Address.Address1);
            this.sponsorForm.controls['Address2'].setValue(this.data.sponsor.Address.Address2);
            this.sponsorForm.controls['City'].setValue(this.data.sponsor.Address.City);
            this.sponsorForm.controls['State'].setValue(this.data.sponsor.Address.State);
            this.sponsorForm.controls['ZipCode'].setValue(this.data.sponsor.Address.ZipCode);
            this.sponsorForm.controls['Country'].setValue(this.data.sponsor.Address.Country);
        } else {
            this.TITLE = this.SPONSOR_MESSAGES.ADD_NEW;
        }
  }

    onClickSave() {
        this.isSubmitted = true;

        if (this.sponsorForm.valid) {
            const sponsor: Sponsor = {
                ID: this.sponsorForm.value.ID,
                Name: {
                    First: this.sponsorForm.value.FirstName ?? "",
                    Middle: this.sponsorForm.value.MiddleName ?? "",
                    Last: this.sponsorForm.value.LastName ?? ""
                },
                Email: this.sponsorForm.value.Email ?? "",
                Phone: this.sponsorForm.value.ContactNumber ?? "",
                Address: {
                    Address1: this.sponsorForm.value.Address1 ?? "",
                    Address2: this.sponsorForm.value.Address2 ?? "",
                    City: this.sponsorForm.value.City ?? "",
                    State: this.sponsorForm.value.State ?? "",
                    ZipCode: this.sponsorForm.value.ZipCode ?? "",
                    Country: this.sponsorForm.value.Country ?? ""
                },
                IsActive: true,
                _Deleted: false,
            }

            this.dialogRef.close();

            if (this.data.edit == 1) {
                sponsor._ID = this.data.sponsor._ID;
                this.sponsorsService.updateSponsor(sponsor).then(r => {
                    if (!r.status) {
                        this.helperService.openSnackBar({
                            text: r.message,
                            status: SnackBarStatus.FAILED
                        });
                    } else {
                        this.helperService.openSnackBar({
                            text: Sponsors.UPDATED_SUCCESS,
                            status: SnackBarStatus.SUCCESS
                        });
                    }
                });
            } else {
                this.sponsorsService.createSponsor(sponsor).then(r => {
                    if (!r.status) {
                        debugger;
                        this.helperService.openSnackBar({
                            text: r.message,
                            status: SnackBarStatus.FAILED
                        });
                    } else {
                        this.helperService.openSnackBar({
                            text: Sponsors.ADDED_SUCCESS,
                            status: SnackBarStatus.SUCCESS
                        });
                    }
                })
            }
        } else {
            this.showErrorMessage = true;
            this.sponsorForm.markAllAsTouched();
        }
    }

}
