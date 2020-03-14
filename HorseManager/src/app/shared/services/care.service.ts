import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HorseService } from './horse.service';


@Injectable({ providedIn: 'root' })
export class CareService {

    constructor(private firestore: AngularFirestore, private horseService: HorseService) { }

    public feedings = [];
    public f = []

    setFeedingsFromDB(id_horse: string) {
        this.firestore.collection('feed', ref => ref.where('horse_ID', '==', id_horse).orderBy('hour'))
        .snapshotChanges().subscribe((data: any) => {
            this.feedings = data.map(function(item){
                return {
                  "horse_id": item.payload.doc.data().horse_ID,
                  "feed_time_id": item.payload.doc.data().feed_time_ID,
                  "id": item.payload.doc.id,
                  "hour": item.payload.doc.data().hour,
                  "minute": item.payload.doc.data().minute,
                };
               });
        })
    }

    getFeedings(id_horse: string){

        if(this.feedings.length == 0){
            this.setFeedingsFromDB(id_horse);
        }
        return this.feedings;
    }

    getFeedingConsist(id_feeding: string){
        return this.firestore.collection('feed_consist', ref => ref.where('FeedID', '==', id_feeding)).snapshotChanges();
    }

    postFeedingConsist(id_feed: string, item: string, amount: string){
        this.firestore.collection('feed_consist').add({
            FeedID: id_feed,
            item: item,
            amount: amount
        });
    }

    deleteFeedingConsist(id: string){
        this.firestore.collection('feed_consist').doc(id).delete();
    }

    getWalking(horse_id: string){
        return this.firestore.collection('walking', ref => ref.where('horse_id', '==', horse_id)).snapshotChanges();
    }
}