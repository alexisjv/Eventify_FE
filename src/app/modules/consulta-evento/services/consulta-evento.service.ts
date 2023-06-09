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
import { API_URL } from '@core/config/url';


@Injectable({
  providedIn: 'root'
})

export class ConsultaEventoService {

  constructor(private http: HttpClient) { }

  //Metodos de las preguntas
  getListaEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(API_URL + 'evento/eventos');
  }

  getListaTiposDeComidas(idEvento: number): Observable<Comidas[]> {
    return this.http.get<Comidas[]>(API_URL + `Evento/comidas?idEvento=${idEvento}`);
  }

   getListaBebidas(idEvento: number): Observable<Bebidas[]> {
    return this.http.get<Bebidas[]>(API_URL + `Evento/bebidas?idEvento=${idEvento}`);
  }

  getLocalidades () : Observable<Localidad[]> {
    return this.http.get<Localidad[]>(API_URL + `Ubicacion/localidades`);
  }

  getListadeCompras( nCantidadInvitados: number, aSelecciones : {}){
    return this.http.post<ProductoLista[]>(API_URL + `Evento/listadoConCantidades/${nCantidadInvitados}` , aSelecciones);
  }
  

  
}