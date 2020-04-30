import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VetService {

  constructor(private firestore: AngularFirestore) { }


  getVetProcedures() {
    const horseID = ["aUWkQP7Dwk2P6ttlTfFG"];
    return this.firestore.collection('vets', ref => ref.where('horse_id', 'in', horseID)).snapshotChanges();
  }

  getVetProcedureInfo(id: string){
    return this.firestore.collection('vet_procedure_info').doc(id).get();
  }
}
