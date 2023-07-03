import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Paroquia } from '../models/paroquia';

const URL_PAROQUIA = '/api/v1/paroquia-capela';

@Injectable({
  providedIn: 'root'
})
export class ParoquiaService {
  
  constructor(private http: HttpClient){

  }

  loadParoquias(ativo: boolean): Observable<Paroquia[]> {
    return this.http.get(`${environment.URL_API}${URL_PAROQUIA}`)
    .pipe(map((resp: Paroquia[]) => {
      return resp;
    }));
  }

  getById(id: string): Observable<Paroquia> {
    return this.http.get(`${environment.URL_API}${URL_PAROQUIA}?id=${id}`)
    .pipe(map((resp: Paroquia) => {
      return resp;
    }));
  }


  save(paroquia: Paroquia): Observable<Paroquia>{
    return this.http.post(`${environment.URL_API}${URL_PAROQUIA}`,paroquia)
    .pipe(map((resp: Paroquia) => {
      return resp;
    }));
  }

  update(paroquia: Paroquia): Observable<Paroquia>{
    return this.http.put(`${environment.URL_API}${URL_PAROQUIA}/${paroquia.id}`,paroquia)
    .pipe(map((resp: Paroquia) => {
      return resp;
    }));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${environment.URL_API}${URL_PAROQUIA}/${id}`)
    .pipe(map(() => undefined));
  }

}
