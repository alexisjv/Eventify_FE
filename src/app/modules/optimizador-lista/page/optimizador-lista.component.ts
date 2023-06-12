import { Component, OnInit, Output } from '@angular/core';
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
  aListaOfertas!:Oferta[];
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
  aListaComercios!: any[];
  aListaSeleccionComercio!:any[];
  isOpenListaSeleccionComercio: boolean = true;
  totalListaDeComercio!: number;
  activeButton = -1;
  constructor(
    private listaCompraService: OptimizadorListaService,
    private route: ActivatedRoute,
    private mapaService: SharedService
  ) {}

  ngOnInit(): void {

    this.aListaComercios = [
      {
        nombreComercio: "Walmart",
        total: 2500,
        listaOfertas:[{
            "idPublicacion": 1,
            "idTipoProducto": 2,
            "tipoProducto": "Fernet",
            "nombreProducto": "Branca",
            "marca": "Branca",
            "imagen": "https://d2r9epyceweg5n.cloudfront.net/stores/001/151/835/products/77908950004301-80602de5b61cff11bb15890782195412-640-0.jpg",
            "precio": 0,
            "peso": 0,
            "unidades": 0,
            "nombreComercio": "Walmart",
            "localidad": "Localidad",
            "idLocalidad": 2,
            "latitud": 2,
            "longitud": 2
          },
          {
            "idPublicacion": 2,
            "idTipoProducto": 2,
            "tipoProducto": "prodcuto2",
            "marca": "producto",
            "imagen": "https://d2r9epyceweg5n.cloudfront.net/stores/001/151/835/products/77908950004301-80602de5b61cff11bb15890782195412-640-0.jpg",
            "precio": 0,
            "peso": 0,
            "unidades": 0,
            "nombreComercio": "Walmart",
            "localidad": "localid",
            "idLocalidad": 2,
            "latitud": 2,
            "longitud": 2
          },
        ]
      },
      {
        nombreComercio: "Dia",
        total:3000,
        listaOfertas:[{
            "idPublicacion": 1,
            "idTipoProducto": 2,
            "tipoProducto": "Fernet",
            "nombreProducto": "Branca",
            "marca": "Branca",
            "imagen": "https://d2r9epyceweg5n.cloudfront.net/stores/001/151/835/products/77908950004301-80602de5b61cff11bb15890782195412-640-0.jpg",
            "precio": 0,
            "peso": 0,
            "unidades": 0,
            "nombreComercio": "Dia",
            "localidad": "Localidad",
            "idLocalidad": 2,
            "latitud": 2,
            "longitud": 2
          },
          {
            "idPublicacion": 2,
            "idTipoProducto": 2,
            "tipoProducto": "prodcuto2",
            "marca": "producto",
            "imagen": "https://d2r9epyceweg5n.cloudfront.net/stores/001/151/835/products/77908950004301-80602de5b61cff11bb15890782195412-640-0.jpg",
            "precio": 0,
            "peso": 0,
            "unidades": 0,
            "nombreComercio": "Dia",
            "localidad": "localid",
            "idLocalidad": 2,
            "latitud": 2,
            "longitud": 2
          },
        ]
      }
     
    ]

    this.aListaSeleccionComercio = this.aListaComercios[0].listaOfertas;
    this.totalListaDeComercio = this.aListaComercios[0].total;
    
    
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
      cantidadProductos: oCantidadesPorProducto
    };

    this.listaCompraService.obtenerOfertas(lista).subscribe(
      (response : ProductoCard[]) => {
        console.log('Respuesta:', response);
        // this.aListaOfertas = response;
        this.aListaProductos = response;
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

    this.mapaService.obtenerRuta(comercios, this.radioElegido);
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

  onClickVerListaDeComercio (comercio:any){
    this.aListaSeleccionComercio = comercio.listaOfertas;
    this.isOpenListaSeleccionComercio = true;
    this.totalListaDeComercio = comercio.total;
    
  }
}
