import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICustomVet } from 'src/app/shared/models/custom-vet.model';
import * as moment from 'moment/moment';
import { IVetProcedure } from 'src/app/shared/models/vet-procedure.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';



type EntityArrayResponseType = HttpResponse<ICustomVet[]>;
type EntityResponseType = HttpResponse<ICustomVet>;


@Injectable({
  providedIn: 'root'
})
export class CustomVetService {
  public resourceUrl = SERVER_API_URL + 'api/custom-vets';

  constructor(private httpClient: HttpClient) { }

  // getVetProcedures() {

  //   return this.horseService.getHorses().pipe(switchMap(
  //     (data: any) => {

  //       let horses = [];
  //       let horse_names = [];

  //       horses = data.map(function (item) {
  //         horse_names.push(item.payload.doc.id)
  //         return {
  //           "name": item.payload.doc.data().name,
  //           "id": item.payload.doc.id,
  //         };
  //       });

  //       return this.firestore.collection('vets', ref => ref.where('horse_id', 'in', horse_names)).snapshotChanges()
  //     }
  //   ))
  // }


  // getProcedures(): Observable<any> {
  //   let horse_id = ["1855", "aUWkQP7Dwk2P6ttlTfFG"];
  //   return this.httpClient.get(`https://us-central1-manager-fc68e.cloudfunctions.net/app/vets?horse_id=${horse_id}`)
  // }

  
  create(vet: ICustomVet) {

    console.log("create")
    const copy = this.convertDateFromClient(vet);
    return this.httpClient
        .post<ICustomVet>(this.resourceUrl, vet, { observe: 'response' })
}

get(): Observable<any> {
  console.log("get")

  return this.httpClient.get(this.resourceUrl)
}

getById(id: string): Observable<any> {
  console.log("get")

  return this.httpClient.get(this.resourceUrl + `/` + id);
}

update(vet: ICustomVet): Observable<EntityResponseType> {
  const copy = this.convertDateFromClient(vet);

  return this.httpClient
    .put<ICustomVet>(this.resourceUrl, copy, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
}

delete(id: string) {
  return this.httpClient.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
}


  // getVetProceduresByUserId() {
  //   return this.httpClient.get<ICustomVet[]>(this.resourseUrl, { observe: 'response' })
  //     .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }


  // getVetProcedureInfo(id: string) {
  //   return this.firestore.collection('vet_procedure_info').doc(id).get();
  // }

  protected convertDateFromClient(stableVetInfo: ICustomVet): ICustomVet {
    const copy: ICustomVet = Object.assign({}, stableVetInfo, {
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
      res.body.forEach((stableVetInfo: ICustomVet) => {
        stableVetInfo.date = stableVetInfo.date ? moment(stableVetInfo.date).toDate() : undefined;
      });
    }
    return res;
  }
}
