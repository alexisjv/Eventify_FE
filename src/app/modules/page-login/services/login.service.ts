import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { API_URL } from '@core/config/url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string , password: string, rol: number): Observable<any> {
    let params = JSON.stringify({email: email,
    clave: password});
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    if(rol == 1){

      return this.http.post(API_URL + 'Usuario/inicioSesion', params, {headers: headers})
      .pipe(
        map(res => res)
      );
    }
    else{

      return this.http.post(API_URL + 'comercio/inicioSesion', params, {headers: headers})
      .pipe(
        map(res => res)
      );
    }
  }
}
