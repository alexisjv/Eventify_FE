import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { API_URL } from '@core/config/url';

@Injectable({
  providedIn: 'root'
})
export class FormRegistroService {

  constructor(private http: HttpClient) { }

  registro(userRegistrado): Observable<any> {
    let params = JSON.stringify(userRegistrado);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(API_URL + 'Usuario/registro', params, {headers: headers})
      .pipe(
        map(res => res)
      );
  }
}
