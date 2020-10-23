import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomVet, ICustomVet } from 'src/app/shared/models/custom-vet.model';
import { Horse, IHorse } from 'src/app/shared/models/horse.model';
import { CustomVetService } from '../custom-vet.service';
import * as moment from 'moment/moment';
import { HorseService } from 'src/app/shared/services/horse.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(private router: Router,
    private customVetService: CustomVetService,
    private horseService: HorseService
  ) { }

  horses: Horse[];

  ngOnInit() {
    this.horseService.getHorses().subscribe(data => {
      this.horses = data.body || [];
      console.log(this.horses);
    })
  }

  create(form: NgForm) {
    const vet = this.createFromForm(form);
    this.subscribeToSaveResponse(this.customVetService.create(vet));
  }


  private createFromForm(form: NgForm): ICustomVet {
    return {
      ...new CustomVet(),
      id: undefined,
      date: new Date(form.value.birth),
      title: form.value.title,
      price: parseInt(form.value.price),
      doctor: form.value.doctor,
      horseId: parseInt(form.value.horse),
      status: 'NOTPAID',
      horseName: undefined
    };
  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomVet>>): void {
    result.subscribe(
      (resp) => {
        console.log("OK")
        this.router.navigateByUrl("/home");

      },
      (err) => {
        console.log(err)
        this.router.navigateByUrl("/home");
      }
    );
  }
}
