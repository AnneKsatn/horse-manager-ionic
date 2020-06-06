import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { take, map } from 'rxjs/operators';
import { IHorse } from '../models/horse.model';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import * as moment from 'moment/moment';

type EntityResponseType = HttpResponse<IHorse>;
type EntityArrayResponseType = HttpResponse<IHorse[]>;

@Injectable({ providedIn: 'root' })
export class HorseService {


    public resourceUrl = 'http://192.168.43.9:8080/' + 'api/horses';


    user_id: string;

    constructor(private firestore: AngularFirestore, private authService: AuthService, private http: HttpClient) { 
        this.authService.userId.pipe(take(1)).subscribe( (userId: string) =>{
            this.user_id = userId;
          })
    }

    getHorseName(horse_id: string){
        return this.firestore.collection('horses').doc(horse_id).get()
    }

    getHorses(){
        return this.firestore.collection('horses', ref => ref.where('user_id', '==', this.user_id)).snapshotChanges()
    }
    
    updateHorse(horse: any, id: string) {
        this.firestore.collection("horses").doc(id).update(horse);
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

    getHorseClubTitle(id_club: string){
        return this.firestore.collection('horse_clubs').doc(id_club).get();
    }

    addHorse(date: Date, name: string, sex: string){
        this.firestore.collection("horses").add({
            bith_date: date,
            name: name,
            user_id: this.user_id,
            isResident: "false",
            sex: sex
        })
    }

    getHorseInfo(horse_id: string){
        return this.firestore.collection('horses').doc(horse_id).get();
    }

    delteHorse(horse_id: string, club_id: string){
        this.firestore.collection("horses").doc(horse_id).delete();

        let req_adress = 'residents/' + club_id + '/horses'
        this.firestore.collection(req_adress).doc(horse_id).delete();
    }

    leaveHorseClub(horse_id: string, club_id: string){
        this.firestore.collection('horses').doc(horse_id).update({
            isResident: "false",
            club_id: ""
        })

        let req_adress = 'residents/' + club_id + '/horses'
        this.firestore.collection(req_adress).doc(horse_id).delete();
    }

    getAll(req?: any): Observable<EntityArrayResponseType> {
        let user_id = 1;
        // const options = createRequestOption(req);
        return this.http
          .get<IHorse[]>(`http://192.168.43.9:8080/api/user-horses?owner=${user_id}`, { observe: 'response' })
          .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
      }

    create(horse: IHorse){

        console.log("create")
        const copy = this.convertDateFromClient(horse);
        return this.http
          .post<IHorse>(this.resourceUrl, horse, { observe: 'response' })
    }

    protected convertDateFromClient(horse: IHorse): IHorse {
        const copy: IHorse = Object.assign({}, horse, {
          birth: horse.birth && horse.birth.isValid() ? horse.birth.toJSON() : undefined,
        });
        return copy;
      }
    
      protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
          res.body.birth = res.body.birth ? moment(res.body.birth) : undefined;
        }
        return res;
      }
    
      protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
          res.body.forEach((horse: IHorse) => {
            horse.birth = horse.birth ? moment(horse.birth) : undefined;
          });
        }
        return res;
      }
}
