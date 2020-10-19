import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { VetService } from '../shared/services/vet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private authSub: Subscription;
  private previousAuthState  = false;
  private vet_proc;
  vets = [];

  constructor(private router: Router, private authService: AuthService, private vetService: VetService) {}

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
    this.router.navigateByUrl("/home/profile");
  }

  goToVeterenary(){
    this.router.navigateByUrl("/home/vet");
  }

  goToCusomVeterenary(){
    this.router.navigateByUrl("/home/custom-vet");
  }
  
  goToManege(){
    this.router.navigateByUrl("/home/manege");
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
