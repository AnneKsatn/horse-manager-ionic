import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  goToProfile(){
    console.log("adw");
    this.router.navigateByUrl("/home/profile");
  }

}
