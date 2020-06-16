import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap, switchAll, switchMap } from 'rxjs/operators';
import { from, forkJoin, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManegeTimeTableService {

  constructor(private firestore: AngularFirestore) { }

  public timetable: any;

  getTimeTable(club_id: string) {

    return this.firestore.collection("events").snapshotChanges().subscribe((doc: any) => {
      console.log("Load Time Table")
      this.timetable = doc.map(function (item) {
        return {
          "start": item.payload.doc.id,
          "title": ""
        }
      })

      this.timetable.forEach(element => {
        this.getAmount(element.start).subscribe(data => {
          data.forEach((el: any) => {
            element.title = element.title + "Корда Х " + el.payload.doc.data().amount + ". " + el.payload.doc.data().place + "\n";
          });
        })
      });

      this.timetable.forEach(element => {

        this.getRidingAmount(element.start).subscribe(data => {
          data.forEach((el: any) => {
            element.title = element.title + "Тренировка Х " + el.payload.doc.data().amount + ". " + el.payload.doc.data().place + "\n";
          });
        })
      });
    });;
  }

  getAmount(time_id: string) {
    let ref = "events/" + time_id + "/lunge"
    console.log(ref)
    return this.firestore.collection(ref).snapshotChanges();
  }

  getRidingAmount(time_id: string) {
    let ref = "events/" + time_id + "/riding"
    console.log(ref)
    return this.firestore.collection(ref).snapshotChanges();
  }
}
