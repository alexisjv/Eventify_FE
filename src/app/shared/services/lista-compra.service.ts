import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Oferta } from '@core/models/oferta';
import { Evento } from '@core/models/evento';
import { Comidas } from '@core/models/comidas';
import { Bebidas } from '@core/models/bebidas';
import { Localidad } from '@core/models/localidad';
import { ProductoLista } from '@core/models/ProductoLista';
import { Producto } from '@core/models/producto';

@Injectable({
  providedIn: 'root'
})

export class ListaComprasService {

  apiUrl = 'https://localhost:7292/api/';

  constructor(private http: HttpClient) { }

  //Metodos de las preguntas
  getListaEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.apiUrl + 'evento/eventos');
  }

  getListaTiposDeComidas(idEvento: number): Observable<Comidas[]> {
    return this.http.get<Comidas[]>(this.apiUrl + `Evento/comidas?idEvento=${idEvento}`);
  }

   getListaBebidas(idEvento: number): Observable<Bebidas[]> {
    return this.http.get<Bebidas[]>(this.apiUrl + `Evento/bebidas?idEvento=${idEvento}`);
  }

  getLocalidades () : Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.apiUrl + `Ubicacion/localidades`);
  }

  getListadeCompras( idEvento:number, idComida : number , idBebida: number){
    return this.http.get<ProductoLista[]>(this.apiUrl + `Evento/listado?idEvento=${idEvento}&idComida=${idComida}&idBebida=${idBebida}`);
  }

//Metodos de escenarios finales
 
  getListaProductosPorCriterio(criterio): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + 'obtenerStock');
  }

  getListaOfertasMenorRecorrido(idLocalidad: number, idComida: number, idBebida: number): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl + `oferta/ofertasPorLocalidad/${idLocalidad}/${idComida}/${idBebida}`);
  }

  postListaOfertasEconomicas(idComercios: number[], idComida: number, idBebida: number): Observable<Oferta[]> {

    return this.http.post<Oferta[]>(this.apiUrl + `oferta/ofertasMasEconomicas/${idComida}/${idBebida}`, idComercios);
    
  }
  

  
}