import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from "./app.material.module";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DeleteConfirmPopupComponent } from './shared/delete-confirm-popup/delete-confirm-popup.component';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireFunctionsModule, REGION } from "@angular/fire/compat/functions";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { AngularFireModule } from "@angular/fire/compat";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { BackwardConfirmPopupComponent } from './shared/backward-confirm-popup/backward-confirm-popup.component';
import {SponsorsModule} from "./sponsors/sponsors.module";
import { provideStorage,getStorage } from '@angular/fire/storage';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        DeleteConfirmPopupComponent,
        BackwardConfirmPopupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AuthModule,
        MaterialModule,
        SponsorsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireFunctionsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),
        provideStorage(() => getStorage()),
    ],
    providers: [
        {provide: REGION, useValue: 'us-central1'},
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true}},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
