import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Decanato } from '../models/decanato';

const URL_DECANATO = '/api/v1/decanato-setor';

@Injectable({
  providedIn: 'root'
})
export class DecanatoService {
  
  constructor(private http: HttpClient){

  }

  loadDecanatos(ativo: boolean): Observable<Decanato[]> {
    return this.http.get(`${environment.URL_API}${URL_DECANATO}`)
    .pipe(map((resp: Decanato[]) => {
      return resp;
    }));
  }

  getById(id: string): Observable<Decanato> {
    return this.http.get(`${environment.URL_API}${URL_DECANATO}?id=${id}`)
    .pipe(map((resp: Decanato) => {
      return resp;
    }));
  }


  save(decanato: Decanato): Observable<Decanato>{
    return this.http.post(`${environment.URL_API}${URL_DECANATO}`,decanato)
    .pipe(map((resp: Decanato) => {
      return resp;
    }));
  }

  update(decanato: Decanato): Observable<Decanato>{
    return this.http.put(`${environment.URL_API}${URL_DECANATO}/${decanato.id}`,decanato)
    .pipe(map((resp: Decanato) => {
      return resp;
    }));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${environment.URL_API}${URL_DECANATO}/${id}`)
    .pipe(map(() => undefined));
  }

}
