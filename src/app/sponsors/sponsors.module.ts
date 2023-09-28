import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSponsorsComponent } from './components/all-sponsors/all-sponsors.component';
import { AddEditSponsorComponent } from './components/popups/add-edit-sponsor/add-edit-sponsor.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {ProjectsModule} from "../projects/projects.module";
import {SponsorsRoutingModule} from "./sponsors-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
// import {NgxsModule} from "@ngxs/store";
// import {SponsorState} from "./store/sponsors.state";



@NgModule({
  declarations: [
    AllSponsorsComponent,
    AddEditSponsorComponent,
    ActionMenuComponent
  ],
    imports: [
        CommonModule,
        SponsorsRoutingModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatMenuModule,
        MatDatepickerModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        // ProjectsModule,
        // NgxsModule.forFeature([SponsorState])
    ]
})
export class SponsorsModule { }
