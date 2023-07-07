import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PerfilUsuarioService } from './perfil-usuario.service';
import { API_URL } from '@core/config/url';
import { ListaGuardada } from '@core/models/listaGuardada';
import { ListaDetalle } from '@core/models/listaDetalle';

describe('PerfilUsuarioService', () => {
  let service: PerfilUsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerfilUsuarioService]
    });
    service = TestBed.inject(PerfilUsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('Debería recuperar listas del usuario', () => {
    const idUsuario = 1;
    const mockListas: ListaGuardada[] = [
      {
        idListado: 1,
        idUsuario: idUsuario,
        evento: 'Evento 1',
        comidasElegidas: ['Comida 1', 'Comida 2'],
        bebidasElegidas: ['Bebida 1'],
        cantidadOfertas: 3,
        totalListado: 25,
        fechaCreacion: '2023-07-01'
      },
      {
        idListado: 2,
        idUsuario: idUsuario,
        evento: 'Evento 2',
        comidasElegidas: ['Comida 3'],
        bebidasElegidas: ['Bebida 2', 'Bebida 3'],
        cantidadOfertas: 4,
        totalListado: 35,
        fechaCreacion: '2023-07-05'
      }
    ];

    service.obtenerListasDelUsuario(idUsuario).subscribe(listas => {
      expect(listas).toEqual(mockListas);
    });

    const req = httpMock.expectOne(API_URL + `listadoOfertas/misListados?idUsuario=${idUsuario}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockListas);
  });

  it('Debería recuperar detalle de lista', () => {
    const idListado = 1;
    const idUsuario = 1;
    const mockDetalle: ListaDetalle = {
      idListado: idListado,
      idUsuario: idUsuario,
      usuario: 'Usuario 1',
      evento: 'Evento 1',
      comidasElegidas: ['Comida 1', 'Comida 2'],
      bebidasElegidas: ['Bebida 1'],
      cantidadOfertas: 3,
      ofertas: [],
      totalListado: 25,
      fechaCreacion: '2023-07-01',
      urlRecorrido: 'http://example.com/recorrido',
      mensajeOfertas: 'Mensaje de ofertas',
      distanciaARecorrer: 10
    };

    service.verDetalleLista(idListado, idUsuario).subscribe(detalle => {
      expect(detalle).toEqual(mockDetalle);
    });

    const req = httpMock.expectOne(API_URL + `listadoOfertas/detalleListado?idUsuario=${idUsuario}&idListado=${idListado}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetalle);
  });
});
