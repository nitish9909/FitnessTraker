import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate , CanLoad{

    constructor(
        private authServie : AuthService,
        private router : Router          
        ){

    }

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
        if(this.authServie.isAuth()) {
            return true;
        }else {
            this.router.navigate(['/login']);
        } // we just cannot return true 
    }

    canLoad(route : Route){
        if(this.authServie.isAuth()) {
            return true;
        }else {
            this.router.navigate(['/login']);
        }
    }
}