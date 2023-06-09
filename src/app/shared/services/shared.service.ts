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

export class SharedService {

  apiUrl = 'https://localhost:7292/api/';

  constructor(private http: HttpClient) { }
  
}