import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ListaPost } from "@core/models/listaPost";
import { Oferta } from "@core/models/oferta";
import { Observable } from "rxjs";
import { API_URL } from '@core/config/url';



@Injectable({
    providedIn: 'root'
  })
  
  export class OptimizadorListaService {
  
    constructor(private http: HttpClient) { }

  obtenerOfertas(filtro: ListaPost): Observable<any> {
    return this.http.post<Oferta>(API_URL + 'oferta/listadoOfertas', filtro);
  }
  
}