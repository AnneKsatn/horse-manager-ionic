import { Component, OnInit } from '@angular/core';
import { VetService } from 'src/app/shared/services/vet.service';
import { HorseService } from '../../shared/services/horse.service';
import { IVetProcedure, VetProcedure } from 'src/app/shared/models/vet-procedure.model';


@Component({
  selector: 'app-veterenary',
  templateUrl: './veterenary.page.html',
  styleUrls: ['./veterenary.page.scss'],
})
export class VeterenaryPage implements OnInit {

  constructor(private vetService: VetService, private horseService: HorseService) { }

  // vets: VetProcedure[];

  vets: IVetProcedure[];

  ngOnInit() {

    this.vetService.getVetProceduresByUserId().subscribe(data => {
      this.vets = data.body || [];

      this.vets.forEach(el => {
        el.type  = "club";
      })

      this.vets.sort((prev, next) => prev.date.getTime() - next.date.getTime());
    })
  }
}
