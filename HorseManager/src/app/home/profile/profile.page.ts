import { Component, OnInit, ɵConsole } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  horses = [];

  ngOnInit() {

    // this.firestore.collection('horses', ref => ref.where('id', '==', "1")).snapshotChanges().subscribe(

    this.firestore.collection('horses').snapshotChanges().subscribe(
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