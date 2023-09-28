// import { Project } from "../../types";
// import { Injectable } from "@angular/core";
// import { Action, Selector, State, StateContext } from "@ngxs/store";
// import { ProjectsActions } from "./projects.actions";
// import { Observable, tap } from "rxjs";
// import { ProjectService } from "../../services/projects.service";
//
// export interface ProjectsStateModel {
//     projects: Project[] | undefined;
// }
//
// @State<ProjectsStateModel>({
//     name: 'projects',
//     defaults: {
//         projects: undefined
//     }
// })
// @Injectable()
// export class ProjectState {
//     constructor(private projectsService: ProjectService) {
//     }
//
//     @Selector()
//     public static projects(state: ProjectsStateModel) {
//         return state.projects;
//     }
//
//     @Action(ProjectsActions.GetAllProjects)
//     public getAllProjects({getState, patchState}: StateContext<ProjectsStateModel>): Observable<Project[]> | undefined {
//         const projects = getState();
//
//         if (projects.projects !== undefined) {
//             if (!!projects && projects.projects!.length > 0 && projects.constructor === Object) {
//                 return;
//             }
//         }
//         return this.projectsService.GetAllProjects().pipe(tap(data => {
//             patchState({
//                 projects: data
//             });
//         }));
//     }
// }
