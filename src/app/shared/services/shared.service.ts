import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/config/url';

declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class SharedService {


  constructor(private http: HttpClient) {}


  // Servicios de Mapa 

  obtenerUbicacionActual(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (posicion) => {
            const ubicacionActual = {
              lat: posicion.coords.latitude,
              lng: posicion.coords.longitude,
            };
            resolve(ubicacionActual);
          },
          (error) => {
            reject('Error al obtener la ubicación: ' + error);
          }
        );
      } else {
        reject('La geolocalización no es soportada por el navegador.');
      }
    });
  }

  calcularDistancia(origen: any, destino: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const servicioDistancia = new google.maps.DistanceMatrixService();
      servicioDistancia.getDistanceMatrix(
        {
          origins: [origen],
          destinations: [destino],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (respuesta, estado) => {
          if (estado === 'OK') {
            const distancia = respuesta.rows[0].elements[0].distance.text;
            resolve(distancia);
          } else {
            reject('No se pudo calcular la distancia. Error: ' + estado);
          }
        }
      );
    });
  }

  calcularRuta(solicitudRuta: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(solicitudRuta, (respuesta, estado) => {
        if (estado === 'OK') {
          resolve(respuesta);
        } else {
          reject('No se pudo calcular la ruta. Error: ' + estado);
        }
      });
    });
  }
  
}