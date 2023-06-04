import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from 'src/app/core/models/oferta';
import { Evento } from 'src/app/core/models/evento';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { OptimizadorListaService } from '../services/optimizador-lista.service';

@Component({
  selector: 'app-optimizador-lista',
  templateUrl: './optimizador-lista.component.html',
  styleUrls: ['./optimizador-lista.component.scss'],
})
export class OptimizadorListaComponent implements OnInit {
  listaOfertaMenorRecorrido!: Oferta[];
  listaOfertaEconomicos!: Oferta[];
  listaOfertaElegida!: Oferta[];
  idEvento!: number;
  listaLocalidadesSeleccionadas!: string[];
  idComida!: number;
  idBebida!: number;
  nombreEvento!: string;
  resumen = false;
  escenarios = true;
  estaLogueado = false;
  listaOfertas! : Oferta[];

  elementType = NgxQrcodeElementTypes.URL;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  latitud!: number;
  longitud!: number;
  distancia!: number;

  constructor(
    private listaCompraService: OptimizadorListaService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerOfertas();
  }

  getNombreEvento(idEvento: number): void {
    this.listaCompraService.getListaEventos().subscribe((eventos: Evento[]) => {
      const eventoEncontrado = eventos.find((evento) => evento.id === idEvento);
      this.nombreEvento = eventoEncontrado ? eventoEncontrado.nombre : '';
    });
  }

  obtenerResumen() {
    this.escenarios = false;
    this.resumen = true;
  }

  inciarSesion() {
    this.estaLogueado = true;
  }

  elegirOtroEscenario() {
    this.escenarios = true;
    this.resumen = false;
  }

  obtenerOfertas(){
    this.listaCompraService
    .obtenerOfertas(this.latitud, this.longitud, this.distancia, this.idComida, this.idBebida)
    .subscribe(
      (listaOfertas: Oferta[]) => {
        this.listaOfertas = listaOfertas;
        console.log(
          'Ofertas encontradas' + this.listaOfertas
        );
      },
      (error) => console.error(error)
    );
  }
}
