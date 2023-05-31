import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  map: any;
  directionsService: any;
  directionsRenderer: any;
  comercios: any[] = [];
  ubicacionActual: any;
  valorRadio: number = 5;
  circulo: any;

  constructor() {}

  ngOnInit() {
    this.obtenerUbicacionActual();
    this.inicializarMapa();
  }

  inicializarMapa() {
    this.directionsService = new google.maps.DirectionsService();
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          this.ubicacionActual = {
            lat: posicion.coords.latitude,
            lng: posicion.coords.longitude,
          };
          this.centrarMapa();
          this.agregarMarcadorRadio();
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no es soportada por el navegador.');
    }
  }

  actualizarValorRadio(evento: any) {
    this.valorRadio = evento.target.value;
    console.log(this.valorRadio);
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

    const radioMetros = this.valorRadio * 1000;

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
    const comerciosEnRadio = this.comercios.filter((comercio) => {
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

  calcularYMostrarRuta(
    comercios: any[],
    callback: (distancia: string) => void
  ) {
    this.comercios = comercios;
    const origen = this.comercios[0].ubicacion;
    const destino = this.comercios[this.comercios.length - 1].ubicacion;
    const puntosIntermedios = this.comercios
      .slice(1, this.comercios.length - 1)
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

    this.directionsService.route(solicitudRuta, (respuesta, estado) => {
      if (estado === 'OK') {
        this.directionsRenderer.setDirections(respuesta);
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
              console.log('Distancia del recorrido:', distancia);
              callback(distancia);
            } else {
              console.error('No se pudo calcular la distancia. Error:', estado);
            }
          }
        );
        console.log(comercios);
        console.log(destino);
      } else {
        window.alert('No se pudo calcular la ruta. Error: ' + estado);
      }
    });
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
    const origen = this.comercios[0].ubicacion;
    const destino = this.comercios[this.comercios.length - 1].ubicacion;
    const puntosIntermedios = this.comercios
      .slice(1, this.comercios.length - 1)
      .map((punto) => encodeURIComponent(punto.ubicacion));

    const enlaceMapa = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      origen
    )}&destination=${encodeURIComponent(
      destino
    )}&waypoints=${puntosIntermedios.join('%7C')}&dirflg=d`;

    return enlaceMapa;
  }
}
