import {StudentRoutes} from "../route-data";
import {RouterModule, Routes} from "@angular/router";
import {AllStudentsComponent} from "./components/all-students/all-students.component";
import {NgModule} from "@angular/core";

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentsRoutingModule {
}
