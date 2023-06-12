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
  aListaOfertasMenorRecorrido!: Oferta[];
  alistaOfertasEconomicos!: Oferta[];
  aListaOfertaElegida!: Oferta[];
  aListaLocalidadesSeleccionadas!: string[];
  sNombreEvento!: string;
  bResumen = false;
  bEscenarios = true;
  bEstaLogueado = false;
  aListaOfertas!: Oferta[];
  value = '';
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
            const comercio: Oferta = {
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

            this.ofertasPrincipales.push(comercio);
          }
        }

        console.log('Comercios:', this.ofertasPrincipales);

        this.aListaProductos = response;
      },
      (error) => {
        console.error('Error al obtener las ofertas:', error);
      }
    );
  }

  agregarPublicacionConfirmada(publicacionConfirmada: Oferta) {
    console.log('ofertas anteriores:', this.ofertasPrincipales);
  
    // Eliminar la publicación anterior si existe
    const index = this.ofertasPrincipales.findIndex(
      (oferta) => oferta.oferta.idPublicacion === publicacionConfirmada.oferta.idPublicacion
    );
    if (index !== -1) {
      this.ofertasPrincipales.splice(index, 1);
    }
  
    // Agregar la nueva publicación confirmada
    this.ofertasPrincipales.push(publicacionConfirmada);
  
    console.log('ofertas posteriores:', this.ofertasPrincipales);
  
    // Aquí puedes realizar cualquier otra acción necesaria con la publicación confirmada
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

    this.mapaService.obtenerRuta(this.rutaComercios, this.radioElegido);
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

    this.mapaService.obtenerRuta(comercios, this.radioElegido);
  }
}
