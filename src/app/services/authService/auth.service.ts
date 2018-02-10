import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfiguration } from '../../app-constant.service';

@Injectable()
export class AuthService {


  constructor(private http: HttpClient) { }

  public authenticate(email, password) {

    return this.http.get('https://reqres.in/api/users/1')


    // const body = new HttpParams()
    //   .set('email', email)
    //   .set('password', password);
    // return this.http.post(AppConfiguration.ServerWithApiUrl + 'auth/login', body, {
    //   headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    // });
  }
  public login(data) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
