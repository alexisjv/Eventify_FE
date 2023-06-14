import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';
import { ProductoCard } from '@core/models/productoCard';
import { CardOfertaComponent } from '@shared/components/card-oferta/card-oferta.component';

@Component({
  selector: 'app-optimizador-lista',
  templateUrl: './optimizador-lista.component.html',
  styleUrls: ['./optimizador-lista.component.scss'],
})
export class OptimizadorListaComponent implements OnInit {
  @ViewChild(CardOfertaComponent) appCardOfertaComponent!: CardOfertaComponent;
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
  urlRecorrido: string = '';
  aListaComercios!: any[];
  aListaSeleccionComercio!: any[];
  isOpenListaSeleccionComercio: boolean = true;
  totalListaDeComercio = 0;
  activeButton = 0;
  idEvento!: number;

  //Mas economico
  listaOfertasElegidasMasEconomico: Oferta[] = [];
  rutaComerciosMasEconomico: any = [];
  ofertaSeleccionadaActual!: Oferta;
  cantidadOfertasMasEconomico!: number;
  totalMasEconomico: number = 0;
  cantidadComerciosMasEconomico: number = 0;
  distanciaMasEconomico: string = '0';
  cantidadComerciosLista: any;
  distanciaComercioLista: any;
  mostrarBoton: boolean = true;
  index: any;
  carruselSeleccionadoIndex: number = 0;

  //Menor recorrido
  rutaComerciosMenorRecorrido!: any[];
  distanciaMenorRecorrido: string = '0';
  cantidadOfertasMenorRecorrido!: number;
  cantidadComerciosMenorRecorrido!: number;

  listaElegidaMasEconomico: boolean = true;
  listaElegidaMenorRecorrido: boolean = false;

  imagenLista!: string;

  constructor(
    private listaCompraService: OptimizadorListaService,
    private route: ActivatedRoute,
    private mapaService: SharedService
  ) {}

  ngOnInit(): void {
    this.aListaComercios = [];
    this.aListaSeleccionComercio = [];

    // this.totalListaDeComercio = this.aListaComercios[0].total;
    this.imagenLista = 'mateoMejorOferta';
    this.route.queryParams.subscribe((params) => {
      this.cantidadComensales = params['cantidadComensales'];
      this.comidasSeleccionadas = JSON.parse(params['comidas']);
      this.bebidasSeleccionadas = JSON.parse(params['bebidas']);
      this.latitudUbicacion = params['latitud'];
      this.longitudUbicacion = params['longitud'];
      this.radioElegido = params['radio'];
      this.oCantidadesPorProducto = JSON.parse(params['cantidadProductos']);
      this.idEvento = params['idEvento'];
      console.log(this.cantidadComensales);
      console.log(this.comidasSeleccionadas);
      console.log(this.bebidasSeleccionadas);
      console.log(this.latitudUbicacion);
      console.log(this.longitudUbicacion);
      console.log(this.radioElegido);
      console.log(this.idEvento);

      this.obtenerOfertas(
        this.latitudUbicacion,
        this.longitudUbicacion,
        this.cantidadComensales,
        this.comidasSeleccionadas,
        this.bebidasSeleccionadas,
        this.radioElegido,
        this.oCantidadesPorProducto
      );
      this.obtenerOfertasPorComercio(
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

  obtenerOfertasPorComercio(
    latitudUbicacion: number,
    longitudUbicacion: number,
    cantidadComensales: number,
    comidasSeleccionadas: number[],
    bebidasSeleccionadas: number[],
    radioElegido: number,
    oCantidadesPorProducto: any
  ) {
    const lista: ListaPost = {
      latitudUbicacion: latitudUbicacion,
      longitudUbicacion: longitudUbicacion,
      // CAMBIO EL VALOR DE 1000 A 1 PARA EL BACK
      distancia: radioElegido / 1000,
      comidas: comidasSeleccionadas,
      bebidas: bebidasSeleccionadas,
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: cantidadComensales,
      presupuesto: 0,
      cantidadProductos: oCantidadesPorProducto,
    };

    this.listaCompraService
      .obtenerOfertasPorComercio(lista)
      .subscribe((response: ProductoCard[]) => {
        response.forEach((oElement) => {
          this.aListaComercios.push(oElement);
        });
        this.aListaSeleccionComercio = this.aListaComercios[0].ofertas;
        this.calcularTotalListaComercio();
        this.cantidadComerciosLista = this.aListaComercios.length;
      });

    this.actualizarDatosMenorRecorrido();
  }

  toggleDiv1() {
    this.isOpenDiv1 = true;
    this.isOpenDiv2 = false;
    this.listaElegidaMasEconomico = true;
    this.listaElegidaMenorRecorrido = false;
    this.obtenerRutaMasEconomico();
    this.imagenLista = 'mateoMejorOferta';
  }

  toggleDiv2() {
    this.isOpenDiv1 = false;
    this.isOpenDiv2 = true;
    this.listaElegidaMasEconomico = false;
    this.listaElegidaMenorRecorrido = true;
    this.actualizarDatosMenorRecorrido();
    this.obtenerRutaMenorRecorrido();
    this.imagenLista = 'mateoMejorRecorrido';
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
    this.listaOfertasElegidasMasEconomico.splice(0);
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
      // CAMBIO EL VALOR DE 1000 A 1 PARA EL BACK
      distancia: valorRadio / 1000,
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

            this.listaOfertasElegidasMasEconomico.push(oferta);
          }
        }

        console.log('Comercios:', this.listaOfertasElegidasMasEconomico);

        this.aListaProductos = response.map((producto) => ({
          ...producto,
          showArrows: false,
        }));
        this.actualizarDatosMasEconomico();
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
    console.log('ofertas anteriores: ', this.listaOfertasElegidasMasEconomico);
    const index = data.index;
    this.toggleArrows(index);

    // Verificar si la oferta ya existe en ofertasPrincipales
    const ofertaExistenteIndex =
      this.listaOfertasElegidasMasEconomico.findIndex(
        (o) => o.oferta.idPublicacion === data.oferta.oferta.idPublicacion
      );

    if (ofertaExistenteIndex !== -1) {
      this.ofertaSeleccionadaActual = data.oferta;
    } else {
      const ofertaActualIndex = this.listaOfertasElegidasMasEconomico.findIndex(
        (o) =>
          o.oferta.idPublicacion ===
          this.ofertaSeleccionadaActual.oferta.idPublicacion
      );
      if (ofertaActualIndex !== -1) {
        this.listaOfertasElegidasMasEconomico.splice(ofertaActualIndex, 1);
      }
      this.listaOfertasElegidasMasEconomico.push(data.oferta);
      this.obtenerRutaMasEconomico();
    }
    const oferta = data.oferta;
    console.log('Oferta seleccionada:', oferta.oferta.marca);

    console.log('ofertas posteriores: ', this.listaOfertasElegidasMasEconomico);
    this.actualizarDatosMasEconomico();
    // Realiza acciones adicionales con la oferta y el índice
  }

  actualizarDatosMasEconomico() {
    this.calcularTotalMasEconomico();
    this.calcularCantidadComerciosMasEconomico();
    this.calcularCantidadDeOfertasMasEconomico();
  }

  cambiarMarcaNuevo(index: number) {
    this.mostrarBoton = !this.mostrarBoton;
    this.listaOfertasElegidasMasEconomico;
    // const index = data.index;
    this.toggleArrows(index);
  }

  actualizarDatos() {
    this.calcularTotalMasEconomico();
    this.calcularCantidadComerciosMasEconomico();
    this.calcularCantidadDeOfertasMasEconomico();
  }
  actualizarDatosMenorRecorrido() {
    this.calcularCantidadComerciosMenorRecorrido();
    this.calcularCantidadDeOfertasMenorRecorrido();
  }

  calcularCantidadDeOfertasMasEconomico() {
    this.cantidadOfertasMasEconomico =
      this.listaOfertasElegidasMasEconomico.length;
  }

  calcularCantidadDeOfertasMenorRecorrido() {
    this.cantidadOfertasMenorRecorrido = this.aListaSeleccionComercio.length;
  }

  calcularTotalMasEconomico() {
    this.totalMasEconomico = this.listaOfertasElegidasMasEconomico.reduce(
      (total, oferta) => {
        return total + oferta.subtotal;
      },
      0
    );

    // Redondear a 2 decimales
    this.totalMasEconomico = parseFloat(this.totalMasEconomico.toFixed(2));
  }

  calcularTotalListaComercio() {
    this.aListaSeleccionComercio.forEach((oElement) => {
      this.totalListaDeComercio += oElement.subtotal;
    });
    this.totalListaDeComercio = parseFloat(
      this.totalListaDeComercio.toFixed(2)
    );
  }

  calcularCantidadComerciosMasEconomico() {
    const nombresComercios = new Set<string>();

    this.listaOfertasElegidasMasEconomico.forEach((oferta) => {
      nombresComercios.add(oferta.oferta.nombreComercio);
    });

    this.cantidadComerciosMasEconomico = nombresComercios.size;
  }

  calcularCantidadComerciosMenorRecorrido() {
    const nombresComercios = new Set<string>();

    this.aListaSeleccionComercio.forEach((oferta) => {
      nombresComercios.add(oferta.oferta.nombreComercio);
    });

    this.cantidadComerciosMenorRecorrido = nombresComercios.size;
  }

  obtenerRutaMasEconomico() {
    this.rutaComerciosMasEconomico = [];
    const latitud = parseFloat(this.latitudUbicacion.toString());
    const longitud = parseFloat(this.longitudUbicacion.toString());

    const ubicacionOrigen = {
      ubicacion: { lat: latitud, lng: longitud },
      nombre: 'Mi ubicación',
    };

    this.rutaComerciosMasEconomico.push(ubicacionOrigen);
    console.log('estas son las ofertas', this.listaOfertasElegidasMasEconomico);

    for (const oferta of this.listaOfertasElegidasMasEconomico) {
      const ubicacion = {
        lat: oferta.oferta.latitud,
        lng: oferta.oferta.longitud,
      };

      const comercio = {
        ubicacion: ubicacion,
        nombre: oferta.oferta.nombreComercio,
      };

      this.rutaComerciosMasEconomico.push(comercio);
    }

    console.log('comercios principales:', this.rutaComerciosMasEconomico);

    this.mapaService.obtenerRuta(
      this.rutaComerciosMasEconomico,
      this.radioElegido,
      (distancia: string) => {
        this.distanciaMasEconomico = distancia;
      }
    );
  }

  obtenerRutaMenorRecorrido() {
    this.rutaComerciosMenorRecorrido = [];
    const latitud = parseFloat(this.latitudUbicacion.toString());
    const longitud = parseFloat(this.longitudUbicacion.toString());

    const ubicacionOrigen = {
      ubicacion: { lat: latitud, lng: longitud },
      nombre: 'Mi ubicación',
    };

    this.rutaComerciosMenorRecorrido.push(ubicacionOrigen);
    console.log('estas son las ofertas', this.aListaSeleccionComercio);

    for (const oferta of this.aListaSeleccionComercio) {
      const ubicacion = {
        lat: oferta.oferta.latitud,
        lng: oferta.oferta.longitud,
      };

      const comercio = {
        ubicacion: ubicacion,
        nombre: oferta.oferta.nombreComercio,
      };

      this.rutaComerciosMenorRecorrido.push(comercio);
    }

    console.log('comercios principales:', this.rutaComerciosMenorRecorrido);

    this.mapaService.obtenerRuta(
      this.rutaComerciosMenorRecorrido,
      this.radioElegido,
      (distancia: string) => {
        this.distanciaMenorRecorrido = distancia;
      }
    );
  }

  onClickVerListaDeComercio(comercio: any, i: number) {
    this.aListaSeleccionComercio = comercio.ofertas;
    this.isOpenListaSeleccionComercio = true;
    this.activeButton = i;
  }

  groupOffersByCommerceName(offers: Oferta[]): Oferta[][] {
    const groupedOffers: Oferta[][] = [];

    offers.forEach((offer) => {
      const existingGroup = groupedOffers.find(
        (group) =>
          group[0].oferta.nombreComercio === offer.oferta.nombreComercio
      );

      if (existingGroup) {
        existingGroup.push(offer);
      } else {
        groupedOffers.push([offer]);
      }
    });

    return groupedOffers;
  }

  ordenarListas() {
    this.listaOfertasElegidasMasEconomico.sort((a, b) => {
      // Ordenar por idTipoProducto ascendente
      return a.oferta.idTipoProducto - b.oferta.idTipoProducto;
    });

    this.aListaSeleccionComercio.sort((a, b) => {
      // Ordenar por idTipoProducto ascendente
      return a.oferta.idTipoProducto - b.oferta.idTipoProducto;
    });

    console.log('lista economica: ', this.listaOfertasElegidasMasEconomico);
    console.log('lista recorrido: ', this.aListaSeleccionComercio);
  }

  generarResumen() {
    this.mapaService
      .obtenerLinkGps()
      .then((urlRecorrido) => {
        this.urlRecorrido = urlRecorrido;
        // Realizar acciones adicionales con la URL del recorrido
      })
      .catch((error) => {
        console.error('Error al obtener el enlace de GPS:', error);
        // Realizar acciones en caso de error
      });
  }

  compartirLista(lista: any) {
    const mensajeOfertas = lista
      .map((oferta) => {
        return `
        Comercio: ${oferta.oferta.nombreComercio}
        Localidad: ${oferta.oferta.localidad}
        Producto: ${oferta.oferta.nombreProducto}
        Marca: ${oferta.oferta.marca}
        Precio unitario: $${oferta.oferta.precio}
        Unidades: ${oferta.cantidad}
        Subtotal: $${oferta.subtotal}
        --------------------------
    `;
      })
      .join('');

    const mensajeWhatsApp = `¡Hola! Acá tenés tu lista de compras ♥ :
  ${mensajeOfertas}`;

    const enlaceWhatsAppWeb = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;
    window.open(enlaceWhatsAppWeb, '_blank');
  }

  async abrirMapaRecorrido() {
    try {
      const enlaceMapa = await this.mapaService.obtenerLinkGps();
      window.open(enlaceMapa, '_blank');
    } catch (error) {
      console.error('Error al obtener el enlace de GPS:', error);
      // Manejar el error de obtener la URL del mapa de recorrido
    }
  }
  

  guardarLista(lista){
    
  }
}
