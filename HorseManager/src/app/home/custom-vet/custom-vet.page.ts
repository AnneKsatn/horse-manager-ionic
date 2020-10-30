import { Component, OnInit, DoCheck} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomVet } from 'src/app/shared/models/custom-vet.model';
import { IVetProcedure } from 'src/app/shared/models/vet-procedure.model';
import { HorseService } from 'src/app/shared/services/horse.service';
import { VetService } from 'src/app/shared/services/vet.service';
import { CustomVetService } from './custom-vet.service';

@Component({
  selector: 'app-custom-vet',
  templateUrl: './custom-vet.page.html',
  styleUrls: ['./custom-vet.page.scss'],
})
export class CustomVetPage implements OnInit {


  constructor(private vetService: VetService, 
    private horseService: HorseService, 
    private router: Router,
    private customVetService: CustomVetService
    ) { }

  // vets: VetProcedure[];

  vets: ICustomVet[];

  // ngDoCheck() {

  //   this.customVetService.get().subscribe(data => {
  //     this.vets = data || [];
  //     console.log(this.vets);
  //   })
  // }

  ngOnInit() {

    this.customVetService.get().subscribe(data => {
      this.vets = data || [];
      console.log(this.vets);
    })
  }

  create() {
    this.router.navigateByUrl("/home/create-vet");
  }
}
