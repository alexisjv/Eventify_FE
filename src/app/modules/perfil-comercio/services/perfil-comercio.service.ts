import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@core/config/url';
import { ProductoOferta } from '@core/models/ProductoOferta';
import { OfertaPost } from '@core/models/ofertaPost';
import { OfertaPublicada } from '@core/models/ofertaPublicada';
import { tipoProducto } from '@core/models/tipoProducto';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilComercioService {
 
  constructor(private http: HttpClient) { }

  obtenerOfertasDelComercio(idComercio: number): Observable<OfertaPublicada[]> {
    return this.http.get<OfertaPublicada[]>(API_URL + `comercio/verOfertas/${idComercio}`);
  }
  obtenerTipoDeProductos () : Observable<tipoProducto[]>{
    return this.http.get<tipoProducto[]>(API_URL + `Producto/tipoProductos`);
  }

  obtenerMarcasDelProducto(idProducto: any): Observable<String[]> {
    return this.http.get<String[]>(API_URL + `Producto/marcas/${idProducto}`);
  }

  obtenerProductos(selectedProduct: string, selectedMarca: string) : Observable<ProductoOferta[]>{
    return this.http.get<ProductoOferta[]>(API_URL + `Producto/productos/${selectedProduct}/${selectedMarca}`);
  }
  buscarProducto(code : String): Observable<ProductoOferta> {
    return this.http.get<ProductoOferta>(API_URL + `Producto/producto/${code}`);
  }

  publicarOferta(oferta: OfertaPost)
  : Observable<String> {
    return this.http.post<String>(API_URL + `comercio/cargarOferta/`, oferta);
    
  }

  
}
