import { TrainingRoutingModule } from './training-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';

import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
    declarations:[
        TrainingComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    imports:[ 
        
        ReactiveFormsModule,
        SharedModule,
        TrainingRoutingModule
    ],
    exports:[],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule{

}