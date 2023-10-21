import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Paroquia } from '../models/paroquia';
import { User } from '../models/user';

const URL_USER = '/api/v1/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http: HttpClient){

  }

  loadUsers(ativo: boolean, search: string): Observable<User[]> {
    
    return this.http.get(`${environment.URL_API}${URL_USER}?search=${search}`)
    .pipe(map((resp: User[]) => {
      return resp;
    }));
  }

  getById(id: string): Observable<User> {
    return this.http.get(`${environment.URL_API}${URL_USER}?id=${id}`)
    .pipe(map((resp: User) => {
      return resp;
    }));
  }


  save(user: User): Observable<User>{
    return this.http.post(`${environment.URL_API}${URL_USER}`,user)
    .pipe(map((resp: User) => {
      return resp;
    }));
  }

  update(user: User): Observable<User>{
    return this.http.put(`${environment.URL_API}${URL_USER}/${user.id}`,user)
    .pipe(map((resp: User) => {
      return resp;
    }));
  }

}
