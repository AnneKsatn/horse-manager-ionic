import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class HorseService {
    constructor(private firestore: AngularFirestore) { }
    updateHorse(horse: any) {
        this.firestore.collection("horses").doc(horse.id).set(horse);
    }

    createApp(id: string) {
        this.firestore.collection('joining_application').add({
            horse_id: 1,
            club_id: id
        });
    }

    deleteApp(horse: any) {

        this.firestore.collection('joining_application', ref => ref.where('horse_id', '==', 1)).snapshotChanges().subscribe(data => {
            if(data.length != 0) {
                this.firestore.collection('joining_application').doc(data[0]['payload'].doc.id).delete();
            }
        });
        this.updateHorse({
            "isResident": "false",
            "name": horse.name,
            "id": horse.id
        });
    }
}