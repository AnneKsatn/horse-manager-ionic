import { Component, OnInit } from '@angular/core';

import { HorseService } from 'src/app/shared/services/horse.service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-horse',
  templateUrl: './add-horse.page.html',
  styleUrls: ['./add-horse.page.scss'],
})
export class AddHorsePage implements OnInit {

  constructor(private horseService: HorseService, private router: Router) { }

  ngOnInit() {
  }

  addHorse(form: NgForm){

    const name = form.value.name;
    const birth = form.value.birth;
    const timest = new Date(birth);

    this.horseService.addHorse(timest, name, form.value.sex)
    form.reset();

    this.router.navigateByUrl("/home/profile");
  }

}
