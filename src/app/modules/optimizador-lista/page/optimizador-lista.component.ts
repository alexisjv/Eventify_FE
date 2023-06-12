import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';
import { ProductoCard } from '@core/models/productoCard';

@Component({
  selector: 'app-optimizador-lista',
  templateUrl: './optimizador-lista.component.html',
  styleUrls: ['./optimizador-lista.component.scss'],
})
export class OptimizadorListaComponent implements OnInit {
  bResumen = false;
  bEscenarios = true;
  bEstaLogueado = false;
  sVistaProducto: string = 'grid';
  vistaListaMasEconomica = true;
  vistaListaMenorRecorrido = false;
  isOpenDiv1 = true;
  isOpenDiv2 = false;
  isOpenDiv3 = false;
  mostrarRadio: boolean = true;
  mostrarRuta: boolean = false;
  radioElegido!: number;
  cantidadComensales!: number;
  comidasSeleccionadas!: number[];
  bebidasSeleccionadas!: number[];
  latitudUbicacion!: number;
  longitudUbicacion!: number;
  oCantidadesPorProducto: any;
  aListaProductos!: ProductoCard[];
  ofertasPrincipales: Oferta[] = [];
  rutaComercios: any = [];
  ofertaSeleccionadaActual!: Oferta;

  //datos para mostrar en el resumen:
  totalMasEconomico: number = 0;
  cantidadComerciosMasEconomico: number = 0;
  distanciaMasEconomico: string = '0';

  constructor(
    private listaCompraService: OptimizadorListaService,
    private route: ActivatedRoute,
    private mapaService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cantidadComensales = params['cantidadComensales'];
      this.comidasSeleccionadas = JSON.parse(params['comidas']);
      this.bebidasSeleccionadas = JSON.parse(params['bebidas']);
      this.latitudUbicacion = params['latitud'];
      this.longitudUbicacion = params['longitud'];
      this.radioElegido = params['radio'];
      this.oCantidadesPorProducto = JSON.parse(params['cantidadProductos']);
      console.log(this.cantidadComensales);
      console.log(this.comidasSeleccionadas);
      console.log(this.bebidasSeleccionadas);
      console.log(this.latitudUbicacion);
      console.log(this.longitudUbicacion);
      console.log(this.radioElegido);

      this.obtenerOfertas(
        this.latitudUbicacion,
        this.longitudUbicacion,
        this.cantidadComensales,
        this.comidasSeleccionadas,
        this.bebidasSeleccionadas,
        this.radioElegido,
        this.oCantidadesPorProducto
      );
    });
  }

  toggleDiv1() {
    this.isOpenDiv1 = true;
    this.isOpenDiv2 = false;
    this.obtenerRutaMasEconomico();
  }

  toggleDiv2() {
    this.isOpenDiv1 = false;
    this.isOpenDiv2 = true;
    this.obtenerRutaMenorRecorrido();
  }

  toggleDiv3() {
    this.isOpenDiv3 = !this.isOpenDiv3;
  }

  /*    obtenerLatLong(publicacion: any) {
    if (publicacion.esPrincipal) {
      const comercioPrincipal = {
        ubicacion: {
          lat: publicacion.oferta.latitud,
          lng: publicacion.oferta.longitud
        },
        nombre: publicacion.oferta.nombreComercio
      };
      this.ofertasPrincipales.push(comercioPrincipal);
    } else {
      const index = this.ofertasPrincipales.findIndex(comercio => comercio.nombre === publicacion.oferta.nombreComercio);
      if (index !== -1) {
        this.ofertasPrincipales.splice(index, 1);
      }
    }
  } 
   */

  cambiarAListaMasEconomico() {
    this.vistaListaMasEconomica = true;
    this.vistaListaMenorRecorrido = false;

    const divMasEconomico = document.querySelector('.div-mas-economico');
    const divMenorRecorrido = document.querySelector('.div-menor-recorrido');

    divMasEconomico?.classList.add('activo');
    divMenorRecorrido?.classList.remove('activo');
  }

  cambiarAListaMenorRecorrido() {
    this.vistaListaMasEconomica = false;
    this.vistaListaMenorRecorrido = true;

    const divMenorRecorrido = document.querySelector('.div-menor-recorrido');
    const divMasEconomico = document.querySelector('.div-mas-economico');

    divMenorRecorrido?.classList.add('activo');
    divMasEconomico?.classList.remove('activo');
  }

  cambiarVistaProducto(vista: string) {
    this.sVistaProducto = vista;
  }

  obtenerResumen() {
    this.bEscenarios = false;
    this.bResumen = true;
  }

  inciarSesion() {
    this.bEstaLogueado = true;
  }

  elegirOtroEscenario() {
    this.bEscenarios = true;
    this.bResumen = false;
  }

  capturarValorRadio(valorRadio: number) {
    this.radioElegido = valorRadio;
    console.log('Valor del rango:', valorRadio);
  }

  actualizarRadio() {
    this.ofertasPrincipales.splice(0);
    this.obtenerOfertas(
      this.latitudUbicacion,
      this.longitudUbicacion,
      this.cantidadComensales,
      this.comidasSeleccionadas,
      this.bebidasSeleccionadas,
      this.radioElegido,
      this.oCantidadesPorProducto
    );
  }

  obtenerOfertas(
    latitudUbicacion: number,
    longitudUbicacion: number,
    cantidadComensales: number,
    comidasSeleccionadas: number[],
    bebidasSeleccionadas: number[],
    valorRadio: number,
    oCantidadesPorProducto: {}
  ) {
    const lista: ListaPost = {
      latitudUbicacion: latitudUbicacion,
      longitudUbicacion: longitudUbicacion,
      distancia: valorRadio,
      comidas: comidasSeleccionadas,
      bebidas: bebidasSeleccionadas,
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: cantidadComensales,
      presupuesto: 0,
      cantidadProductos: oCantidadesPorProducto,
    };

    this.listaCompraService.obtenerOfertas(lista).subscribe(
      (response: ProductoCard[]) => {
        console.log('Respuesta:', response);

        for (const productoCard of response) {
          const ofertas = productoCard.ofertas;

          if (ofertas && ofertas.length > 0) {
            const primeraOferta = ofertas[0].oferta;
            const oferta: Oferta = {
              cantidad: ofertas[0].cantidad,
              subtotal: ofertas[0].subtotal,
              oferta: {
                idPublicacion: primeraOferta.idPublicacion,
                idTipoProducto: primeraOferta.idTipoProducto,
                idLocalidad: primeraOferta.idLocalidad,
                nombreProducto: primeraOferta.nombreProducto,
                marca: primeraOferta.marca,
                imagen: primeraOferta.imagen,
                precio: primeraOferta.precio,
                nombreComercio: primeraOferta.nombreComercio,
                latitud: primeraOferta.latitud,
                longitud: primeraOferta.longitud,
                localidad: primeraOferta.localidad,
              },
            };

            this.ofertasPrincipales.push(oferta);
          }
        }

        console.log('Comercios:', this.ofertasPrincipales);

        this.aListaProductos = response.map((producto) => ({
          ...producto,
          showArrows: false,
        }));
        this.actualizarDatos();
        this.obtenerRutaMasEconomico();
      },
      (error) => {
        console.error('Error al obtener las ofertas:', error);
      }
    );
  }

  toggleArrows(index: number) {
    this.aListaProductos[index].showArrows =
      !this.aListaProductos[index].showArrows;
  }

  cambiarMarca(data: { oferta: Oferta; index: number }): void {
    console.log('ofertas anteriores: ', this.ofertasPrincipales);
    const index = data.index;
    this.toggleArrows(index);

    // Verificar si la oferta ya existe en ofertasPrincipales
    const ofertaExistenteIndex = this.ofertasPrincipales.findIndex(
      (o) => o.oferta.idPublicacion === data.oferta.oferta.idPublicacion
    );

    if (ofertaExistenteIndex !== -1) {
      this.ofertaSeleccionadaActual = data.oferta;
    } else {
      const ofertaActualIndex = this.ofertasPrincipales.findIndex(
        (o) =>
          o.oferta.idPublicacion ===
          this.ofertaSeleccionadaActual.oferta.idPublicacion
      );
      if (ofertaActualIndex !== -1) {
        this.ofertasPrincipales.splice(ofertaActualIndex, 1);
      }
      this.ofertasPrincipales.push(data.oferta);
      this.obtenerRutaMasEconomico();
    }
    const oferta = data.oferta;
    console.log('Oferta seleccionada:', oferta.oferta.marca);

    console.log('ofertas posteriores: ', this.ofertasPrincipales);
    this.actualizarDatos();
    // Realiza acciones adicionales con la oferta y el índice
  }

  actualizarDatos() {
    this.calcularTotalMasEconomico();
    this.calcularCantidadComerciosMasEconomico();
  }

  calcularTotalMasEconomico() {
  this.totalMasEconomico = this.ofertasPrincipales.reduce((total, oferta) => {
    return total + oferta.subtotal;
  }, 0);
  
  // Redondear a 2 decimales
  this.totalMasEconomico = parseFloat(this.totalMasEconomico.toFixed(2));
}

calcularCantidadComerciosMasEconomico() {
  const nombresComercios = new Set<string>();

  this.ofertasPrincipales.forEach(oferta => {
    nombresComercios.add(oferta.oferta.nombreComercio);
  });

  this.cantidadComerciosMasEconomico = nombresComercios.size;
}

  obtenerRutaMasEconomico() {
    this.rutaComercios = [];
    const latitud = parseFloat(this.latitudUbicacion.toString());
    const longitud = parseFloat(this.longitudUbicacion.toString());

    const ubicacionOrigen = {
      ubicacion: { lat: latitud, lng: longitud },
      nombre: 'Mi ubicación',
    };

    this.rutaComercios.push(ubicacionOrigen);
    console.log('estas son las ofertas', this.ofertasPrincipales);

    for (const oferta of this.ofertasPrincipales) {
      const ubicacion = {
        lat: oferta.oferta.latitud,
        lng: oferta.oferta.longitud,
      };

      const comercio = {
        ubicacion: ubicacion,
        nombre: oferta.oferta.nombreComercio,
      };

      this.rutaComercios.push(comercio);
    }

    console.log('comercios principales:', this.rutaComercios);

    this.mapaService.obtenerRuta(this.rutaComercios, this.radioElegido, (distancia: string) => {
      this.distanciaMasEconomico = distancia;
    });

  }

  obtenerRutaMenorRecorrido() {
    const comercios = [
      {
        ubicacion: { lat: -34.6507, lng: -58.5590233379016 },
        nombre: 'Comercio 1',
      },
      {
        ubicacion: { lat: -34.65059, lng: -58.9 },
        nombre: 'Comercio 2',
      },
      {
        ubicacion: { lat: -35.6505, lng: -57.5590231222816 },
        nombre: 'Comercio 3',
      },
    ];

  }
}
