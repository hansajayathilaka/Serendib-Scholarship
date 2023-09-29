import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSponsorsComponent } from './components/all-sponsors/all-sponsors.component';
import { AddEditSponsorComponent } from './components/popups/add-edit-sponsor/add-edit-sponsor.component';
import { SponsorsRoutingModule } from "./sponsors-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { MaterialModule } from "../app.material.module";


@NgModule({
    declarations: [
        AllSponsorsComponent,
        AddEditSponsorComponent,
        ActionMenuComponent
    ],
    imports: [
        CommonModule,
        SponsorsRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule
    ]
})
export class SponsorsModule {
}
