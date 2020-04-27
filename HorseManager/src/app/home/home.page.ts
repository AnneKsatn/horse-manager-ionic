import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private authSub: Subscription;
  private previousAuthState  = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.userIsIsAuthenticated
    .subscribe(isAuth => {
      if(!isAuth && this.previousAuthState != isAuth){
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    })
  }

  goToProfile(){
    console.log("adw");
    this.router.navigateByUrl("/home/profile");
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    if(this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
