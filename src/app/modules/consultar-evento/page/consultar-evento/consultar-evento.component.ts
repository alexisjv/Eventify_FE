import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comidas } from 'src/app/core/models/comidas';
import { Bebidas } from 'src/app/core/models/bebidas';
import { Evento } from 'src/app/core/models/evento';
import { Localidad } from 'src/app/core/models/localidad';
import { ProductoLista } from 'src/app/core/models/ProductoLista';
import { FormControl } from '@angular/forms';
import { ConsultarEventoService } from '@modules/consultar-evento/services/consultar-evento.service';


@Component({
  selector: 'app-consultar-evento',
  templateUrl: './consultar-evento.component.html',
  styleUrls: ['./consultar-evento.component.scss'],
  
  
})
export class ConsultarEventoComponent {
  idEventoSeleccionado!: number;
  localidadesSeleccionadas!: number[];

  idComidaSeleccionada!: number;
  idBebidaSeleccionada!: number;
  listaEventos!: Evento[];
  mostrarOpcionSeleccionada: boolean = false;
  ListaDeLocalidades!: Localidad[];
  tiposDeComidas!: Comidas[];
  tiposDeBebidas!: Bebidas[];
  mostrarPreguntaQueTipoDeEvento: boolean = true;
  mostrarPreguntaQueTipoDeComida: boolean = false;
  mostrarPreguntaQueTipoDeBebida: boolean = false;
  mostrarPreguntaQueZonas: boolean = false;
  mostrarListaDeProductos: boolean = false;
  img: string = 'assets/images/asistente.png';
  mostrarQueCompraQueresRealizar: boolean = true;
  listaDeCompras!: ProductoLista[];
  mostrarLoading: boolean = false;

  constructor(
    private router: Router,
    private consultarEventoService: ConsultarEventoService
  ) {}

  ngOnInit(): void {
    this.getListaEventos();
  }

  getListaEventos() {
    this.consultarEventoService.getListaEventos().subscribe(
      (listaEventos: Evento[]) => {
        this.listaEventos = listaEventos;
      },
      (error) => console.error(error)
    );
  }

  getTiposDeComidas(idEvento: number) {
    this.consultarEventoService.getListaTiposDeComidas(idEvento).subscribe(
      (listaComidas: Comidas[]) => {
        this.tiposDeComidas = listaComidas;
      },
      (error) => console.error(error)
    );
  }

  mostrarTiposDeComida(idEvento: number) {
    this.getTiposDeComidas(idEvento);
    this.mostrarPreguntaQueTipoDeEvento = false;
    this.mostrarPreguntaQueTipoDeComida = true;
    if (idEvento === 1) {
      this.img = 'assets/images/asistente-cumpleaños.gif';
    }
    if (idEvento === 2) {
      this.img = 'assets/images/asistente-parrilla.gif';
    }
    this.idEventoSeleccionado = idEvento;
  }

  getTiposDeBebidas() {
    this.consultarEventoService
      .getListaBebidas(this.idEventoSeleccionado)
      .subscribe(
        (listaBebidas: Bebidas[]) => {
          this.tiposDeBebidas = listaBebidas;
        },
        (error) => console.error(error)
      );
  }

  mostrarTiposDeBebida(idComida: number) {
    this.getTiposDeBebidas();
    this.mostrarPreguntaQueTipoDeComida = false;
    this.mostrarPreguntaQueTipoDeBebida = true;
    this.idComidaSeleccionada = idComida;
  }

  mostrarLocalidades(idBebida: number) {
    this.mostrarPreguntaQueTipoDeBebida = false;
    this.mostrarOpcionSeleccionada = true;
    this.consultarEventoService.getLocalidades().subscribe(
      (listaDeLocalidades: Localidad[]) => {
        this.ListaDeLocalidades = listaDeLocalidades;
      },
      (error) => console.error(error)
    );
    this.idBebidaSeleccionada = idBebida;
  }

  getListadoDeCompras() {
    this.consultarEventoService
      .getListadeCompras(
        this.idEventoSeleccionado,
        this.idComidaSeleccionada,
        this.idBebidaSeleccionada
      )
      .subscribe(
        (listaCompras: ProductoLista[]) => {
          this.listaDeCompras = listaCompras;
          this.mostrarLoading = false;
        },
        (error) => console.error(error)
      );
  }

  consultar(): void {
    this.mostrarListaDeProductos = true;
    this.mostrarLoading = true;
    this.mostrarOpcionSeleccionada = false;
    this.mostrarQueCompraQueresRealizar = false;
    this.getListadoDeCompras();
    console.log('ID del evento:', this.idEventoSeleccionado);
    console.log('Localidades', this.localidadesSeleccionadas);
  }

  verOfertas() {
    this.localidadesSeleccionadas = [
      // this.primeraLocalidadControl.value,
      // this.segundaLocalidadControl.value,
      // this.terceraLocalidadControl.value,
    ];
  
    const queryParams = {
      idEvento: this.idEventoSeleccionado,
      idComida: this.idComidaSeleccionada,
      idBebida: this.idBebidaSeleccionada,
      idLocalidadesSeleccionadas: JSON.stringify(this.localidadesSeleccionadas),
    };
  
    this.router.navigate(['optimizadorLista'], { queryParams });
  }
  
  
  
  
}
