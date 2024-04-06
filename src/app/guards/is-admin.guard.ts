import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { StudentRoutes } from "../route-data";


@Injectable({
    providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(): boolean | UrlTree {
        if (!this.auth.isAdmin()) {
            return this.router.createUrlTree([`${StudentRoutes.Root}/${StudentRoutes.All.url}`]);
        }
        return true;
    }

}
