import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit , OnDestroy{
  
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth=false;
  authSubscription : Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.authChange.subscribe(authStatus=>{
      this.isAuth= authStatus;
    });
  }

  onClose(){
    this.sidenavClose.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
