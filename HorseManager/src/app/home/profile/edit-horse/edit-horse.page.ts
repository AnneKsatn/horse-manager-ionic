import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HorseService} from '../../../shared/services/horse.service'
import { IHorseProfile, IHorse, Horse } from '../../../shared/models/horse.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-edit-horse',
  templateUrl: './edit-horse.page.html',
  styleUrls: ['./edit-horse.page.scss'],
})
export class EditHorsePage implements OnInit {

  constructor(private route: ActivatedRoute, private horseService: HorseService, private router: Router) { }

  public horseId;
  public horse: IHorseProfile | null = null;
  public year: number;


  ngOnInit() {
    this.horseId =this.route.snapshot.queryParams['horse_id']
    console.log(this.horseId)

    this.horseService.find(this.horseId).subscribe(response => {
      this.horse = response.body;
      this.year = this.horse.birth ? this.horse.birth.year(): undefined;
    })

  }

  deleteHorse(){
    this.subscribeToSaveResponse(this.horseService.delete(this.horseId));
  }

  leaveHorseClub(){
    // this.horseService.leaveHorseClub(this.horse.id, this.horse.clubID)
    this.router.navigateByUrl("/home/profile")
  }

  
  save(form): void {

    const horse = this.createFromForm(form);
    if (horse.id !== undefined) {
      this.subscribeToSaveResponse(this.horseService.update(horse));
    }
  }

  private createFromForm(form): IHorse {
    const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
    return {
      ...new Horse(),
      id: this.horse.id,
      name: form.value.name,
      gender: form.value.gender,
      birth: form.value.birth ? moment(form.value.birth, DATE_TIME_FORMAT): undefined,
      color: this.horse.color,
      ownerId: this.horse.ownerId
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      (err) => this.onSaveError(err),
      () => {
        this.router.navigateByUrl("/home/profile")
      }
    );
  }

  protected onSaveSuccess(): void {
    console.log("OK")
  }

  protected onSaveError(err): void {
    console.log(err)
  }
}
