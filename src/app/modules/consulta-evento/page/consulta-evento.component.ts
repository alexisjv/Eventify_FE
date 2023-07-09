import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comidas } from 'src/app/core/models/comidas';
import { Bebidas } from 'src/app/core/models/bebidas';
import { Evento } from 'src/app/core/models/evento';
import { ProductoLista } from '@core/models/ProductoLista';
import { ConsultaEventoService } from '../services/consulta-evento.service';
import { MapType } from '@angular/compiler';
import { FormRecord } from '@angular/forms';
import { SharedService } from '@shared/services/shared.service';
import { PersonajeEvento } from '@core/enums/PersonajeEvento.enum';
import { EventoTipo } from '@core/enums/Evento.enum';
import { Medida } from '@core/enums/Medida.enum';
import { Color } from '@core/enums/Color.enum';
import { Ruta } from '@core/enums/Ruta.enum';


@Component({
  selector: 'app-consulta-evento',
  templateUrl: './consulta-evento.component.html',
  styleUrls: ['./consulta-evento.component.scss'],


})
export class ConsultaEventoComponent {
  oSelecciones: {
    idEventoSeleccionado: number
    aComidasSeleccionadas: any[],
    aBebidasSeleccionadas: any[],
    nCantidadComensales: number
  } = {
      idEventoSeleccionado: 0,
      aComidasSeleccionadas: [],
      aBebidasSeleccionadas: [],
      nCantidadComensales: 2
    };
  aListaEventos!: Evento[];
  bMostrarOpcionSeleccionada: boolean = false;
  aTiposDeComidas!: Comidas[];
  aTiposDeBebidas!: Bebidas[];
  bMostrarPreguntaQueTipoDeEvento: boolean = true;
  bMostrarPreguntaQueTipoDeComida: boolean = false;
  bMostrarPreguntaQueTipoDeBebida: boolean = false;
  bMostrarPreguntaCantidadComensales: boolean = false;
  bMostrarPreguntaUbicacion: boolean = false;
  bMostrarListaDeProductos: boolean = false;
  sImg: string = PersonajeEvento.Inicio;
  bMostrarQueCompraQueresRealizar: boolean = true;
  aListaDeCompras!: ProductoLista[];
  bMostrarLoading: boolean = false;
  bIsOpened = false;
  cButton;
  oMapCantidadesProductos = new Map<string, number>;

  bMostrarKg: boolean = false;
  bMostrarLt: boolean = false;
  valorRadio: number = 5000;
  latitudUbicacion!: number;
  longitudUbicacion!: number;
  idEvento!: number;
  aListaDeComprasParaPost!: ProductoLista[];
  aListaDeComprasParaMostrar!: ProductoLista[];

  //se agrega la clase active con estas variables
  isActiveEvento= true;
  isActiveComida=false;
  isActiveBebida=false;
  isActiveInvitados=false;
  isActivePreguntaUbicacion=false;
  isButtonDisabledContinuar= true;

  constructor(private router: Router, private consultaEventoService: ConsultaEventoService, private mapaService: SharedService) { }

  ngOnInit(): void {

    this.getListaEventos();
 
  }


  getListaEventos() {
    this.consultaEventoService.getListaEventos().subscribe(
      (listaEventos: Evento[]) => {
        this.aListaEventos = listaEventos;
      },
      (error) => console.error(error)
    );
  }

  getTiposDeComidas(idEvento: number) {
    this.consultaEventoService.getListaTiposDeComidas(idEvento).subscribe(
      (listaComidas: Comidas[]) => {
        this.aTiposDeComidas = listaComidas;
      },
      (error) => console.error(error)
    );
  }

  mostrarTiposDeComida(idEvento: number) {
    this.idEvento = idEvento;
    this.oSelecciones.idEventoSeleccionado = idEvento;
    this.getTiposDeComidas(idEvento);

    if (idEvento === EventoTipo.Cumpleaños) {
      this.sImg = PersonajeEvento.Cumpleaños;
    }
    if (idEvento === EventoTipo.Parrilla) {
      this.sImg = PersonajeEvento.Parrilla;
    }

    this.bMostrarPreguntaQueTipoDeEvento = false;
    this.bMostrarPreguntaQueTipoDeComida = true;
    this.isActiveComida=true;


  }

  onSeleccionComida(idComida) {
    this.cButton = document.getElementById("btn-check" + idComida);
    if (this.cButton.style.backgroundColor === Color.naranja) {
      this.cButton.style.backgroundColor = Color.azul;
      var index = this.oSelecciones.aComidasSeleccionadas.indexOf(idComida);
      this.oSelecciones.aComidasSeleccionadas.splice(index, 1);
      if(this.oSelecciones.aComidasSeleccionadas.length === 0){
        this.deshabilitarBotonContinuar();
      }

    } else {
      this.cButton.style.backgroundColor = Color.naranja;
      this.oSelecciones.aComidasSeleccionadas.push(idComida);
      this.habilitarBotonContinuar();
    }
  }

  getTiposDeBebidas() {
    this.consultaEventoService
      .getListaBebidas(this.oSelecciones.idEventoSeleccionado)
      .subscribe(
        (listaBebidas: Bebidas[]) => {
          this.aTiposDeBebidas = listaBebidas;
        },
        (error) => console.error(error)
      );
  }

  mostrarTiposDeBebida() {
    this.getTiposDeBebidas();
    this.bMostrarPreguntaQueTipoDeComida = false;
    this.bMostrarPreguntaQueTipoDeBebida = true;
    this.isActiveBebida=true;
    this.deshabilitarBotonContinuar();
  }

  onSeleccionBebida(idBebida) {
    this.cButton = document.getElementById("btn-checkBebida" + idBebida);
    if (this.cButton.style.backgroundColor === Color.naranja) {
      this.cButton.style.backgroundColor = Color.azul;
      var index = this.oSelecciones.aBebidasSeleccionadas.indexOf(idBebida);
      this.oSelecciones.aBebidasSeleccionadas.splice(index, 1);
      if(this.oSelecciones.aBebidasSeleccionadas.length === 0 ){
        this.deshabilitarBotonContinuar();
      }
    } else {
      this.cButton.style.backgroundColor =Color.naranja;
      this.oSelecciones.aBebidasSeleccionadas.push(idBebida);
      this.habilitarBotonContinuar();
    }
  }

  mostrarPreguntaCantidadPersonas() {
    this.bMostrarPreguntaQueTipoDeBebida = false;
    this.bMostrarPreguntaCantidadComensales = true;
    this.isActiveInvitados= true;
   
  }

  getListadoDeCompras() {
    var oSelecciones = {
      idComidas: this.oSelecciones.aComidasSeleccionadas,
      idBebidas: this.oSelecciones.aBebidasSeleccionadas
    }
    this.consultaEventoService.getListadeCompras(this.oSelecciones.nCantidadComensales, oSelecciones)
      .subscribe(
        (listaCompras: ProductoLista[]) => {
          this.aListaDeComprasParaPost = listaCompras;
          this.aListaDeCompras = [];
          this.asignarUnidadesOPeso(listaCompras);
          this.bMostrarLoading = false;
         
        },
        (error) => console.error(error)
      );
  }


  asignarUnidadesOPeso(listaCompras: ProductoLista[]){
    listaCompras.forEach(oProducto => {
      if(!this.tieneUnidades(oProducto)){
      if (oProducto.ingrediente) {
        if(this.elPesoEsMayorA1kg(oProducto)){
          oProducto.peso = oProducto.peso / 1000;
          oProducto.medida = Medida.Kilos;
          this.bMostrarKg = true;
        }else{
          
          oProducto.medida = Medida.Gramos;
          this.bMostrarKg = true;
        }
        
      } else {
        oProducto.medida = Medida.Litros;
        oProducto.unidades = oProducto.peso / 1000;
        oProducto.peso = oProducto.peso / 1000;
        this.bMostrarLt = true;
      }
    }else{
      oProducto.seManejaPorUnidades = true;
      oProducto.medida = Medida.Unidades
    }
      this.aListaDeCompras.push(oProducto)
    });
    this.obtenerProductosConSusCantidades(this.aListaDeCompras);
  }

  capturarValorRadio(valorRadio: number) {
    this.valorRadio = valorRadio;
  }
  
  capturarLatitud(latitud: number) {
   this.latitudUbicacion = latitud;
  }
  
  capturarLongitud(longitud: number) {
    this.longitudUbicacion = longitud;
  }

  mostrarMapaRadio(){
    this.bMostrarPreguntaCantidadComensales = false;
    this.bMostrarPreguntaUbicacion = true;
    this.isActivePreguntaUbicacion=true;
  }

  onComensalesChange(event){
    debugger;
    const inputValue = (event.target as HTMLInputElement).value;
      const inputLength = inputValue.length;
  
      if (inputValue == '' && inputLength < 1) {
        this.deshabilitarBotonContinuar();
      } else {
        this.habilitarBotonContinuar();
      }

  }
  
  consultar(): void {
    this.bMostrarListaDeProductos = true;
    this.bMostrarLoading = true;
    this.bMostrarOpcionSeleccionada = false;
    this.bMostrarQueCompraQueresRealizar = false;
    this.bMostrarPreguntaUbicacion = false;
    this.getListadoDeCompras();
  }

  verOfertas() {
    this.oMapCantidadesProductos= new Map<string, number>;
    this.obtenerProductosConSusCantidadesParaPost(this.aListaDeComprasParaPost);
    
    const oCantidadesPorProducto = Object.fromEntries(this.oMapCantidadesProductos);
    const queryParams = {
      cantidadComensales: this.oSelecciones.nCantidadComensales,
      comidas: JSON.stringify(this.oSelecciones.aComidasSeleccionadas),
      bebidas: JSON.stringify(this.oSelecciones.aBebidasSeleccionadas),
      radio: this.valorRadio,
      latitud: this.latitudUbicacion,
      longitud: this.longitudUbicacion,
      cantidadProductos:JSON.stringify(oCantidadesPorProducto, null, 2),
      idEvento: this.idEvento
    };

    this.router.navigate([Ruta.OptimizadorLista], { queryParams });
  }
  obtenerProductosConSusCantidadesParaPost(aListaDeComprasParaPost: ProductoLista[]) {
    aListaDeComprasParaPost.forEach(oProducto => {
      if(oProducto.medida === Medida.Unidades){
        this.oMapCantidadesProductos.set(oProducto.nombre , oProducto.unidades);
      }else{
          if(oProducto.medida === Medida.Kilos || oProducto.medida === Medida.Litros ){
            this.oMapCantidadesProductos.set(oProducto.nombre ,oProducto.peso*1000);
          }else{
            this.oMapCantidadesProductos.set(oProducto.nombre ,oProducto.peso);
          }
      }
    });
  }

  obtenerProductosConSusCantidades(listaCompras: ProductoLista[]) {
    listaCompras.forEach(oProducto => {
      if(this.tieneUnidades(oProducto)){
        this.oMapCantidadesProductos.set(oProducto.nombre , oProducto.unidades);
      }else{
        this.oMapCantidadesProductos.set(oProducto.nombre ,oProducto.peso);
      }
    });
  }

  volverAEvento(){
    this.sImg = PersonajeEvento.Inicio;
    this.oSelecciones.idEventoSeleccionado= 0;
    this.oSelecciones.aComidasSeleccionadas=[];
    this.bMostrarPreguntaQueTipoDeComida=false;
    this.bMostrarPreguntaQueTipoDeEvento = true;
    this.isActiveComida=false;
  }
  volverATipoDeComida(){
    this.oSelecciones.aBebidasSeleccionadas=[];
    this.bMostrarPreguntaQueTipoDeBebida=false;
    this.bMostrarPreguntaQueTipoDeComida=true;
    this.isActiveBebida=false;
  }
  volverATipoBebida(){
    this.oSelecciones.nCantidadComensales=2;
    this.bMostrarPreguntaQueTipoDeBebida=true;
    this.bMostrarPreguntaCantidadComensales=false;
    this.isActiveInvitados=false;
  }
  volverAPregCantidadComensales(){
    this.bMostrarPreguntaUbicacion=false;
    this.bMostrarPreguntaCantidadComensales=true;
    this.isActivePreguntaUbicacion=false;
  }


  private habilitarBotonContinuar(){
    this.isButtonDisabledContinuar = false;
  }

  private deshabilitarBotonContinuar() {
    this.isButtonDisabledContinuar = true;
  }

  private tieneUnidades(oProducto: ProductoLista) {
    return oProducto.unidades !== 0;
  }

  private elPesoEsMayorA1kg(oProducto: ProductoLista) {
    return oProducto.peso > 1000;
  }

}




