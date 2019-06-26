import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

import { UIService } from '../shared/ui.service';

//we can inject a service inside the service to be able to achieve this we will have @Injectable

@Injectable()
// auth.service help us to fake the login and also inform the other component about this to adjust accordingly

export class AuthService {

    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    //we can use the router service in the constructor to use it

    constructor(
        private router : Router, 
        private afAuth : AngularFireAuth,
        private trainingService : TrainingService,
        private uiService : UIService
        ){  // this router allows us to navigate or move around programtically

    }

    initAuthListner(){
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.isAuthenticated= true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscription();        
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated=false;
            }
        })
    }

    //to be called from the signup component
    registerUser(authData : AuthData){
        this.uiService.loadingStateChnaged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
        .then(result => {
            this.uiService.loadingStateChnaged.next(false);
        })
        .catch(error =>{
            this.uiService.loadingStateChnaged.next(false);
            this.uiService.showSnackbar(error.message, null , 3000);
        });
        
    }


    // to be called from the login component
    login(authData : AuthData){
        this.uiService.loadingStateChnaged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
        .then(result => {
            this.uiService.loadingStateChnaged.next(false);
            
        })
        .catch(error =>{
            this.uiService.loadingStateChnaged.next(false);
            this.uiService.showSnackbar(error.message, null , 3000);
        })

    }

    logout(){
        this.afAuth.auth.signOut();
        
    }



    isAuth(){
        return this.isAuthenticated;
    }

    // we will add a event emitted provided by rxjs so inform the components about the changes in tha authentication flow



    // we get duplicate method in register and login so we use diffrent approach to make code light

}