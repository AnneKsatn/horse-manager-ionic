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

    createRequestInClub(horse_id: string, club_id: string) {
        this.firestore.collection('joining_application').add({
            horse_id: horse_id,
            club_id: club_id,
            status: "active"
        });
    }

    getRequestID(horse_id: string){
       return this.firestore.collection('joining_application', ref => ref.where('horse_id', '==', horse_id)).snapshotChanges();
    }

    deleteRequestInClub(horse: any, request_id: string) {

        console.log(request_id);
        this.firestore.collection('joining_application').doc(request_id).delete();

        this.updateHorse({
            "isResident": "false",
            "name": horse.name,
        }, horse.id);

        this.firestore.collection("/residents/1/horses").snapshotChanges().subscribe((data: any) => {
            console.log(data[0].payload.doc.data().w);
        })
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