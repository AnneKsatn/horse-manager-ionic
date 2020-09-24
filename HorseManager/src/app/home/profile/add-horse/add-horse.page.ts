import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';

import { HorseService } from 'src/app/shared/services/horse.service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IHorse, Horse } from '../../../shared/models/horse.model';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-add-horse',
  templateUrl: './add-horse.page.html',
  styleUrls: ['./add-horse.page.scss'],
})
export class AddHorsePage implements OnInit {

  constructor(private horseService: HorseService, private router: Router) { }

  DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

  ngOnInit() {
  }

  addHorse(form: NgForm){

    const name = form.value.name;
    const birth = form.value.birth;
    const timest = new Date(birth);

    const horse = this.createFromForm(form);
    
    console.log(horse)
    this.subscribeToSaveResponse(this.horseService.create(horse));
    form.reset();

  }


  private createFromForm(form: NgForm): IHorse {
    return {
      ...new Horse(),
      id: undefined,
      name: form.value.name,
      birth: form.value.birth!.value ? moment(form.value.birth!.value, this.DATE_TIME_FORMAT) : undefined,
      gender: form.value.sex,
      color: undefined,
      ownerId: 1
    };
  }

  
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorse>>): void {
    result.subscribe( 
      (resp) => {
      console.log("OK")
      this.router.navigateByUrl("/home");

    },
       (err) =>{
        console.log(err)
        this.router.navigateByUrl("/home");
       }
    );
  }

}
