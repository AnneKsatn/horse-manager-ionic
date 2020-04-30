import { Component, OnInit } from '@angular/core';
import { VetService } from 'src/app/shared/services/vet.service';


export interface Vet{
  date: number,
  title: string,
  price: string,
  vet: string,
  vet_id: string
  club_id: string
  horse_id: string
}

@Component({
  selector: 'app-veterenary',
  templateUrl: './veterenary.page.html',
  styleUrls: ['./veterenary.page.scss'],
})
export class VeterenaryPage implements OnInit {

  constructor(private vetService: VetService) { }

  vets: Vet[];

  ngOnInit() {
    this.vetService.getVetProcedures().subscribe(
      (data: any) => {
        let p = data.map(function (item) {
          return {
            vet_id: item.payload.doc.data().vet_id,
            horse_id: item.payload.doc.data().horse_id
          };
        });


        p.forEach(item => {
          this.vetService.getVetProcedureInfo(item.vet_id).subscribe(doc => {
            item.date = Number(doc.data().date);
            item.title = doc.data().title;
            item.price = doc.data().price;
            item.club_id = doc.data().club_id;
            item.vet = doc.data().vet;
          });
        })

        this.vets = p;
      });
   }


}
