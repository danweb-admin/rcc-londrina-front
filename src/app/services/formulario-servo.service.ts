
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const URL_FORMULARIO_SERVO = '/api/v1/formularios-servo';

export interface FormularioServo {
  grupoOracaoId: string;
  grupoOracao: string;
}

export interface CadastroServoFormulario {
  name: string;
  birthday: string;
  cpf: string;
  email: string;
  cellPhone: string;
  mainMinistry: string;
  secondaryMinistry?: string;
  aceitouConsentimento: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormularioServoService {

  constructor(private http: HttpClient) {}

  getFormulario(token: string): Observable<any> {
    return this.http.get<FormularioServo>(
      `${environment.URL_API}${URL_FORMULARIO_SERVO}/${token}`
    ).pipe(
      map((resp: FormularioServo) => resp)
    );
  }

  cadastrar(token: string, cadastro: CadastroServoFormulario): Observable<any> {
    return this.http.post(
      `${environment.URL_API}${URL_FORMULARIO_SERVO}/${token}`,
      cadastro
    ).pipe(
      map((resp: any) => resp)
    );
  }
}
