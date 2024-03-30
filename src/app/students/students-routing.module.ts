import {StudentRoutes} from "../route-data";
import {RouterModule, Routes} from "@angular/router";
import {AllStudentsComponent} from "./components/all-students/all-students.component";
import {NgModule} from "@angular/core";
import {AddEditStudentComponent} from "./components/add-edit-student/add-edit-student.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: StudentRoutes.All.url,
        pathMatch: 'full'
    },
    {
        path: StudentRoutes.All.url,
        component: AllStudentsComponent,
        data: {title: StudentRoutes.All.title}
    },
    {
        path: `${StudentRoutes.View.url}/:id`,
        component: AddEditStudentComponent,
        data: {title: StudentRoutes.View.title , mode: 0}
    },
    {
        path: `${StudentRoutes.Edit.url}/:id`,
        component: AddEditStudentComponent,
        data: {title: StudentRoutes.Edit.title , mode: 1}
    },
    {
        path: `${StudentRoutes.New.url}`,
        component: AddEditStudentComponent,
        data: {title: StudentRoutes.New.title}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentsRoutingModule {
}
