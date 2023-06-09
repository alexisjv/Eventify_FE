import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto } from '@core/models/producto';
import { Evento } from '@core/models/evento';
import { Localidad } from '@core/models/localidad';
import { Comidas } from '@core/models/comidas';
import { Bebidas } from '@core/models/bebidas';
import { ProductoLista } from '@core/models/ProductoLista';
import { Oferta } from '@core/models/oferta';

@Injectable({
  providedIn: 'root'
})

export class ConsultaEventoService {

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

  getListadeCompras( nCantidadInvitados: number, aSelecciones : {}){
    return this.http.post<ProductoLista[]>(this.apiUrl + `Evento/listadoConCantidades/${nCantidadInvitados}` , aSelecciones);
  }
  

  
}