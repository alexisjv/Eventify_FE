import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';

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
  isOpenDiv1 = false;
  isOpenDiv2 = false;
  isOpenDiv3 = false;
  mostrarRadio: boolean = true;
  mostrarRuta: boolean = false;

  constructor(
    private listaCompraService: OptimizadorListaService,
    private route: ActivatedRoute,
    private mapaService: SharedService
  ) {}

  ngOnInit(): void {
    /*  this.mapaService.obtenerUbicacionActual().then((ubicacion) => {
      const latitudUbicacion = ubicacion.lat;
      const longitudUbicacion = ubicacion.lng;
  
      this.route.queryParams.subscribe((params) => {
        const cantidadComensales = params['cantidadComensales'];
        const comidasSeleccionadas = JSON.parse(params['comidas']);
        const bebidasSeleccionadas = JSON.parse(params['bebidas']);
  
        this.obtenerOfertas(
          latitudUbicacion,
          longitudUbicacion,
          cantidadComensales,
          comidasSeleccionadas,
          bebidasSeleccionadas
        );
      });
    }).catch((error) => {
      console.error('Error al obtener la ubicación:', error);
    }); */
  }

  toggleDiv1() {
    this.isOpenDiv1 = !this.isOpenDiv1;
    this.obtenerRutaMasEconomico();
  }

  toggleDiv2() {
    this.isOpenDiv2 = !this.isOpenDiv2;
    this.obtenerRutaMenorRecorrido()
  }

  toggleDiv3() {
    this.isOpenDiv3 = !this.isOpenDiv3;
  }

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

  obtenerOfertas(
    latitudUbicacion: number,
    longitudUbicacion: number,
    cantidadComensales: number,
    comidasSeleccionadas: number[],
    bebidasSeleccionadas: number[]
  ) {
    const lista: ListaPost = {
      latitudUbicacion: latitudUbicacion,
      longitudUbicacion: longitudUbicacion,
      distancia: 5000,
      comidas: comidasSeleccionadas,
      bebidas: bebidasSeleccionadas,
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: cantidadComensales,
      presupuesto: 0,
    };

    this.listaCompraService.obtenerOfertas(lista).subscribe(
      (response) => {
        console.log('Respuesta:', response);
        this.aListaOfertas = response;
      },
      (error) => {
        console.error('Error al obtener las ofertas:', error);
      }
    );
  }

  obtenerRutaMasEconomico() {
    const comercios = [
      {
        ubicacion: { lat: -34.6507, lng: -58.5590233379016 },
        nombre: 'Comercio 1',
      },
      {
        ubicacion: { lat: -34.65059, lng: -58.559441816 },
        nombre: 'Comercio 2',
      },
      {
        ubicacion: { lat: -34.6505, lng: -58.5590231222816 },
        nombre: 'Comercio 3',
      },
    ];

    this.mapaService.obtenerRuta(comercios);
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

    this.mapaService.obtenerRuta(comercios);
  }
}
