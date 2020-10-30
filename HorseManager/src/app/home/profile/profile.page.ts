import { Component, OnInit, ɵConsole } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HorseService } from '../../shared/services/horse.service';
import { Router } from '@angular/router';
import { IHorse } from '../../shared/models/horse.model';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private horseSevice: HorseService, private router: Router) { }

  horses: IHorse[];

  ngOnInit() {

    this.horseSevice.getHorses().subscribe((response: HttpResponse<IHorse[]>) => {
      this.horses = response.body || [] 
    });


    // this.horseSevice.getHorses().subscribe(
    //   (data: any) => {
    //     this.horses = data.map(function(item){

    // // this.authenticate(email, password);

    
    // // let Jan02_1970 = new Date(item.payload.doc.data().bith_date.toDate());
    // // console.log(Jan02_1970)

    // // console.log(Jan02_1970.getTime()/1000)

    // // console.log(item.payload.doc.data().bith_date)


    //      return {
    //        "isResident": item.payload.doc.data().isResident,
    //        "name": item.payload.doc.data().name,
    //        "id": item.payload.doc.id,
    //        "club_id": item.payload.doc.data().club_id,
    //        "birth_year": item.payload.doc.data().bith_date.toDate().getFullYear()
    //      };
    //     });
    //   }
    // );
   }

   addHorse(){
      this.router.navigateByUrl("/home/profile/add-horse");
   }

   create() {
     
   }
}