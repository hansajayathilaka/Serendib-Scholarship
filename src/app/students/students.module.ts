import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllStudentsComponent} from './components/all-students/all-students.component';
import {ActionMenuComponent} from './components/action-menu/action-menu.component';
import {AddEditStudentComponent} from './components/popups/add-edit-student/add-edit-student.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {StudentsRoutingModule} from "./students-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
    declarations: [
        AllStudentsComponent,
        AddEditStudentComponent,
        ActionMenuComponent,
    ],
    imports: [
        CommonModule,
        StudentsRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatMenuModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule
    ]
})
export class StudentsModule {
}
