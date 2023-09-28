import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorRoutes } from "../route-data";
import { AllSponsorsComponent } from "./components/all-sponsors/all-sponsors.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: SponsorRoutes.All.url,
    pathMatch: 'full'
  },
  {
    path: SponsorRoutes.All.url,
    component: AllSponsorsComponent,
    data: {title: SponsorRoutes.All.title}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorsRoutingModule {
}
