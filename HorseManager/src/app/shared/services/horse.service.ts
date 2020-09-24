import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { take, map } from 'rxjs/operators';
import { IHorse, IHorseProfile } from '../models/horse.model';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import * as moment from 'moment/moment';
import { SERVER_API_URL } from '../../app.constants';

type EntityResponseType = HttpResponse<IHorse>;
type EntityArrayResponseType = HttpResponse<IHorse[]>;

@Injectable({ providedIn: 'root' })
export class HorseService {

    public resourceUrl =  SERVER_API_URL + 'api/horses';

    user_id: string;

    constructor(private firestore: AngularFirestore, private authService: AuthService, private http: HttpClient) {
        this.authService.userId.pipe(take(1)).subscribe((userId: string) => {
            this.user_id = userId;
        })
    }

    getHorseName(horse_id: string) {
        return this.firestore.collection('horses').doc(horse_id).get()
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

    getRequest(horse_id: string) {
        return this.firestore.collection('joining_application', ref => ref.where('horse_id', '==', horse_id)).snapshotChanges();
    }

    deleteRequest(horse: any, request_id: string) {
        this.firestore.collection('joining_application').doc(request_id).delete();
    }

    getHorseClubTitle(id_club: string) {
        return this.firestore.collection('horse_clubs').doc(id_club).get();
    }

    is_resident(horseId: number) {
        
        console.log(horseId);

        return this.http
        .get<Boolean>(SERVER_API_URL + 'api/is_residents' + `?horseId=${horseId}`, { observe: 'response' });
    }

    
    find(id: number): Observable<HttpResponse<IHorseProfile>> {
    return this.http
      .get<IHorseProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<IHorseProfile>) => this.convertDateFromServer(res)));
  }

    delteHorse(horse_id: string, club_id: string) {
        this.firestore.collection("horses").doc(horse_id).delete();

        let req_adress = 'residents/' + club_id + '/horses'
        this.firestore.collection(req_adress).doc(horse_id).delete();
    }

    leaveHorseClub(horse_id: string, club_id: string) {
        this.firestore.collection('horses').doc(horse_id).update({
            isResident: "false",
            club_id: ""
        })

        let req_adress = 'residents/' + club_id + '/horses'
        this.firestore.collection(req_adress).doc(horse_id).delete();
    }

    getHorses(req?: any): Observable<EntityArrayResponseType> {
        let user_id = 1;
        // const options = createRequestOption(req);
        return this.http
            .get<IHorse[]>(SERVER_API_URL + `api/user-horses?owner=${user_id}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    create(horse: IHorse) {

        console.log("create")
        const copy = this.convertDateFromClient(horse);
        return this.http
            .post<IHorse>(this.resourceUrl, horse, { observe: 'response' })
    }

    update(horse: IHorse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(horse);
        console.log(horse);
        return this.http
          .put<IHorse>(this.resourceUrl, copy, { observe: 'response' })
          .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
      }

      delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
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
