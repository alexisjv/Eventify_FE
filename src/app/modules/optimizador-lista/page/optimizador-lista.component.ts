import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/core/models/oferta';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';
import{ ProductoCard } from '@core/models/productoCard';

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
  aListaProductos!: ProductoCard[];
  value = '';
  sVistaProducto: string = 'grid';
  vistaListaMasEconomica = true;
  vistaListaMenorRecorrido = false;
  isOpenDiv1 = false;
isOpenDiv2 = false;
isOpenDiv3 = false;
cards: any[] = [
  { title: 'Card 1', content: 'Contenido de la Card 1', image: 'imagen1.jpg' },
  { title: 'Card 2', content: 'Contenido de la Card 2', image: 'imagen2.jpg' },
  { title: 'Card 3', content: 'Contenido de la Card 3', image: 'imagen3.jpg' }
];

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
        const oCantidadesPorProducto = JSON.parse(params['cantidadProductos']);
        
        // oCantidadesPorProducto.replace(/\\/g, "").replace(/\n/g, "");
        this.obtenerOfertas(
          latitudUbicacion,
          longitudUbicacion,
          cantidadComensales,
          comidasSeleccionadas,
          bebidasSeleccionadas,
          oCantidadesPorProducto
        );
      });
    }).catch((error) => {
      console.error('Error al obtener la ubicación:', error);
    });
  }

toggleDiv1() {
  this.isOpenDiv1 = !this.isOpenDiv1;
}

toggleDiv2() {
  this.isOpenDiv2 = !this.isOpenDiv2;
}

toggleDiv3() {
  this.isOpenDiv3 = !this.isOpenDiv3;
}

  
  cambiarAListaMasEconomico() {
    this.vistaListaMasEconomica = true;
    this.vistaListaMenorRecorrido = false;
    
    const divMasEconomico = document.querySelector('.div-mas-economico');
    const divMenorRecorrido = document.querySelector('.div-menor-recorrido');
  
    divMasEconomico?.classList.add('activo');
    divMenorRecorrido?.classList.remove('activo');
  }
  
  cambiarAListaMenorRecorrido() {
    this.vistaListaMasEconomica = false;
    this.vistaListaMenorRecorrido = true;
    
    const divMenorRecorrido = document.querySelector('.div-menor-recorrido');
    const divMasEconomico = document.querySelector('.div-mas-economico');
    
    divMenorRecorrido?.classList.add('activo');
    divMasEconomico?.classList.remove('activo');
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

  obtenerOfertas(latitudUbicacion: number, longitudUbicacion: number, cantidadComensales: number, 
    comidasSeleccionadas: number[], bebidasSeleccionadas: number[], cantidadesPorProducto:{}) {
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
      cantidadProductos: cantidadesPorProducto

    };

    this.listaCompraService.obtenerOfertas(lista).subscribe(
      (response : ProductoCard[]) => {
        console.log('Respuesta:', response);
        this.aListaProductos = response;
      },
      (error) => {
        console.error('Error al obtener las ofertas:', error);
      }
    );
  }
  
}
