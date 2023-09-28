// import {Sponsor} from "../../types";
// import { Injectable } from "@angular/core";
// import { Action, Selector, State, StateContext } from "@ngxs/store";
// import { SponsorsActions } from "./sponsors.action";
// import { Observable, tap } from "rxjs";
// import {SponsorsService} from "../../services/sponsors.service";
//
// export interface SponsorsStateModel {
//     sponsors: Sponsor[] | undefined;
// }
//F
// @State<SponsorsStateModel>({
//     name: 'sponsors',
//     defaults: {
//         sponsors: undefined
//     }
// })
// @Injectable()
// export class SponsorState {
//     constructor(
//         private sponsorsService: SponsorsService
//     ) {
//     }
//
//     @Selector()
//     public static sponsors(state: SponsorsStateModel) {
//         return state.sponsors;
//     }
//
//     @Action(SponsorsActions.GetAllSponsors)
//     public getAllSponsors({getState, patchState}: StateContext<SponsorsStateModel>): Observable<Sponsor[]> | undefined {
//         const sponsors = getState();
//
//         if (sponsors.sponsors !== undefined) {
//             if (!!sponsors && sponsors.sponsors!.length > 0 && sponsors.constructor === Object) {
//                 return;
//             }
//         }
//         return this.sponsorsService.getAllSponsors().pipe(tap(data => {
//             patchState({
//                 sponsors: data
//             });
//         }));
//     }
// }
