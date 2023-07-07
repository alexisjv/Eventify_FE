import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';
import { ProductoCard } from '@core/models/productoCard';
import { CardOfertaComponent } from '@shared/components/card-oferta/card-oferta.component';
import { ProductoLista } from '@core/models/ProductoLista';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

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

  divContenidoListaMenorRecorrido = false;
  divContenidoListaMasEconomico = true;

  mensajeOfertas!: string;
  currentUser!: any;

  masEconomicoActivo: string = "activo";
  menorRecorridoActivo: string = "inactivo";

  constructor(
    private listaCompraService: OptimizadorListaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mapaService: SharedService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    let user = sessionStorage.getItem('currentUser');
    if (user !== null) {
      this.currentUser = JSON.parse(user);
    }

    if(!this.currentUser){
      this.toastr.warning("Podrá visualizar el recorrido del mapa, comparar y guardar sus listas","Inicie sesión");
    }


    this.aListaComercios = [];
    this.aListaSeleccionComercio = [];


   
    this.imagenLista = "mateoMejorOferta"

    this.activatedRoute.queryParams.subscribe((params) => {
      this.cantidadComensales = params['cantidadComensales'];
      this.comidasSeleccionadas = JSON.parse(params['comidas']);
      this.bebidasSeleccionadas = JSON.parse(params['bebidas']);
      this.latitudUbicacion = params['latitud'];
      this.longitudUbicacion = params['longitud'];
      this.radioElegido = params['radio'];
      this.oCantidadesPorProducto = JSON.parse(params['cantidadProductos']);
      this.idEvento = params['idEvento'];

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
          var listaOfertas = oElement.ofertas;
          oElement.total = this.calcularTotalListaComercio(oElement.ofertas);
          this.aListaComercios.push(oElement);
        });
        this.aListaSeleccionComercio = this.aListaComercios[0].ofertas;
        this.totalListaDeComercio = this.aListaComercios[0].total;
        this.cantidadComerciosLista = this.aListaComercios.length;
      });

    this.actualizarDatosMenorRecorrido();
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
    oCantidadesPorProducto: any
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


        this.aListaProductos = response.map((producto) => ({
          ...producto,
          showArrows: false,
        }));
        this.actualizarDatosMasEconomico();
        this.obtenerRutaMasEconomico();
        console.log(this.listaOfertasElegidasMasEconomico)
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
    this.actualizarDatosMasEconomico();
    // Realiza acciones adicionales con la oferta y el índice
  }

  actualizarDatosMasEconomico() {
    this.calcularTotalMasEconomico();
    this.calcularCantidadComerciosMasEconomico();
    this.calcularCantidadDeOfertasMasEconomico();
    this.guardarMensajeOfertas(this.listaOfertasElegidasMasEconomico);
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
    this.guardarMensajeOfertas(this.aListaSeleccionComercio);
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

  calcularTotalListaComercio(aListaComercio: any[]) : any {
    let totalListaDeComercio=0;
    aListaComercio.forEach((oElement) => {
      totalListaDeComercio += oElement.subtotal;
    });

    return totalListaDeComercio = parseFloat(
      totalListaDeComercio.toFixed(2)
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



  onClickVerListaDeComercio(comercio: any, i: number) {
    this.aListaSeleccionComercio = comercio.ofertas;
    this.isOpenListaSeleccionComercio = true;
    this.activeButton = i;
    this.totalListaDeComercio = this.calcularTotalListaComercio(comercio.ofertas);
    this.obtenerRutaMenorRecorrido();
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

  guardarMensajeOfertas(lista: any){
    this.mensajeOfertas = lista
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
  }

  compartirLista() {
    const mensajeWhatsApp = `¡Hola! Acá tenés tu lista de compras ♥ :
  ${this.mensajeOfertas}`;

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
  

  guardarLista(lista: Oferta[], distancia: string) {

    let user = sessionStorage.getItem('currentUser');
    if (user !== null) {
      this.currentUser = JSON.parse(user);
    }

    const body = {
      idUsuario: this.currentUser.id,
      idEvento: this.idEvento,
      idBebidas: this.bebidasSeleccionadas,
      idComidas: this.comidasSeleccionadas,
      cantidadOfertas: lista.length,
      total: 0,
      urlRecorrido: this.urlRecorrido,
      mensajeOfertas:this.mensajeOfertas,
      distanciaARecorrer: parseFloat(distancia),
      ofertas: lista.map((oferta) => ({
        nombreProducto: oferta.oferta.nombreProducto,
        idPublicacion: oferta.oferta.idPublicacion,
        precio: oferta.oferta.precio,
        cantidad: oferta.cantidad,
        subtotal: oferta.subtotal
      }))
    };
  
    this.listaCompraService.guardarLista(body);
    
    this.router.navigate(['perfil-usuario']);
    this.toastr.success("Puedes visualizar el detalle de tu lista en tu perfil","Lista guardada")

  }
  



  obtenerRuta(rutaComercios, latitud, longitud, distanciaVariable, distanciaCallback) {
    rutaComercios = [];
    const ubicacionOrigen = {
      ubicacion: { lat: latitud, lng: longitud },
      nombre: 'Mi ubicación',
    };
  
    rutaComercios.push(ubicacionOrigen);
  
    for (const oferta of distanciaVariable) {
      const ubicacion = {
        lat: oferta.oferta.latitud,
        lng: oferta.oferta.longitud,
      };
  
      const comercio = {
        ubicacion: ubicacion,
        nombre: oferta.oferta.nombreComercio,
      };
  
      rutaComercios.push(comercio);
    }
  
  
    this.mapaService.obtenerRuta(rutaComercios, this.radioElegido, (distancia) => {
      distanciaCallback(distancia);
    });
  }
  
  obtenerRutaMasEconomico() {
    this.obtenerRuta(
      this.rutaComerciosMasEconomico,
      parseFloat(this.latitudUbicacion.toString()),
      parseFloat(this.longitudUbicacion.toString()),
      this.listaOfertasElegidasMasEconomico,
      (distancia) => {
        this.distanciaMasEconomico = distancia;
      }
    );
  }
  
  obtenerRutaMenorRecorrido() {
    this.obtenerRuta(
      this.rutaComerciosMenorRecorrido,
      parseFloat(this.latitudUbicacion.toString()),
      parseFloat(this.longitudUbicacion.toString()),
      this.aListaSeleccionComercio,
      (distancia) => {
        this.distanciaMenorRecorrido = distancia;
      }
    );
  }

  
  cambiarALista(vistaListaMasEconomica, vistaListaMenorRecorrido, classListaActiva, classListaInactiva) {
    this.vistaListaMasEconomica = vistaListaMasEconomica;
    this.vistaListaMenorRecorrido = vistaListaMenorRecorrido;
  
    const listaActiva = document.querySelector(classListaActiva);
    const listaInactiva = document.querySelector(classListaInactiva);
  
    listaActiva?.classList.add('activo');
    listaInactiva?.classList.remove('activo');
  }
  
  cambiarAListaMasEconomico() {
    this.cambiarALista(true, false, '.div-mas-economico', '.div-menor-recorrido');
  }
  
  cambiarAListaMenorRecorrido() {
    this.cambiarALista(false, true, '.div-menor-recorrido', '.div-mas-economico');
  }

  mostrarContenidoMasEconomico(){
    this.masEconomicoActivo = 'activo';
    this.menorRecorridoActivo = 'inactivo';
    this.divContenidoListaMasEconomico = true;
    this.divContenidoListaMenorRecorrido = false;
    this.listaElegidaMasEconomico = true;
    this.listaElegidaMenorRecorrido = false;
    this.actualizarDatosMasEconomico();
    this.obtenerRutaMasEconomico();
    this.imagenLista = 'mateoMejorOferta';
    this.toastr.info("Ha cambiado a lista más económica","Lista seleccionada")
  }
  mostrarContenidoMenorRecorrdio(){
    this.masEconomicoActivo = 'inactivo';
    this.menorRecorridoActivo = 'activo';
    this.divContenidoListaMasEconomico = false;
    this.divContenidoListaMenorRecorrido = true;
    this.listaElegidaMasEconomico = false;
    this.listaElegidaMenorRecorrido = true;
    this.actualizarDatosMenorRecorrido();
    this.obtenerRutaMenorRecorrido();
    this.imagenLista = 'mateoMejorRecorrido';
    this.toastr.info("Ha cambiado a lista menor recorrido", "Lista seleccionada")
  }

  getCurrentUrl(): string {
    return window.location.href;
  }
}
