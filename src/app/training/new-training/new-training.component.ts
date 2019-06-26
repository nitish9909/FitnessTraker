import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy {
  
  exercises : Exercise[];
  exerciseSubscription : Subscription;
  isLoading = true;
  private loadingSubscription : Subscription;

  constructor(
    private trainingService : TrainingService,
    private uiService : UIService
    ) { }

  ngOnInit() {
    //this.exercises = this.trainingService.getAvailableExercises();
      //this.exercises = 
      this.loadingSubscription = this.uiService.loadingStateChnaged.subscribe(isLoading =>{
        this.isLoading = isLoading;
      });
      this.exerciseSubscription=this.trainingService.exercisesChanged.subscribe(
        exercises => {
         this.exercises = exercises;
        }       
      );
      this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();   
  }
  onStartTraining( form : NgForm){
    this.trainingService.startExercise(form.value.exercise); // we have to pass the id of exercise chosen, we get this id from a form we will created in the view which on submitting will give the id
  }

  ngOnDestroy(){
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
    
  }
}
