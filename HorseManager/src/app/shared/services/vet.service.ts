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

  getVetProcedures() {

    return this.horseService.getHorses().pipe(switchMap(
      (data: any) => {

        let horses = [];
        let horse_names = [];

        horses = data.map(function (item) {
          horse_names.push(item.payload.doc.id)
          return {
            "name": item.payload.doc.data().name,
            "id": item.payload.doc.id,
          };
        });

        return this.firestore.collection('vets', ref => ref.where('horse_id', 'in', horse_names)).snapshotChanges()
      }
    ))
  }


  getProcedures(): Observable<any> {
    let horse_id = ["aUWkQP7Dwk2P6ttlTfFG", "aUWkQP7Dwk2P6ttlTfFG"];
    return this.httpClient.get(`https://us-central1-manager-fc68e.cloudfunctions.net/app/vets?horse_id=${horse_id}`)
  }


  

  getVetProcedureInfo(id: string) {
    return this.firestore.collection('vet_procedure_info').doc(id).get();
  }
}
