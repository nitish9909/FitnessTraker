import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit, OnDestroy {

  displayedColumns = ['date','name','calories','duration','state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription : Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  // MatTableDataSource always expects array to be passed
  // we have to popuate the dataSource for rendering it to display

  constructor(private trainingService : TrainingService ) { }

  ngOnInit() {
    this.exChangedSubscription= this.trainingService.finishedExercisesChanged.subscribe(
      (exercises :Exercise[]) => {
      this.dataSource.data = exercises;
    })
    this.trainingService.fetchCompletedOrCanceledExercise();
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator= this.paginator;
  }

  doFilter(filterValue : string){
    this.dataSource.filter= filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if(this.exChangedSubscription){
      this.exChangedSubscription.unsubscribe();
    }
    
  }
}
