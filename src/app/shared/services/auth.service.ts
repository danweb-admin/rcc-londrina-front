import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiLogin = '/api/v1/login';
  
  constructor(private httpClient: HttpClient){}

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.URL_API}${this.apiLogin}`, {email, password})
    .pipe(map((resp: any )=> {
      localStorage.setItem('token', `${resp.token}`);
      localStorage.setItem('user',`${resp.user.name}`)
      localStorage.setItem('role', `${resp.user.role}`);
      localStorage.setItem('admin',this.isAdmin(resp.user).toString())
      return resp.user as User;
    }));
  }

  isAdmin(user){
    if (user.decanatoSetorId == null && user.grupoOracaoId == null){
      return true;
    }
    return false
  }

  public sign(): void {
    localStorage.setItem('token', 'token');
  }

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<User> {
    const name = localStorage.getItem('user');
    return of({
      name: name,
      lastName: ''
    } as User);
  }
}
