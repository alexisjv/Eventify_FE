import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-optimizador-lista',
  templateUrl: './optimizador-lista.component.html',
  styleUrls: ['./optimizador-lista.component.scss'],
})
export class OptimizadorListaComponent implements OnInit {
  aListaOfertasMenorRecorrido!: Oferta[];
  alistaOfertasEconomicos!: Oferta[];
  aListaOfertaElegida!: Oferta[];
  aListaLocalidadesSeleccionadas!: string[];
  sNombreEvento!: string;
  bResumen = false;
  bEscenarios = true;
  bEstaLogueado = false;
  aListaOfertas!: Oferta[];
  value = '';
  sVistaProducto: string = 'list';

  constructor(
    private listaCompraService: OptimizadorListaService,
    private route: ActivatedRoute,
    private mapaService: SharedService
  ) {}


  ngOnInit(): void {
    this.mapaService.obtenerUbicacionActual().then((ubicacion) => {
      const latitudUbicacion = ubicacion.lat;
      const longitudUbicacion = ubicacion.lng;
  
      this.route.queryParams.subscribe((params) => {
        const cantidadComensales = params['cantidadComensales'];
        const comidasSeleccionadas = JSON.parse(params['comidas']);
        const bebidasSeleccionadas = JSON.parse(params['bebidas']);
  
        this.obtenerOfertas(
          latitudUbicacion,
          longitudUbicacion,
          cantidadComensales,
          comidasSeleccionadas,
          bebidasSeleccionadas
        );
      });
    }).catch((error) => {
      console.error('Error al obtener la ubicación:', error);
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

  obtenerOfertas(latitudUbicacion: number, longitudUbicacion: number, cantidadComensales: number, comidasSeleccionadas: number[], bebidasSeleccionadas: number[]) {
    const lista: ListaPost = {
      latitudUbicacion: latitudUbicacion,
      longitudUbicacion: longitudUbicacion,
      distancia: 5000,
      comidas: comidasSeleccionadas,
      bebidas: bebidasSeleccionadas,
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: cantidadComensales,
      presupuesto: 0,
    };

    this.listaCompraService.obtenerOfertas(lista).subscribe(
      (response) => {
        console.log('Respuesta:', response);
        this.aListaOfertas = response;
      },
      (error) => {
        console.error('Error al obtener las ofertas:', error);
      }
    );
  }
}
