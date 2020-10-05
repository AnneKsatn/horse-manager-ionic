import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { HorseService } from './horse.service'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IVetProcedure } from '../models/vet-procedure.model'
import * as moment from 'moment/moment';

type EntityArrayResponseType = HttpResponse<IVetProcedure[]>;
type EntityResponseType = HttpResponse<IVetProcedure>;


@Injectable({
  providedIn: 'root'
})
export class VetService {

  public resourseUrl = SERVER_API_URL + 'api/stable-vet-infos-for-user';

  constructor(
    private firestore: AngularFirestore,
    private horseService: HorseService, 
    private httpClient: HttpClient) { }

  getVetProcedures() {

    return this.horseService.getHorses().pipe(switchMap(
      (data: any) => {

        let horses = [];
        let horse_names = [];

        horses = data.map(function (item) {
          horse_names.push(item.payload.doc.id)
          return {
            "name": item.payload.doc.data().name,
            "id": item.payload.doc.id,
          };
        });

        return this.firestore.collection('vets', ref => ref.where('horse_id', 'in', horse_names)).snapshotChanges()
      }
    ))
  }


  getProcedures(): Observable<any> {
    let horse_id = ["1855", "aUWkQP7Dwk2P6ttlTfFG"];
    return this.httpClient.get(`https://us-central1-manager-fc68e.cloudfunctions.net/app/vets?horse_id=${horse_id}`)
  }

  getVetProceduresByUserId() {
    return this.httpClient.get<IVetProcedure[]>(this.resourseUrl, {observe: 'response'})
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }


  getVetProcedureInfo(id: string) {
    return this.firestore.collection('vet_procedure_info').doc(id).get();
  }

  protected convertDateFromClient(stableVetInfo: IVetProcedure): IVetProcedure {
    const copy: IVetProcedure = Object.assign({}, stableVetInfo, {
      date: stableVetInfo.date ? stableVetInfo.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date).toDate() : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((stableVetInfo: IVetProcedure) => {
        stableVetInfo.date = stableVetInfo.date ? moment(stableVetInfo.date).toDate() : undefined;
      });
    }
    return res;
  }
}
