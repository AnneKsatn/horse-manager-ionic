import { Component, OnInit, ɵConsole } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HorseService } from '../../shared/services/horse.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private horseSevice: HorseService) { }

  horses = [];

  ngOnInit() {

    this.horseSevice.getHorses().subscribe(
      (data: any) => {
        this.horses = data.map(function(item){
         return {
           "isResident": item.payload.doc.data().isResident,
           "name": item.payload.doc.data().name,
           "id": item.payload.doc.id,
           "club_id": item.payload.doc.data().club_id
         };
        });
      }
    );
   }
}