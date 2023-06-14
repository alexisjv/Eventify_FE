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
      nCantidadComensales: 0
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
  sImg: string = 'assets/images/asistente.png';
  bMostrarQueCompraQueresRealizar: boolean = true;
  aListaDeCompras!: ProductoLista[];
  bMostrarLoading: boolean = false;
  bIsOpened = false;
  cButton;
  oMapCantidadesProductos = new Map<string, number>;

  bMostrarKg: boolean = false;
  bMostrarLt: boolean = false;
  valorRadio!: number;
  latitudUbicacion!: number;
  longitudUbicacion!: number;
  idEvento!: number;
  aListaDeComprasParaPost!: ProductoLista[];
  aListaDeComprasParaMostrar!: ProductoLista[];


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

    if (idEvento === 1) {
      this.sImg = 'assets/images/asistente-cumpleaños.gif';
    }
    if (idEvento === 2) {
      this.sImg = 'assets/images/asistente-parrilla.gif';
    }

    this.bMostrarPreguntaQueTipoDeEvento = false;
    this.bMostrarPreguntaQueTipoDeComida = true;
  }

  onSeleccionComida(idComida) {
    this.cButton = document.getElementById("btn-check" + idComida);
    if (this.cButton.style.backgroundColor === "rgb(242, 48, 48)") {
      this.cButton.style.backgroundColor = 'rgb(64, 64, 64)';
      var index = this.oSelecciones.aComidasSeleccionadas.indexOf(idComida);
      this.oSelecciones.aComidasSeleccionadas.splice(index, 1);
    } else {
      this.cButton.style.backgroundColor = "rgb(242, 48, 48)"
      this.oSelecciones.aComidasSeleccionadas.push(idComida);
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
  }

  onSeleccionBebida(idBebida) {
    this.cButton = document.getElementById("btn-checkBebida" + idBebida);
    if (this.cButton.style.backgroundColor === "rgb(242, 48, 48)") {
      this.cButton.style.backgroundColor = 'rgb(64, 64, 64)';
      var index = this.oSelecciones.aBebidasSeleccionadas.indexOf(idBebida);
      this.oSelecciones.aBebidasSeleccionadas.splice(index, 1);
    } else {
      this.cButton.style.backgroundColor = "rgb(242, 48, 48)"
      this.oSelecciones.aBebidasSeleccionadas.push(idBebida);
    }
  }

  mostrarPreguntaCantidadPersonas() {
    this.bMostrarPreguntaQueTipoDeBebida = false;
    this.bMostrarPreguntaCantidadComensales = true;
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
  // modificarListaConSusUnidades(listaCompras: ProductoLista[]) {
  //   listaCompras.forEach(oProducto => {
  //     if (!this.tieneUnidades(oProducto)) {
  //       oProducto.seManejaPorUnidades = false;
  //       if (this.elPesoEsMayorA1kg(oProducto)) {
  //         oProducto = this.asignarUnidadesOPeso(oProducto);
  //       } else {
  //         oProducto.medida = "grs"
  //       }
  //     } else {
  //       oProducto.seManejaPorUnidades = true;
  //       oProducto.medida = "unidades"
  //     }
  //     this.aListaDeCompras.push(oProducto);
  //   });
  // }

  asignarUnidadesOPeso(listaCompras: ProductoLista[]){
    listaCompras.forEach(oProducto => {
      if(!this.tieneUnidades(oProducto)){
      if (oProducto.ingrediente) {
        if(this.elPesoEsMayorA1kg(oProducto)){
          oProducto.peso = oProducto.peso / 1000;
          oProducto.medida = "kgs"
          this.bMostrarKg = true;
        }else{
          
          oProducto.medida = "grs"
          this.bMostrarKg = true;
        }
        
      } else {
        oProducto.medida = "lts"
        oProducto.unidades = oProducto.peso / 1000;
        oProducto.peso = oProducto.peso / 1000;
        this.bMostrarLt = true;
      }
    }else{
      oProducto.seManejaPorUnidades = true;
      oProducto.medida = "unidades"
    }
      this.aListaDeCompras.push(oProducto)
    });
    this.obtenerProductosConSusCantidades(this.aListaDeCompras);
  }

  capturarValorRadio(valorRadio: number) {
    this.valorRadio = valorRadio;
    console.log('Valor del rango:', valorRadio);
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

    this.router.navigate(['optimizador-lista'], { queryParams });
  }
  obtenerProductosConSusCantidadesParaPost(aListaDeComprasParaPost: ProductoLista[]) {
    aListaDeComprasParaPost.forEach(oProducto => {
      if(oProducto.medida === "unidades"){
        this.oMapCantidadesProductos.set(oProducto.nombre , oProducto.unidades);
      }else{
          if(oProducto.medida === "kgs" || oProducto.medida === "lts" ){
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

  
  private tieneUnidades(oProducto: ProductoLista) {
    return oProducto.unidades !== 0;
  }

  private elPesoEsMayorA1kg(oProducto: ProductoLista) {
    return oProducto.peso > 1000;
  }


}




