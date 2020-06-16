import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { HorseService } from './horse.service'
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VetService {

  constructor(private firestore: AngularFirestore, private horseService: HorseService, private httpClient: HttpClient) { }


  get(horse_names) {

    return from(this.firestore.collection('vets', ref => ref.where('horse_id', 'in', horse_names)).snapshotChanges())
      .pipe(map((procedures: any) => {

        let result = procedures.map(function (doc) {
          return {
            "id": doc.payload.doc.id,
            "status": doc.payload.doc.data().status,
            "horse_id": doc.payload.doc.data().horse_id,
            "vet": doc.payload.doc.data().vet_id,
          }
        })

         result = result.filter(function(item) {
          return item.status != "missed";
        });

        return result;
      }),
        map(procedures => {

          procedures.map((procedure: any) => {
            this.firestore.collection('vet_procedure_info').doc(procedure.vet).get().subscribe(doc => {
              procedure.title = doc.data().title
              procedure.price = doc.data().price
              procedure.club_id = doc.data().club_id
              procedure.date = doc.data().date.toDate()
            })
          })

          procedures.map((procedure: any) => {
            this.firestore.collection('horses').doc(procedure.horse_id).get().subscribe(doc => {
              procedure.horse_name = doc.data().name
            })
          })

          return procedures
        })
      );
  }
}
