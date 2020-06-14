import { Component, OnInit } from '@angular/core';
import { VetService } from 'src/app/shared/services/vet.service';
import { HorseService } from '../../shared/services/horse.service';
import { VetProcedure } from 'src/app/shared/models/vet-procedure.model';


@Component({
  selector: 'app-veterenary',
  templateUrl: './veterenary.page.html',
  styleUrls: ['./veterenary.page.scss'],
})
export class VeterenaryPage implements OnInit {

  constructor(private vetService: VetService, private horseService: HorseService) { }

  vets: VetProcedure[];

  ngOnInit() {
    this.horseService.getHorseIds().subscribe( data => {
      this.vetService.get(data).subscribe( data_vet => {
        this.vets = data_vet;
      })
    })
  }
}
