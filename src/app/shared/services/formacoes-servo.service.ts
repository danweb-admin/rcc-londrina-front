import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Formacao } from '../models/formacao';
import { FormacoesServo } from '../models/formacoes-servo';
import { FormacoesServoCreate } from '../models/formacoes-servo-create';

const URL_FORMACOES_SERVO = '/api/v1/formacoes-servo';

@Injectable({
  providedIn: 'root'
})
export class FormacoesServoService {
  
  constructor(private http: HttpClient){
  }

  loadFormacoesByServo(servoId: string): Observable<FormacoesServo[]>{
    return this.http.get(`${environment.URL_API}${URL_FORMACOES_SERVO}?servoId=${servoId}`)
    .pipe(map((resp: FormacoesServo[]) => {
      return resp;
    }));
  }

  save(formacao: FormacoesServoCreate): Observable<Formacao>{
    return this.http.post(`${environment.URL_API}${URL_FORMACOES_SERVO}`,formacao)
    .pipe(map((resp: Formacao) => {
      return resp;
    }));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${environment.URL_API}${URL_FORMACOES_SERVO}/${id}`)
    .pipe(map(() => undefined));
  }

}
