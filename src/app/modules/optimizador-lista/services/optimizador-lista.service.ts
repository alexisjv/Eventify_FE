import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Evento } from "@core/models/evento";
import { Oferta } from "@core/models/oferta";
import { Producto } from "@core/models/producto";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
  
  export class OptimizadorListaService {
  
    apiUrl = 'https://localhost:7292/api/';
  
    constructor(private http: HttpClient) { }


getListaProductosPorCriterio(criterio): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + 'obtenerStock');
  }

  getListaOfertasMenorRecorrido(idLocalidad: number, idComida: number, idBebida: number): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl + `oferta/ofertasPorLocalidad/${idLocalidad}/${idComida}/${idBebida}`);
  }

  postListaOfertasEconomicas(idComercios: number[], idComida: number, idBebida: number): Observable<Oferta[]> {

    return this.http.post<Oferta[]>(this.apiUrl + `oferta/ofertasMasEconomicas/${idComida}/${idBebida}`, idComercios);
    
  }

  getListaEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.apiUrl + 'evento/eventos');
  }
}