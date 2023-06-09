import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Evento } from "@core/models/evento";
import { ListaPost } from "@core/models/listaPost";
import { Oferta } from "@core/models/oferta";
import { Producto } from "@core/models/producto";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
  
  export class OptimizadorListaService {
  
    apiUrl = 'https://localhost:7292/api/';
  
    constructor(private http: HttpClient) { }

  obtenerOfertas(filtro: ListaPost): Observable<any> {
    return this.http.post<Oferta>(this.apiUrl + 'oferta/listaPersonalizada', filtro);
  }
  
}