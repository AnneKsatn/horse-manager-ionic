import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class HorseService {

    public HorseClubsId: Map<string, string>;

    constructor(private firestore: AngularFirestore) { 
        this.HorseClubsId = new Map();
    }

    updateHorse(horse: any, id: string) {
        this.firestore.collection("horses").doc(id).set(horse);
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
        }, horse.id);
    }

    checkResident(horse_id: string) {
       return this.firestore.collection('residents', ref => ref.where('id_horse', '==', horse_id)).snapshotChanges();
    }

    getHorseClubTitle(id_club: string, id_horse: string){
        this.HorseClubsId.set(id_horse, id_club);
        console.log(this.HorseClubsId);
        return this.firestore.collection('horse_clubs').doc(id_club).get();
    }
}