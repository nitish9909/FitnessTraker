import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // To emit a custom event in the header component which i can listen in app component anf this can be use to call togle on the side nav reference
  // @Output is use to make them listenible from outside

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth=false;
  authSubscription : Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authSubscription=this.authService.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus;
    });
  }
  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe()
  }

}
