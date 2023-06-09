import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OptimizadorListaComponent } from './optimizador-lista.component';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { of, throwError } from 'rxjs';
import { Oferta } from '@core/models/oferta';
import { ActivatedRoute } from '@angular/router';
import { MapaComponent } from '@shared/components/mapa/mapa.component';


//Mock de la obtención de parametros que me manda la pantalla anterior
class ActivatedRouteStub {
  readonly queryParams = of({});
  readonly paramMap = of({});
  get snapshot() {
    return {};
  }
}

describe('OptimizadorListaComponent', () => {
  let component: OptimizadorListaComponent;
  let fixture: ComponentFixture<OptimizadorListaComponent>;
  let listaCompraService: OptimizadorListaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [OptimizadorListaComponent, MapaComponent],
      providers: [
        OptimizadorListaService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizadorListaComponent);
    component = fixture.componentInstance;
    listaCompraService = TestBed.inject(OptimizadorListaService);
  });

  it('Debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería buscar ofertas y retornar la lista de Ofertas con respuesta exitosa', () => {
    const mockLatitudUbicacion = 123;
    const mockLongitudUbicacion = 456;
    const mockCantidadComensales = 4;
    const mockComidasSeleccionadas = [1, 2, 3];
    const mockBebidasSeleccionadas = [4, 5, 6];
    const mockListaPost: ListaPost = {
      latitudUbicacion: mockLatitudUbicacion,
      longitudUbicacion: mockLongitudUbicacion,
      distancia: 5000,
      comidas: mockComidasSeleccionadas,
      bebidas: mockBebidasSeleccionadas,
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: mockCantidadComensales,
      presupuesto: 0,
    };
    const mockResponse: Oferta[] = [
      {
        idPublicacion: 1,
        idTipoProducto: 1,
        idLocalidad: 1,
        nombreProducto: 'Producto 1',
        marca: 'Marca 1',
        imagen: 'imagen1.jpg',
        precio: 10,
        nombreComercio: 'Comercio 1',
        latitud: 123.456,
        longitud: 456.789,
        localidad: 'Localidad 1',
      },
      {
        idPublicacion: 2,
        idTipoProducto: 2,
        idLocalidad: 2,
        nombreProducto: 'Producto 2',
        marca: 'Marca 2',
        imagen: 'imagen2.jpg',
        precio: 20,
        nombreComercio: 'Comercio 2',
        latitud: 987.654,
        longitud: 654.321,
        localidad: 'Localidad 2',
      },
    ];

    spyOn(listaCompraService, 'obtenerOfertas').and.returnValue(
      of(mockResponse)
    );

    component.obtenerOfertas(
      mockLatitudUbicacion,
      mockLongitudUbicacion,
      mockCantidadComensales,
      mockComidasSeleccionadas,
      mockBebidasSeleccionadas
    );

    expect(listaCompraService.obtenerOfertas).toHaveBeenCalledWith(
      mockListaPost
    );
    expect(component.aListaOfertas).toEqual(mockResponse);
  });

  it('Debería manejar el error si hay un inconveniente en la respuesta', () => {
    const mockLatitudUbicacion = 123;
    const mockLongitudUbicacion = 456;
    const mockCantidadComensales = 4;
    const mockComidasSeleccionadas = [1, 2, 3];
    const mockBebidasSeleccionadas = [4, 5, 6];
    const mockError = 'Error al obtener ofertas';
    const mockListaPost: ListaPost = {
      latitudUbicacion: mockLatitudUbicacion,
      longitudUbicacion: mockLongitudUbicacion,
      distancia: 5000,
      comidas: mockComidasSeleccionadas,
      bebidas: mockBebidasSeleccionadas,
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: mockCantidadComensales,
      presupuesto: 0,
    };

    spyOn(listaCompraService, 'obtenerOfertas').and.returnValue(
      throwError(mockError)
    );
    spyOn(console, 'error');

    component.obtenerOfertas(
      mockLatitudUbicacion,
      mockLongitudUbicacion,
      mockCantidadComensales,
      mockComidasSeleccionadas,
      mockBebidasSeleccionadas
    );

    expect(listaCompraService.obtenerOfertas).toHaveBeenCalledWith(
      mockListaPost
    );
    expect(console.error).toHaveBeenCalledWith('Error al obtener las ofertas:', mockError);
  });
});
