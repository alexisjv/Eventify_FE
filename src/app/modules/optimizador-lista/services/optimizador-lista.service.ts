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
      const respuesta = this.http.post<Oferta>(API_URL + 'oferta/listadoOfertas', filtro);
      return respuesta;
    }

    obtenerOfertasPorComercio(filtro: ListaPost): Observable<any> {
      const respuesta = this.http.post<Oferta>(API_URL + 'Oferta/recorrerMenos', filtro);
      return respuesta;
    }

    guardarLista(body: any) {
      this.http.post(API_URL + 'listadoOfertas/guardarListado', body).subscribe(
        (response) => {
          console.log('La petición se realizó correctamente.', response);
        },
        (error) => {
          console.error('Error al realizar la petición:', error);
        }
      );
    }
    
  
}