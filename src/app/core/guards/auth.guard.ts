import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {loginService} from "@app/features/auth/login/login.service";



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: loginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
             //   this.router.navigate(['/auth/login']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
     //   this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    //    return false;
    }
}