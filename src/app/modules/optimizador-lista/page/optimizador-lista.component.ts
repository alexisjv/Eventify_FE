import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';
import { ProductoCard } from '@core/models/productoCard';
import { CardOfertaComponent } from '@shared/components/card-oferta/card-oferta.component';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';

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
  aListaProductos: ProductoCard[] = [];
  urlRecorrido: string = '';
  aListaComercios: any[] = [];
  aListaSeleccionComercio: any[] = [];
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
  cantidadComerciosLista: number = 0;
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

  masEconomicoActivo: string = 'activo';
  menorRecorridoActivo: string = 'inactivo';

  productoElegidoParaEditar: ProductoCard = {
    nombreProducto: '',
    ofertas: [],
    showArrows: false,
    total: 0,
  };

  ofertasProductoElegidoParaEditar: Oferta[] = [];
  quiereEliminar: boolean = false;
  idProductoAEliminar!: number;
  cargando: boolean = true;

  constructor(
    private listaCompraService: OptimizadorListaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mapaService: SharedService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    
    let user = sessionStorage.getItem('currentUser');
    if (user !== null) {
      this.currentUser = JSON.parse(user);
    }

    if (!this.currentUser) {
       
    setTimeout(() => {
     
      this.toastr.warning(
        'Podrá comparar y guardar sus listas',
        'Inicie sesión'
      );
    }, 5000);
    }

    this.aListaComercios = [];
    this.aListaSeleccionComercio = [];

    this.imagenLista = 'mateoMejorOferta';

    this.activatedRoute.queryParams.subscribe((params) => {
      this.cantidadComensales = params['cantidadComensales'];
      this.comidasSeleccionadas = JSON.parse(params['comidas']);
      this.bebidasSeleccionadas = JSON.parse(params['bebidas']);
      this.latitudUbicacion = params['latitud'];
      this.longitudUbicacion = params['longitud'];
      this.radioElegido = params['radio'];
      this.oCantidadesPorProducto = JSON.parse(params['cantidadProductos']);
      this.idEvento = params['idEvento'];

      
      this.obtenerOfertasPorComercio(
        this.latitudUbicacion,
        this.longitudUbicacion,
        this.cantidadComensales,
        this.comidasSeleccionadas,
        this.bebidasSeleccionadas,
        this.radioElegido,
        this.oCantidadesPorProducto
      );
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

    setTimeout(() => {
      this.actualizarDatosAmbosEscenarios();
  }, 1000);
    
      
    setTimeout(() => {
      this.cargando = false;
    }, 5000);


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
        
        this.actualizarDatosMenorRecorrido();
        this.obtenerRutaMenorRecorrido();
  
        if (this.aListaComercios.length) {
          this.cantidadComerciosLista = 1;
        }
      });

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
                fechaVencimiento: primeraOferta.fechaVencimiento,
              },
            };

            this.listaOfertasElegidasMasEconomico.push(oferta);
          }
        }

        this.aListaProductos = response.map((producto) => ({
          ...producto,
          showArrows: false,
        }));
        console.log('Lista elegida', this.listaOfertasElegidasMasEconomico);
        console.log('Lista alistaproductos', this.aListaProductos);
      },
      (error) => {
        console.error('Error al obtener las ofertas:', error);
      }
    );

    console.log(this.aListaProductos);
  }

  toggleArrows(index: number) {
    this.aListaProductos[index].showArrows =
      !this.aListaProductos[index].showArrows;
  }

  cambiarMarca(data: { idProducto: number; marca: string }): void {
    const idTipoProducto = this.obtenerIdTipoProducto(data.idProducto);
    const marca = data.marca;

    const productoExistenteIndex =
      this.listaOfertasElegidasMasEconomico.findIndex(
        (o) =>
          o.oferta.idTipoProducto === idTipoProducto && o.oferta.marca === marca
      );

    if (productoExistenteIndex !== -1) {
      console.log(
        'El producto con la misma marca ya existe en la lista. No se realiza ninguna modificación.'
      );
      return;
    }

    const productoDiferenteIndex =
      this.listaOfertasElegidasMasEconomico.findIndex(
        (o) =>
          o.oferta.idTipoProducto === idTipoProducto && o.oferta.marca !== marca
      );

    if (productoDiferenteIndex !== -1) {
      const ofertaConMarca = this.obtenerOfertaConMarca(idTipoProducto, marca);

      if (!ofertaConMarca) {
        console.log(
          'No se encontró una oferta con la marca especificada en ofertasProductoElegidoParaEditar'
        );
        return;
      }

      this.reemplazarOferta(productoDiferenteIndex, ofertaConMarca);
      this.moverOfertaAlPrimerLugar(ofertaConMarca);

      const ofertaIndex = this.obtenerOfertaIndex(idTipoProducto);

      if (ofertaIndex !== -1) {
        this.actualizarOfertaEnListaProductos(ofertaIndex);
        console.log('Oferta reemplazada en listaOfertasElegidasMasEconomico');

        // Actualizar cantidad en aListaSeleccionComercio
        this.actualizarCantidadOfertaMenorRecorrido(
          idTipoProducto,
          ofertaConMarca.cantidad
        );

        // Actualizar cantidad en listaElegidaMasEconomico
        this.actualizarCantidadOfertaMasEconomica(
          idTipoProducto,
          ofertaConMarca.cantidad
        );
      } else {
        console.log(
          'No se encontró una oferta con la marca especificada en ofertasProductoElegidoParaEditar'
        );
      }
    }

    console.log(
      'lista ofertaselegidas post cambio de marca: ',
      this.listaOfertasElegidasMasEconomico
    );
    console.log(
      'lista alistaproductos post cambio de marca: ',
      this.aListaProductos
    );
  }

  actualizarCantidadOfertaMasEconomica(
    idTipoProducto: number,
    cantidad: number
  ) {
    this.listaOfertasElegidasMasEconomico.forEach((oferta) => {
      if (oferta.oferta.idTipoProducto === idTipoProducto) {
        oferta.cantidad = cantidad;
        oferta.subtotal = parseFloat((oferta.oferta.precio * cantidad).toFixed(2));
      }
    });
    this.totalMasEconomico = this.calcularTotalListaComercio(
      this.listaOfertasElegidasMasEconomico
    );
  }

  obtenerIdTipoProducto(idTipoProducto: number): number {
    const oferta = this.ofertasProductoElegidoParaEditar.find(
      (o) => o.oferta?.idTipoProducto === idTipoProducto
    );
    return oferta?.oferta?.idTipoProducto || -1;
  }

  actualizarCantidadOfertaMenorRecorrido(
    idTipoProducto: number,
    cantidad: number
  ) {
    this.aListaSeleccionComercio.forEach((oferta) => {
      if (oferta.oferta.idTipoProducto === idTipoProducto) {
        oferta.cantidad = cantidad;
        oferta.subtotal = parseFloat((oferta.oferta.precio * cantidad).toFixed(2));
      }
    });
    this.totalListaDeComercio = this.calcularTotalListaComercio(
      this.aListaSeleccionComercio
    );
  }

  cambiarCantidad(data: {
    idProducto: number;
    marca: string;
    cantidad: number;
    subtotal: number;
  }): void {
    const idTipoProducto = data.idProducto;
    const cantidad = data.cantidad;
  
    // Actualizar la cantidad en ofertasProductoElegidoParaEditar
    this.ofertasProductoElegidoParaEditar.forEach((oferta) => {
      if (oferta.oferta?.idTipoProducto === idTipoProducto) {
        oferta.cantidad = cantidad;
        oferta.subtotal = parseFloat((oferta.oferta.precio * cantidad).toFixed(2));
      }
    });
  
    // Actualizar la cantidad en listaOfertasElegidasMasEconomico
    this.listaOfertasElegidasMasEconomico.forEach((oferta) => {
      if (oferta.oferta?.idTipoProducto === idTipoProducto) {
        oferta.cantidad = cantidad;
        oferta.subtotal = parseFloat((oferta.oferta.precio * cantidad).toFixed(2));
      }
    });
  
    // Actualizar la cantidad en aListaComercios
    this.aListaComercios.forEach((comercio) => {
      comercio.ofertas.forEach((oferta) => {
        if (oferta.oferta?.idTipoProducto === idTipoProducto) {
          oferta.cantidad = cantidad;
          oferta.subtotal = parseFloat((oferta.oferta.precio * cantidad).toFixed(2));
        }
      });
      comercio.total = this.calcularTotalListaComercio(comercio.ofertas);
    });
  
    // Actualizar la lista de selección de comercio si es necesario
    if (this.isOpenListaSeleccionComercio) {
      const comercioIndex = this.aListaComercios.findIndex(
        (comercio) => comercio.ofertas === this.aListaSeleccionComercio
      );
  
      if (comercioIndex !== -1) {
        this.aListaSeleccionComercio =
          this.aListaComercios[comercioIndex].ofertas;
        this.totalListaDeComercio = this.aListaComercios[comercioIndex].total;
      }
    }
  
    // Actualizar la cantidad en aListaSeleccionComercio
    this.actualizarCantidadOfertaMenorRecorrido(idTipoProducto, cantidad);
  }
  
  

  eliminarOferta(idProducto: number): void {

    const ofertaIndex = this.aListaProductos.findIndex(
      (producto) => producto.ofertas[0].oferta?.idTipoProducto === idProducto
    );
    const listaIndex = this.listaOfertasElegidasMasEconomico.findIndex(
      (o) => o.oferta?.idTipoProducto === idProducto
    );

    if (ofertaIndex !== -1 && listaIndex !== -1) {
      this.aListaProductos.splice(ofertaIndex, 1);
      this.listaOfertasElegidasMasEconomico.splice(listaIndex, 1);

      // Actualizar productos en aListaComercios
      this.aListaComercios.forEach((comercio) => {
        const ofertaIndex = comercio.ofertas.findIndex(
          (oferta) => oferta.oferta?.idTipoProducto === idProducto
        );

        if (ofertaIndex !== -1) {
          comercio.ofertas.splice(ofertaIndex, 1);
          comercio.total = this.calcularTotalListaComercio(comercio.ofertas);
        }
      });

      // Actualizar la lista de selección de comercio si es necesario
      if (this.isOpenListaSeleccionComercio) {
        const comercioIndex = this.aListaComercios.findIndex(
          (comercio) => comercio.ofertas === this.aListaSeleccionComercio
        );

        if (comercioIndex !== -1) {
          this.aListaSeleccionComercio =
            this.aListaComercios[comercioIndex].ofertas;
          this.totalListaDeComercio = this.aListaComercios[comercioIndex].total;
        }
      }

      console.log(
        'Oferta eliminada de aListaProductos y listaOfertasElegidasMasEconomico'
      );

      // Eliminar oferta de aListaSeleccionComercio
      this.eliminarOfertaDeAListaSeleccionComercio(idProducto);
      console.log('Oferta eliminada de aListaSeleccionComercio');
    } else {
      console.log('No se encontró la oferta');
    }
    
    this.quiereEliminar = false;
    this.toastr.success(
      'Oferta eliminada'
    );
  }

  eliminarOfertaConfirmar(idProducto: number){
    this.quiereEliminar = true;
    this.idProductoAEliminar = idProducto;
  }

  cancelarEliminarOferta(){
    this.quiereEliminar = false;
  }

  eliminarOfertaDeAListaSeleccionComercio(idProducto: number): void {
    const ofertaIndex = this.aListaSeleccionComercio.findIndex(
      (oferta) => oferta.oferta.idTipoProducto === idProducto
    );

    if (ofertaIndex !== -1) {
      this.aListaSeleccionComercio.splice(ofertaIndex, 1);
    }
  }

  obtenerOfertaConMarca(idProducto: number, marca: string): Oferta | undefined {
    return this.ofertasProductoElegidoParaEditar.find(
      (o) =>
        o.oferta?.idTipoProducto === idProducto && o.oferta?.marca === marca
    );
  }

  reemplazarOferta(index: number, oferta: Oferta): void {
    this.listaOfertasElegidasMasEconomico.splice(index, 1, oferta);
  }

  moverOfertaAlPrimerLugar(oferta: Oferta): void {
    const ofertaIndex = this.ofertasProductoElegidoParaEditar.findIndex(
      (o) =>
        o.oferta?.idTipoProducto === oferta.oferta?.idTipoProducto &&
        o.oferta?.marca === oferta.oferta?.marca
    );

    if (ofertaIndex !== -1) {
      const ofertaSeleccionada = this.ofertasProductoElegidoParaEditar.splice(
        ofertaIndex,
        1
      );
      this.ofertasProductoElegidoParaEditar.unshift(ofertaSeleccionada[0]);
      console.log(
        'Oferta movida al primer lugar en ofertasProductoElegidoParaEditar'
      );
    } else {
      console.log(
        'No se encontró la oferta con la marca especificada en ofertasProductoElegidoParaEditar'
      );
    }
  }

  obtenerOfertaIndex(idProducto: number): number {
    return this.aListaProductos.findIndex((producto) =>
      producto.ofertas.some(
        (oferta) => oferta.oferta?.idTipoProducto === idProducto
      )
    );
  }

  actualizarOfertaEnListaProductos(index: number): void {
    const ofertaModificada = {
      nombreProducto: this.aListaProductos[index].nombreProducto,
      ofertas: this.ofertasProductoElegidoParaEditar,
      showArrows: this.aListaProductos[index].showArrows,
      total: this.aListaProductos[index].total,
    };

    this.aListaProductos[index] = ofertaModificada;
  }

  actualizarDatosMasEconomico() {
    this.calcularTotalMasEconomico();
    this.calcularCantidadComerciosMasEconomico();
    this.calcularCantidadDeOfertasMasEconomico();
    if (this.divContenidoListaMasEconomico) {
      this.guardarMensajeOfertas(this.listaOfertasElegidasMasEconomico);
    }
  }

  cambiarMarcaNuevo(index: number) {
    this.mostrarBoton = !this.mostrarBoton;
    this.listaOfertasElegidasMasEconomico;
    // const index = data.index;
    this.toggleArrows(index);
  }

  actualizarDatosAmbosEscenarios() {
    this.actualizarDatosMasEconomico();
    this.actualizarDatosMenorRecorrido();

    if (this.divContenidoListaMasEconomico) {
      this.obtenerRutaMasEconomico();
    } else {
      this.obtenerRutaMenorRecorrido();
    }
  }

  actualizarDatosMenorRecorrido() {
    this.calcularCantidadComerciosMenorRecorrido();
    this.calcularCantidadDeOfertasMenorRecorrido();
    if (this.divContenidoListaMenorRecorrido) {
      this.guardarMensajeOfertas(this.aListaSeleccionComercio);
    }
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

  calcularTotalListaComercio(aListaComercio: any[]): any {
    let totalListaDeComercio = 0;
    aListaComercio.forEach((oElement) => {
      totalListaDeComercio += oElement.subtotal;
    });

    return (totalListaDeComercio = parseFloat(totalListaDeComercio.toFixed(2)));
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
    this.totalListaDeComercio = this.calcularTotalListaComercio(
      comercio.ofertas
    );
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

  guardarMensajeOfertas(lista: any) {
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
    if (this.listaElegidaMasEconomico) {
      this.actualizarDatosMasEconomico();
    } else {
      this.actualizarDatosMenorRecorrido();
    }

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
      mensajeOfertas: this.mensajeOfertas,
      distanciaARecorrer: parseFloat(distancia),
      ofertas: lista.map((oferta) => ({
        nombreProducto: oferta.oferta.nombreProducto,
        idPublicacion: oferta.oferta.idPublicacion,
        precio: oferta.oferta.precio,
        cantidad: oferta.cantidad,
        subtotal: oferta.subtotal,
      })),
    };

    this.listaCompraService.guardarLista(body);

    this.router.navigate(['perfil-usuario']);
    this.toastr.success(
      'Puedes visualizar el detalle de tu lista en tu perfil',
      'Lista guardada'
    );
  }

  obtenerRuta(
    rutaComercios,
    latitud,
    longitud,
    distanciaVariable,
    distanciaCallback
  ) {
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

    this.mapaService.obtenerRuta(
      rutaComercios,
      this.radioElegido,
      (distancia) => {
        distanciaCallback(distancia);
      }
    );
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

  cambiarALista(
    vistaListaMasEconomica,
    vistaListaMenorRecorrido,
    classListaActiva,
    classListaInactiva
  ) {
    this.vistaListaMasEconomica = vistaListaMasEconomica;
    this.vistaListaMenorRecorrido = vistaListaMenorRecorrido;

    const listaActiva = document.querySelector(classListaActiva);
    const listaInactiva = document.querySelector(classListaInactiva);

    listaActiva?.classList.add('activo');
    listaInactiva?.classList.remove('activo');
  }

  cambiarAListaMasEconomico() {
    this.cambiarALista(
      true,
      false,
      '.div-mas-economico',
      '.div-menor-recorrido'
    );
  }

  cambiarAListaMenorRecorrido() {
    this.cambiarALista(
      false,
      true,
      '.div-menor-recorrido',
      '.div-mas-economico'
    );
  }

  mostrarContenidoMasEconomico() {
    this.masEconomicoActivo = 'activo';
    this.menorRecorridoActivo = 'inactivo';
    this.divContenidoListaMasEconomico = true;
    this.divContenidoListaMenorRecorrido = false;
    this.listaElegidaMasEconomico = true;
    this.listaElegidaMenorRecorrido = false;
    this.actualizarDatosMasEconomico();
    this.obtenerRutaMasEconomico();
    this.imagenLista = 'mateoMejorOferta';
    this.toastr.info('Ha cambiado a lista más económica', 'Lista seleccionada');
  }
  mostrarContenidoMenorRecorrdio() {
    this.masEconomicoActivo = 'inactivo';
    this.menorRecorridoActivo = 'activo';
    this.divContenidoListaMasEconomico = false;
    this.divContenidoListaMenorRecorrido = true;
    this.listaElegidaMasEconomico = false;
    this.listaElegidaMenorRecorrido = true;
    this.actualizarDatosMenorRecorrido();
    this.obtenerRutaMenorRecorrido();
    this.imagenLista = 'mateoMejorRecorrido';
    this.toastr.info(
      'Ha cambiado a lista menor recorrido',
      'Lista seleccionada'
    );
  }

  getCurrentUrl(): string {
    return window.location.href;
  }

  abrirModalConOfertas(producto: ProductoCard) {
    // Asigna el producto seleccionado a una variable en el componente para mostrarlo en el modal
    this.productoElegidoParaEditar = producto;
    this.ofertasProductoElegidoParaEditar = producto.ofertas;

    console.log('Las marcas para cambiar son: ', producto);

    // Abre el modal correspondiente
    const modal = document.getElementById('modalEditar');
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  }
}
