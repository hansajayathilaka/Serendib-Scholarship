import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { Title } from "@angular/platform-browser";
import { Common, LoginStatus } from "./constants";
import { UserProfileComponent } from "./auth/components/popups/user-profile/user-profile.component";
import { environment } from "../environments/environment";
import { AuthRoutes, CustomerRoutes } from "./route-data";
import { NavigationMenuItems } from "./navigation-menu";
import { filter, map, mergeMap } from "rxjs";
import { LoginComponent } from "./auth/components/login/login.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private matDialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private auth: AuthService,
        private titleService: Title,
    ) {
        this.isLoggedIn = auth.isLoggedIn == LoginStatus.LOGGED_IN;
        this.name = auth.userData?.displayName;

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.isFirstLogin = event.url === `/${AuthRoutes.Root}/${AuthRoutes.SignUp}`;
                if (event.url === `/${CustomerRoutes.Root}/${CustomerRoutes.Ep}`) {
                    this.isCustomerUrl = true;
                }
                this.isForgetPassword = event.url === `/${AuthRoutes.Root}/${AuthRoutes.ForgetPassword}`;
            }
        });

        this.auth.InitAuth((user) => {
            if (user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
                if (!this.isForgetPassword) {
                    this.logout();
                }
            }
        });
    }

    COPYRIGHT = Common.COPYRIGHT_TEXT;
    PageTitle = Common.COMPANY_NAME

    navigationMenuItems = NavigationMenuItems;

    isForgetPassword = false;
    isLoggedIn = false;
    isFirstLogin = false;
    name: string | null | undefined = "";
    notificationCount = 0;
    hideNotification = true;

    isCustomerUrl = false;

    logo: string = `https://placehold.co/250x64?text=Serendib+Scholarships`;

    logout() {
        this.auth.SignOut().then(() => {
            this.isLoggedIn = false;
            this.router.navigate([`${AuthRoutes.Root}/${AuthRoutes.Login}`]).then(() => {

            });
        });
    }

    onClickUserData() {
        const dialogRef = this.matDialog.open(UserProfileComponent, {width: '400px'});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    private rootRoute(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.rootRoute(this.activatedRoute)),
            filter((route: ActivatedRoute) => route.outlet === 'primary'),
            mergeMap((route: ActivatedRoute) => route.data)
        ).subscribe((event: { [name: string]: any }) => {
            this.PageTitle = event['title'];
            this.titleService.setTitle(environment.config.appName);
        });
    }

    onLoadLogin(component: LoginComponent) {
        component.isHidden = true;
    }

}
