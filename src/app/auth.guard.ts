import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthenticationService) {
    }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
         return typeof(this.authService.id) === 'number';
    }
}