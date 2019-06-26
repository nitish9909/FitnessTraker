import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title> Are you sure?</h1>
               <mat-dialog-content>
                    <p>You already got {{ passedData.progress }}%</p>
               </mat-dialog-content>
               <mat-dialog-actions>
                <button mat-button [mat-dialog-close]="true">Yes</button>
                <button mat-button [mat-dialog-close]="false">No</button>
               <mat-dialog-actions>`
})
export class StopTrainingComponent {
    //in your reference of data please give the data that you have somehow stored the data of currently open dialog , please store it in passed data property
    constructor(@Inject(MAT_DIALOG_DATA) public passedData : any) {
        
    }
}