import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomVet } from 'src/app/shared/models/custom-vet.model';
import { IVetProcedure } from 'src/app/shared/models/vet-procedure.model';
import { HorseService } from 'src/app/shared/services/horse.service';
import { VetService } from 'src/app/shared/services/vet.service';

@Component({
  selector: 'app-custom-vet',
  templateUrl: './custom-vet.page.html',
  styleUrls: ['./custom-vet.page.scss'],
})
export class CustomVetPage implements OnInit {


  constructor(private vetService: VetService, private horseService: HorseService, private router: Router) { }

  // vets: VetProcedure[];

  vets: ICustomVet[];

  ngOnInit() {

    this.vetService.getVetProceduresByUserId().subscribe(data => {

      this.vets = [];
      // this.vets = data.body || [];

      // this.vets.forEach(el => {
      //   el.type  = "club";
      // })

      this.vets.sort((prev, next) => prev.date.getTime() - next.date.getTime());
    })
  }

  create() {
    this.router.navigateByUrl("/home/custom-vet/create");
  }
}
