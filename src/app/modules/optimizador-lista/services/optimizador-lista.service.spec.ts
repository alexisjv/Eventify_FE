import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OptimizadorListaService } from './optimizador-lista.service';
import { ListaPost } from '@core/models/listaPost';
import { Oferta } from '@core/models/oferta';
import { API_URL } from '@core/config/url';

describe('OptimizadorListaService', () => {
  let service: OptimizadorListaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OptimizadorListaService]
    });

    service = TestBed.inject(OptimizadorListaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes
    httpMock.verify();
  });

  it('Debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debería obtener las ofertas correctamente', () => {
    const mockFiltro: ListaPost = {
      latitudUbicacion: 123,
      longitudUbicacion: 456,
      distancia: 5000,
      comidas: [1, 2, 3],
      bebidas: [4, 5, 6],
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: 4,
      presupuesto: 0
    };

    const mockResponse: Oferta[] = [
    ];

    // Realiza la solicitud al servicio
    service.obtenerOfertas(mockFiltro).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Espera una solicitud HTTP POST a la URL correcta
    const req = httpMock.expectOne(API_URL + 'oferta/listaPersonalizada');
    expect(req.request.method).toBe('POST');

    // Responde con los datos de ejemplo
    req.flush(mockResponse);
  });

  /*  it('Debería manejar errores al obtener las ofertas', () => {
    const mockFiltro: ListaPost = {
      latitudUbicacion: 123,
      longitudUbicacion: 456,
      distancia: 5000,
      comidas: [1, 2, 3],
      bebidas: [4, 5, 6],
      marcasComida: [],
      marcasBebida: [],
      cantidadInvitados: 4,
      presupuesto: 0
    };

    const mockError = 'Error al obtener las ofertas';

    // Realiza la solicitud al servicio
    service.obtenerOfertas(mockFiltro).subscribe(
      (response) => {
      },
      (error) => {
        expect(error).toBeTruthy(); // Verifica que haya ocurrido un error
        expect(error.message).toEqual(mockError);
      }
    );

    // Espera una solicitud HTTP POST a la URL correcta
    const req = httpMock.expectOne(API_URL + 'oferta/listaPersonalizada');
    expect(req.request.method).toBe('POST');

    // Responde con un error de ejemplo
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });  */
});
