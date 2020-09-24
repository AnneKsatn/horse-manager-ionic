import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HorseService } from '../../../shared/services/horse.service';
import { IHorse, IHorseProfile } from '../../../shared/models/horse.model';

@Component({
  selector: 'app-horse-profile',
  templateUrl: './horse-profile.page.html',
  styleUrls: ['./horse-profile.page.scss'],
})
export class HorseProfilePage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private horseService: HorseService) { }

  horse: IHorseProfile | null = null;
  is_res: Boolean;

  ngOnInit() {
    let horse_id = this.activatedRoute.snapshot.queryParams['horse_id']

    this.horseService.find(horse_id).subscribe(response => {
      this.horse = response.body;
      console.log(this.horse)
    })

    this.horseService.is_resident(horse_id).subscribe(data => {
      console.log(data.body);
      this.is_res = data.body;
    })
  }
}
