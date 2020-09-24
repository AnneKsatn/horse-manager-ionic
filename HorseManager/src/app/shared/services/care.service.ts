import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HorseService } from './horse.service';
import { SERVER_API_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class CareService {

    constructor(
        private firestore: AngularFirestore, 
        private horseService: HorseService,
        private http: HttpClient
        ) { }

    public resourceUrl =  SERVER_API_URL + 'api/is_residents';

    is_resident(horseId: number) {
        return this.http
        .get<Boolean>(this.resourceUrl + `?horseId=${horseId}`, { observe: 'response' });
    }


    postFeedingConsist(feeding_id: string, horse_id: string, item: string, amount: string, club_id: string) {

        let request = "residents/" + club_id + "/horses/" + horse_id + "/feeding/" + feeding_id + "/consist";

        this.firestore.collection(request).add({
            item: item,
            amount: amount
        });
    }

    deleteFeedingConsist(feeding_id: string, item_id: string, horse_id: string, club_id: string) {

        let request = "residents/" + club_id + "/horses/" + horse_id + "/feeding/" + feeding_id + "/consist";
        this.firestore.collection(request).doc(item_id).delete();
    }

    getWalking(horse_id: string) {
        return this.firestore.collection('walking', ref => ref.where('horse_id', '==', horse_id)).snapshotChanges();
    }

    getFeedings(club_id: string) {

        let request = "horse_clubs/" + club_id + "/feedings";

        return this.firestore.collection(request, ref => ref.orderBy('hour')).snapshotChanges();
    }

    getFeedingConsist(feeding_id: string, horse_id: string, club_id: string) {

        let request = "residents/" + club_id + "/horses/" + horse_id + "/feeding/" + feeding_id + "/consist";

        // let request = "feeding/" + feeding_id + "/horses/" + horse_id + "/consist";

        return this.firestore.collection(request).snapshotChanges();
    }
}