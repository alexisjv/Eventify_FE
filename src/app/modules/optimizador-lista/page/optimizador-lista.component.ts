import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { Evento } from 'src/app/core/models/evento';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';

@Component({
  selector: 'app-optimizador-lista',
  templateUrl: './optimizador-lista.component.html',
  styleUrls: ['./optimizador-lista.component.scss'],
})
export class OptimizadorListaComponent implements OnInit {
  listaOfertaMenorRecorrido!: Oferta[];
  listaOfertaEconomicos!: Oferta[];
  listaOfertaElegida!: Oferta[];
  listaLocalidadesSeleccionadas!: string[];
  nombreEvento!: string;
  resumen = false;
  escenarios = true;
  estaLogueado = false;
  listaOfertas!: Oferta[];
  value = '';
  vistaProducto: string = 'list';
  // elementType = NgxQrcodeElementTypes.URL;
  // errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor(
    private listaCompraService: OptimizadorListaService
  ) {}

  ngOnInit(): void {
    this.obtenerOfertas();
  }

  cambiarVistaProducto(vista: string) {
    this.vistaProducto = vista;
  }

  /* getNombreEvento(idEvento: number): void {
    this.listaCompraService.getListaEventos().subscribe((eventos: Evento[]) => {
      const eventoEncontrado = eventos.find((evento) => evento.id === idEvento);
      this.nombreEvento = eventoEncontrado ? eventoEncontrado.nombre : '';
    });
  } */

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

  obtenerOfertas() {
    const lista: ListaPost = {
      latitudUbicacion: -34.66741731547843,
      longitudUbicacion: -58.56522896214421,
      distancia: 1000,
      comidas: [4,2,3],
      bebidas: [1,2],
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: 0,
      presupuesto: 0,
    };

    this.listaCompraService.obtenerOfertas(lista).subscribe(
      (response) => {
        console.log('Respuesta:', response);
        this.listaOfertas = response
      },
      (error) => {
        console.error('Error:', error);
        // Manejar el error aquí
      }
    );
  }

}
