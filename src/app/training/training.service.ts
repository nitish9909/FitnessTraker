import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';


@Injectable()
export class TrainingService {

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();


    private availableExercises : Exercise[] = [];
    private runningExercise:Exercise; // this should store the execrise user selected
    //private finishedExercises : Exercise[]= [];
    private fbSubs : Subscription[]=[];
    

    constructor(
        private db : AngularFirestore,
        private uiService : UIService
        ){}

    fetchAvailableExercises(){
        this.uiService.loadingStateChnaged.next(true);
         this.fbSubs.push(this.db
        .collection('availableExercises')
        //.valueChanges();
        .snapshotChanges()
        .pipe(
         map(docArray => {
          return docArray.map(doc => {
            return {
              id : doc.payload.doc.id,
              ...doc.payload.doc.data()
              //name : doc.payload.doc.data().name,
              //duration : doc.payload.doc.data().duration,
              //calories : doc.payload.doc.data().calories
            }
          });
         }))
         .subscribe(
             (exercises : Exercise[]) =>{
            this.uiService.loadingStateChnaged.next(false);
             //console.log(exercises);
             this.availableExercises = exercises;
             this.exercisesChanged.next([...this.availableExercises]);
         },
         error => {
             this.uiService.loadingStateChnaged.next(false);
             this.uiService.showSnackbar('Fetching Exercises Failed Please try again later',null,3000);
             this.exercisesChanged.next(null);
         }))
        ;

    }
    
    //this will be called from new-training-component whereever user click start button
    startExercise(selectedId : string){ 
        //this.db.doc('availableExercises/' + selectedId).update({lastSelected : new Date()});
        this.runningExercise = this.availableExercises.find(
                ex =>  ex.id === selectedId );
                // should return true as we find the object we were looking for so we get the object
            
    
        
        this.exerciseChanged.next({...this.runningExercise}); // we can exmit this ausing next now we have to subscribe to it in the training component
    }

    completeExercise(){
        this.addDataToDatabase({...this.runningExercise,date : new Date, state: 'completed'} );// this will push running exercisr to exercies array and help us store the info
        this.runningExercise= null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress : number){
        this.addDataToDatabase({
            ...this.runningExercise,
            duration:this.runningExercise.duration * (progress / 100),
            calories:this.runningExercise.calories * (progress / 100),
            date : new Date, 
            state: 'cancelled'} );// this will push running exercisr to exercies array and help us store the info
        this.runningExercise= null;
        this.exerciseChanged.next(null);
    }

    gerRunningExercise(){
        return {...this.runningExercise}; // we use spread soerator to make sure we dont mutate the running exercise form outside
    }

    fetchCompletedOrCanceledExercise(){
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises : Exercise[]) => {
            //this.finishedExercises = exercises;
            this.finishedExercisesChanged.next(exercises);
        }));
    }

    cancelSubscription(){
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise : Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
}


// we still want to inform training component about the selected exercise , so we have to be inform =ed wheather the user picked the new training or not

// start button connected to start exercise method

