import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class UIService {
    loadingStateChnaged = new Subject<boolean>();

    constructor(private snackbar : MatSnackBar){}

    showSnackbar(message,action,duration){
        this.snackbar.open(message, action,{
            duration : duration
        })
    }
}