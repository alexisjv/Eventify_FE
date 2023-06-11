import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  nValorRadio: number = 5000;
  nValorRadioEnPantalla: number = 5;
  nValorRadioElegido!: number;
  circulo: any;
  @Output() valorRadioEnviado: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() ubicacionActualLatitud: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() ubicacionActualLongitud: EventEmitter<number> =
    new EventEmitter<number>();
    @Input() valorRadioElegido!: number;

  constructor() {}

  ngOnInit() {
    if(this.valorRadioElegido != undefined ){
      this.nValorRadioEnPantalla = this.valorRadioElegido / 1000;
    }
      this.inicializarMapa(this.valorRadioElegido);
  }

  multipliarValorRadio() {
    this.nValorRadioEnPantalla = this.valorRadioElegido / 1000;
  }

  inicializarMapa(valorRadioElegido: number) {
    this.directionsRenderer = new google.maps.DirectionsRenderer();

    const opcionesMapa = {
      zoom: 12,
    };

    this.map = new google.maps.Map(
      document.getElementById('map'),
      opcionesMapa
    );
    this.directionsRenderer.setMap(this.map);
    this.obtenerUbicacionActual(valorRadioElegido);
  }

  obtenerUbicacionActual(valorRadioElegido: number): Promise<any> {
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
    })
      .then((ubicacionActual) => {
        this.ubicacionActual = ubicacionActual;
        this.centrarMapa();
        this.agregarMarcadorRadio(valorRadioElegido);
        this.agregarMarcaUbicacionActual();
        this.ubicacionActualLatitud.emit(this.ubicacionActual.lat);
        this.ubicacionActualLongitud.emit(this.ubicacionActual.lng);
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación:', error);
      });
  }

  actualizarValorRadio(evento: any) {
    this.nValorRadioElegido = evento.target.value * 1000;
    this.agregarMarcadorRadio(this.nValorRadioElegido);
    this.valorRadioEnviado.emit(this.nValorRadioElegido);
  }

  setValorRadio(valorRadio: number){
    this.nValorRadioElegido = valorRadio;
    this.inicializarMapa(this.nValorRadioElegido)

  }

  valorRadioAPorcentaje(valor: number): number {
    return ((valor - 1) / 19) * 100;
  }

  centrarMapa() {
    if (this.ubicacionActual) {
      this.map.setCenter(this.ubicacionActual);
    }
  }

  agregarMarcaUbicacionActual() {
    const marcador = new google.maps.Marker({
      position: this.ubicacionActual,
      map: this.map,
      title: 'Mi ubicación',
    });
  }

  agregarMarcadorRadio(valorRadioElegido: any) {
    if (this.circulo) {
      this.circulo.setMap(null);
    }
    
     let dibujoCirculo = 5000;

     if (valorRadioElegido != undefined) {
      dibujoCirculo = parseInt(valorRadioElegido, 10); // Convertir a número entero
    }

    console.log('El tipo de dato es:' + typeof valorRadioElegido)

    const marcador = new google.maps.Marker({
      position: this.ubicacionActual,
      map: this.map,
      title: 'Mi ubicación',
    });

    this.circulo = new google.maps.Circle({
      strokeColor: '#FF8153',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF8153',
      fillOpacity: 0.35,
      map: this.map,
      center: this.ubicacionActual,
      radius: dibujoCirculo,
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

  calcularYMostrarRuta(
    comercios: any[], radio: number,
    callback: (distancia: string) => void
  ) {
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

    this.inicializarMapa(radio);

    const solicitudRuta = {
      origin: origen,
      destination: destino,
      waypoints: puntosIntermedios,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
    };

    this.calcularRuta(solicitudRuta)
      .then((respuesta) => {
        this.directionsRenderer.setDirections(respuesta);
        return this.calcularDistancia(origen, destino);
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
