import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy{
  maxDate;
  isLoading = false;
  private loadingSubs : Subscription;

  // we need to inject authservice into sign up component to access it
  // when we provide our service in the app.module.ts we ensure we are laways using the same instace of service every where
  constructor(
    private authService : AuthService,
    private uiService : UIService
    ) { }  

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChnaged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }
  onSubmit(form : NgForm){
    this.authService.registerUser({
      email : form.value.email,
      password : form.value.password
    });
  }

  ngOnDestroy(){

    if (this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
    
  }
}
