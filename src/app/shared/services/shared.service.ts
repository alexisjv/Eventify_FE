import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/config/url';
import { MapaComponent } from '@shared/components/mapa/mapa.component';

declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  
  obtenerLinkGps(): Promise<string> {
    return this.mapa.obtenerEnlaceGPS();
  }


  constructor(private http: HttpClient, private mapa: MapaComponent) {}


  // Servicios de Mapa 


  obtenerRuta(comercios: any[], radio: number, callback: (distancia: string) => void) {
    this.mapa.calcularYMostrarRuta(comercios, radio, callback);
  }

  enviarValorRadio(valorRadio: number) {
    this.mapa.setValorRadio(valorRadio);
  }

  
}