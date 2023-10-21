import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GrupoOracao } from '../models/grupo-oracao';

const URL_GRUPO_ORACAO = '/api/v1/grupo-oracao';

@Injectable({
  providedIn: 'root'
})
export class GrupoOracaoService {
  
  constructor(private http: HttpClient){

  }

  loadGrupos(ativo: boolean, search: string): Observable<GrupoOracao[]> {
    
    return this.http.get(`${environment.URL_API}${URL_GRUPO_ORACAO}?search=${search}`)
    .pipe(map((resp: GrupoOracao[]) => {
      return resp;
    }));
  }

  getById(id: string): Observable<GrupoOracao> {
    return this.http.get(`${environment.URL_API}${URL_GRUPO_ORACAO}?id=${id}`)
    .pipe(map((resp: GrupoOracao) => {
      return resp;
    }));
  }


  save(GrupoOracao: GrupoOracao): Observable<GrupoOracao>{
    return this.http.post(`${environment.URL_API}${URL_GRUPO_ORACAO}`,GrupoOracao)
    .pipe(map((resp: GrupoOracao) => {
      return resp;
    }));
  }

  update(GrupoOracao: GrupoOracao): Observable<GrupoOracao>{
    return this.http.put(`${environment.URL_API}${URL_GRUPO_ORACAO}/${GrupoOracao.id}`,GrupoOracao)
    .pipe(map((resp: GrupoOracao) => {
      return resp;
    }));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${environment.URL_API}${URL_GRUPO_ORACAO}/${id}`)
    .pipe(map(() => undefined));
  }

}
