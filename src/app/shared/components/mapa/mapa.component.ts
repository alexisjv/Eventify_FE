import { Component, OnInit } from '@angular/core';
import { SharedService } from '@shared/services/shared.service';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  map: any;
  directionsRenderer: any;
  aComercios: any[] = [];
  ubicacionActual: any;
  nValorRadio: number = 5;
  circulo: any;

  constructor(private mapaService: SharedService) {}

  ngOnInit() {
    this.obtenerUbicacionActual();
    this.inicializarMapa();
  }

  inicializarMapa() {
    this.directionsRenderer = new google.maps.DirectionsRenderer();

    const opcionesMapa = {
      zoom: 12,
    };

    this.map = new google.maps.Map(
      document.getElementById('map'),
      opcionesMapa
    );
    this.directionsRenderer.setMap(this.map);
    this.obtenerUbicacionActual();
  }

  obtenerUbicacionActual() {
    this.mapaService.obtenerUbicacionActual()
      .then((ubicacionActual) => {
        this.ubicacionActual = ubicacionActual;
        this.centrarMapa();
        this.agregarMarcadorRadio();
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación:', error);
      });
  }

  actualizarValorRadio(evento: any) {
    this.nValorRadio = evento.target.value;
    console.log(this.nValorRadio);
    this.agregarMarcadorRadio();
  }

  valorRadioAPorcentaje(valor: number): number {
    return ((valor - 1) / 19) * 100;
  }

  centrarMapa() {
    if (this.ubicacionActual) {
      this.map.setCenter(this.ubicacionActual);
    }
  }

  agregarMarcadorRadio() {
    if (this.circulo) {
      this.circulo.setMap(null);
    }

    const marcador = new google.maps.Marker({
      position: this.ubicacionActual,
      map: this.map,
      title: 'Mi ubicación',
    });

    const radioMetros = this.nValorRadio * 1000;

    this.circulo = new google.maps.Circle({
      strokeColor: '#FF8153',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF8153',
      fillOpacity: 0.35,
      map: this.map,
      center: this.ubicacionActual,
      radius: radioMetros,
    });
  }

  filtrarComercios() {
    const radio = 1000;
    const comerciosEnRadio = this.aComercios.filter((comercio) => {
      const ubicacionComercio = {
        lat: comercio.lat,
        lng: comercio.lng,
      };
      const distancia = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(
          this.ubicacionActual.lat,
          this.ubicacionActual.lng
        ),
        new google.maps.LatLng(ubicacionComercio.lat, ubicacionComercio.lng)
      );
      return distancia <= radio;
    });
  }

  calcularYMostrarRuta(comercios: any[], callback: (distancia: string) => void) {
    this.aComercios = comercios;
    const origen = this.aComercios[0].ubicacion;
    const destino = this.aComercios[this.aComercios.length - 1].ubicacion;
    const puntosIntermedios = this.aComercios
      .slice(1, this.aComercios.length - 1)
      .map((punto) => {
        return {
          location: punto.ubicacion,
          stopover: true,
        };
      });

    this.inicializarMapa();

    const solicitudRuta = {
      origin: origen,
      destination: destino,
      waypoints: puntosIntermedios,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
    };

    this.mapaService.calcularRuta(solicitudRuta)
      .then((respuesta) => {
        this.directionsRenderer.setDirections(respuesta);
        return this.mapaService.calcularDistancia(origen, destino);
      })
      .then((distancia) => {
        console.log('Distancia del recorrido:', distancia);
        callback(distancia);
      })
      .catch((error) => {
        console.error('No se pudo calcular la distancia. Error:', error);
      });

    console.log(this.aComercios);
    console.log(destino);
  }

  compartirMapa() {
    const enlaceMapa = this.generarEnlaceMapa();
    const mensajeWhatsApp = `¡Hola! Aquí está la mejor ruta para llegar a mi destino: ${enlaceMapa}`;

    const enlaceWhatsAppWeb = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;
    window.open(enlaceWhatsAppWeb, '_blank');

    window.open(enlaceMapa);
  }

  obtenerEnlaceGPS(): string {
    return this.generarEnlaceMapa();
  }

  generarEnlaceMapa(): string {
    const origen = this.aComercios[0].ubicacion;
    const destino = this.aComercios[this.aComercios.length - 1].ubicacion;
    const puntosIntermedios = this.aComercios
      .slice(1, this.aComercios.length - 1)
      .map((punto) => encodeURIComponent(punto.ubicacion));

    const enlaceMapa = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      origen
    )}&destination=${encodeURIComponent(
      destino
    )}&waypoints=${puntosIntermedios.join('%7C')}&dirflg=d`;

    return enlaceMapa;
  }
}
