import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  idEvento!: number;
  listaLocalidadesSeleccionadas!: string[];
  idComida!: number;
  idBebida!: number;
  nombreEvento!: string;
  resumen = false;
  escenarios = true;
  estaLogueado = false;
  listaOfertas!: Oferta[];
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

  view: string = 'list'; // Vista por defecto
  cards: any[] = [
    { title: 'Card 1', description: 'Descripción de la card 1' },
    { title: 'Card 2', description: 'Descripción de la card 2' },
    { title: 'Card 3', description: 'Descripción de la card 3' }
  ];

  changeView(view: string) {
    this.view = view;
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

  eliminarOferta(index: number) {
    this.listaOfertas.splice(index, 1);
  }
}
