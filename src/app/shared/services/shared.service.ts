import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/config/url';
import { MapaComponent } from '@shared/components/mapa/mapa.component';

declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class SharedService {


  constructor(private http: HttpClient, private mapa: MapaComponent) {}


  // Servicios de Mapa 


  obtenerRuta(comercios: any[]) {
    this.mapa.calcularYMostrarRuta(comercios, (distancia: string) => {
      console.log(distancia);
    });
  }
  
}