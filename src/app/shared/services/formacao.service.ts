import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Formacao } from '../models/formacao';

const URL_FORMACAO = '/api/v1/formacao';

@Injectable({
  providedIn: 'root'
})
export class FormacaoService {
  
  constructor(private http: HttpClient){
  }

  loadFormacoes(ativo: boolean): Observable<Formacao[]> {
    return this.http.get(`${environment.URL_API}${URL_FORMACAO}?active=${ativo}`)
    .pipe(map((resp: Formacao[]) => {
      return resp;
    }));
  }

  getAllFormacoes(): Observable<Formacao[]> {
    return this.http.get(`${environment.URL_API}${URL_FORMACAO}/get-all`)
    .pipe(map((resp: Formacao[]) => {
      return resp;
    }));
  }

  getById(id: string): Observable<Formacao> {
    return this.http.get(`${environment.URL_API}${URL_FORMACAO}?id=${id}`)
    .pipe(map((resp: Formacao) => {
      return resp;
    }));
  }

  save(formacao: Formacao): Observable<Formacao>{
    return this.http.post(`${environment.URL_API}${URL_FORMACAO}`,formacao)
    .pipe(map((resp: Formacao) => {
      return resp;
    }));
  }

  update(formacao: Formacao): Observable<Formacao>{
    return this.http.put(`${environment.URL_API}${URL_FORMACAO}/${formacao.id}`,formacao)
    .pipe(map((resp: Formacao) => {
      return resp;
    }));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${environment.URL_API}${URL_FORMACAO}/${id}`)
    .pipe(map(() => undefined));
  }

}
