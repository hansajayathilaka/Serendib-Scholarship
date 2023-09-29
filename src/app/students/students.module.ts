import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllStudentsComponent} from './components/all-students/all-students.component';
import {ActionMenuComponent} from './components/action-menu/action-menu.component';
import {AddEditStudentComponent} from './components/popups/add-edit-student/add-edit-student.component';
import {StudentsRoutingModule} from "./students-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from "../app.material.module";


@NgModule({
    declarations: [
        AllStudentsComponent,
        AddEditStudentComponent,
        ActionMenuComponent,
    ],
    imports: [
        CommonModule,
        StudentsRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class StudentsModule {
}
