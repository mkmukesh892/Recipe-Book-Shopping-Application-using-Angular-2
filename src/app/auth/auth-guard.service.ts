import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    private authService = inject(AuthService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
       return this.authService.isAuthenticated();
    }
}