import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap, switchAll, switchMap, take } from 'rxjs/operators';
import { from, forkJoin, pipe } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ManegeTimeTableService {

  private user_id;

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.authService.userId.pipe(take(1)).subscribe((userId: string) => {
      this.user_id = userId;
    })
  }

  public timetable: any;

  getTimeTable(club_id: string) {

    return from(this.firestore.collection("events/" + club_id + "/events").snapshotChanges())
      .pipe(map(doc => {

        let timetable = doc.map(function (item: any) {

          let type = item.payload.doc.data().title;
          let title = item.payload.doc.data().title

          switch (type) {
            case "USUAL": {
              title = "Верховая тернировка"
              break;
            }
            case "JUMP": {
              title = "Конкурная тренировка"
              break;
            }
            case "SPRINT": {
              title = "Шпринт"
              break;
            }
            case "CORD": {
              title = "Тренировка на корде"
              break;
            }
            case "FREE": {
              title = "Тренировка на свободе"
              break;
            }
            case "OUTSIDE": {
              title = "Прогулка"
              break;
            }
            case "LESSON": {
              title = "Смена х " + item.payload.doc.data().amount
              break;
            }
          }

          return {
            "id": item.payload.doc.id,
            "title": title,
            "start": item.payload.doc.data().start,
            "end": item.payload.doc.data().end,
            "color": item.payload.doc.data().color,
            "textColor": item.payload.doc.data().textColor
          }
        })
        return timetable
      }));
  }

  getEventsByUser(club_id: string){
    
    return from(this.firestore.collection("events/" + club_id + "/events", ref => ref.where('user_id', '==', parseInt(this.user_id))).snapshotChanges())
      .pipe(map(doc => {

        let timetable = doc.map(function (item: any) {

          let type = item.payload.doc.data().title;
          let title = item.payload.doc.data().title

          switch (type) {
            case "USUAL": {
              title = "Верховая тернировка"
              break;
            }
            case "JUMP": {
              title = "Конкурная тренировка"
              break;
            }
            case "SPRINT": {
              title = "Шпринт"
              break;
            }
            case "CORD": {
              title = "Тренировка на корде"
              break;
            }
            case "FREE": {
              title = "Тренировка на свободе"
              break;
            }
            case "OUTSIDE": {
              title = "Прогулка"
              break;
            }
            case "LESSON": {
              title = "Смена х " + item.payload.doc.data().amount
              break;
            }
          }

          return {
            "id": item.payload.doc.id,
            "title": title,
            "start_hour": new Date(item.payload.doc.data().start).getHours(),
            "start_min": new Date(item.payload.doc.data().start).getMinutes(),
            "end_hour": new Date(item.payload.doc.data().end).getHours(),
            "end_min": new Date(item.payload.doc.data().end).getMinutes(),
            "date": new Date(item.payload.doc.data().end).getDate(),
            "month": new Date(item.payload.doc.data().end).getMonth(),
            "color": item.payload.doc.data().color,
            "textColor": item.payload.doc.data().textColor
          }
        })
        return timetable
      }));
  }

  postEvent(event: any){
    console.log(event)
    event.user_id = this.user_id;
    let request = "events/" + "3" + "/events";
    this.firestore.collection(request).add(event);
  }

  delete(id: string){
    console.log(id);
    let request = "events/" + "3" + "/events";
    this.firestore.collection(request).doc(id).delete()
  }
}
