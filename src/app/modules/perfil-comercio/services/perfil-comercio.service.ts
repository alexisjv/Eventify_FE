import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@core/config/url';
import { OfertaPublicada } from '@core/models/ofertaPublicada';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilComercioService {

  constructor(private http: HttpClient) { }

  obtenerOfertasDelComercio(idComercio: number): Observable<OfertaPublicada[]> {
    return this.http.get<OfertaPublicada[]>(API_URL + `comercio/verOfertas/${idComercio}`);
  }
}
