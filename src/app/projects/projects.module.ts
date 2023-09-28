import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { AddEditProjectComponent } from './components/popups/add-edit-project/add-edit-project.component';
import { MaterialModule } from "../app.material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { HttpClientModule } from "@angular/common/http";
// import { NgxsModule } from "@ngxs/store";
// import { ProjectState } from "./store/projects.state";


@NgModule({
    declarations: [
        AllProjectsComponent,
        AddEditProjectComponent,
        ActionMenuComponent
    ],
    exports: [
        ActionMenuComponent
    ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        // NgxsModule.forFeature([ProjectState])
    ]
})
export class ProjectsModule {
}
