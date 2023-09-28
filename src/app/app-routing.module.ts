import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { LoginRequiredGuard } from "./guards/login-required.guard";
import {
    AuthRoutes,
    ProjectRoutes, SponsorRoutes,
} from "./route-data";


const routes: Routes = [
    {
        path: '',
        redirectTo: SponsorRoutes.Root,
        pathMatch: 'full'
    },
    {
        path: AuthRoutes.Root,
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: ProjectRoutes.Root,
        loadChildren: () => import("./projects/projects.module").then(m => m.ProjectsModule),
        canActivate: [LoginRequiredGuard]
    },
    {
        path: SponsorRoutes.Root,
        loadChildren: () => import("./sponsors/sponsors.module").then(m => m.SponsorsModule),
        canActivate: [LoginRequiredGuard]
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
