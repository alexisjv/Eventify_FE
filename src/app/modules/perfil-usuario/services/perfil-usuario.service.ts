import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@core/config/url';
import { ListaDetalle } from '@core/models/listaDetalle';
import { ListaGuardada } from '@core/models/listaGuardada';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  constructor(private http: HttpClient) { }


  obtenerListasDelUsuario(idUsuario: number): Observable<any> {
    return this.http.get<any>(API_URL + `listadoOfertas/misListados?idUsuario=${idUsuario}`);
  }
  

  verDetalleLista(idListado: number, idUsuario: number):Observable<ListaDetalle>{
    return this.http.get<ListaDetalle>(API_URL + `listadoOfertas/detalleListado?idUsuario=${idUsuario}&idListado=${idListado}`)
  }
}
