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
    this.vetService.getProcedures().subscribe((data: any) => {
      console.log(Object.keys(data))

      var result = Object.keys(data).map(function (key) {
        return data[key];
      });

      this.vets = result

      this.vets.forEach( item => {
        this.horseService.getHorseName(item.horse_id).subscribe( data => {
          item.horse_name = data.data().name
        })
      })
    })
  }
}
