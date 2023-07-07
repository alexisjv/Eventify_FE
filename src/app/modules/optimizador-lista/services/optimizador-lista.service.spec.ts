import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OptimizadorListaService } from './optimizador-lista.service';
import { API_URL } from '@core/config/url';
import { ListaPost } from '@core/models/listaPost';

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
    httpMock.verify();
  });

  it('Debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('Dbería retornar ofertas', () => {
    const filtro: ListaPost = {
      latitudUbicacion: 123,
      longitudUbicacion: 456,
      distancia: 10,
      comidas: [1, 2],
      bebidas: [3],
      marcasComida: ['Marca 1', 'Marca 2'],
      marcasBebida: ['Marca 3'],
      cantidadInvitados: 5,
      presupuesto: 100,
      cantidadProductos: {}
    };

    service.obtenerOfertas(filtro).subscribe(response => {
      expect(response).toBeDefined();
      // Verifica si la respuesta es la esperada
    });

    const req = httpMock.expectOne(API_URL + 'oferta/listadoOfertas');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(filtro);
    req.flush({/* Datos de respuesta */});
  });

  it('Debereía retornar ofertas por comercio', () => {
    const filtro: ListaPost = {
      latitudUbicacion: 123,
      longitudUbicacion: 456,
      distancia: 10,
      comidas: [1, 2],
      bebidas: [3],
      marcasComida: ['Marca 1', 'Marca 2'],
      marcasBebida: ['Marca 3'],
      cantidadInvitados: 5,
      presupuesto: 100,
      cantidadProductos: {}
    };

    service.obtenerOfertasPorComercio(filtro).subscribe(response => {
      expect(response).toBeDefined();
      // Verifica si la respuesta es la esperada
    });

    const req = httpMock.expectOne(API_URL + 'Oferta/recorrerMenos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(filtro);
    req.flush({/* Datos de respuesta */});
  });

  it('Debería guardar la lista', () => {
    const mockBody = { /* Datos de prueba */ };

    spyOn(console, 'log');
    spyOn(console, 'error');

    service.guardarLista(mockBody);

    const req = httpMock.expectOne(API_URL + 'listadoOfertas/guardarListado');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBody);
    req.flush({/* Datos de respuesta */});

    expect(console.log).toHaveBeenCalledWith('La petición se realizó correctamente.', {/* Datos de respuesta */});
    expect(console.error).not.toHaveBeenCalled();
  });
});
