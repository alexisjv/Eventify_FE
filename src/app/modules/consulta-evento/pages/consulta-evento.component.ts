import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comidas } from 'src/app/core/models/comidas';
import { Bebidas } from 'src/app/core/models/bebidas';
import { Evento } from 'src/app/core/models/evento';
import { ProductoLista } from 'src/app/core/models/ProductoLista';
import { ConsultaEventoService } from '../services/consulta-evento.service';


@Component({
  selector: 'app-consulta-evento',
  templateUrl: './consulta-evento.component.html',
  styleUrls: ['./consulta-evento.component.scss'],


})
export class ConsultaEventoComponent {
  oSelecciones: {
    idEventoSeleccionado:number
    aComidasSeleccionadas: any[],
    aBebidasSeleccionadas: any[],
    nCantidadComensales: number
  } = {
    idEventoSeleccionado:0,
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
  bMostrarListaDeProductos: boolean = false;
  sImg: string = 'assets/images/asistente.png';
  bMostrarQueCompraQueresRealizar: boolean = true;
  aListaDeCompras!: ProductoLista[];
  bMostrarLoading: boolean = false;
  bIsOpened = false;
  cButton;

  constructor( private router: Router,private consultaEventoService: ConsultaEventoService) { }

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

  onSeleccionBebida(idBebida){
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
          this.aListaDeCompras = listaCompras;
          this.bMostrarLoading = false;
        },
        (error) => console.error(error)
      );
  }

  consultar(): void {
    this.bMostrarListaDeProductos = true;
    this.bMostrarLoading = true;
    this.bMostrarOpcionSeleccionada = false;
    this.bMostrarQueCompraQueresRealizar = false;
    this.getListadoDeCompras();
  }

  verOfertas() {
    const queryParams = {
      cantidadComensales: this.oSelecciones.nCantidadComensales,
      comidas: JSON.stringify(this.oSelecciones.aComidasSeleccionadas),
      bebidas: JSON.stringify(this.oSelecciones.aBebidasSeleccionadas)
    };

    this.router.navigate(['optimizador-lista'], { queryParams });
  }

}