import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PerfilComercioService } from './perfil-comercio.service';
import { OfertaPublicada } from '@core/models/ofertaPublicada';
import { API_URL } from '@core/config/url';

describe('PerfilComercioService', () => {
  let service: PerfilComercioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerfilComercioService]
    });
    service = TestBed.inject(PerfilComercioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('Debería recuperar las ofertas del comercio', () => {
    const idComercio = 1;
    const mockOfertas: OfertaPublicada[] = [
      { nombre: 'Oferta 1', imagen: 'imagen1.jpg', fechaFin: '2023-07-31', precio: 10 },
      { nombre: 'Oferta 2', imagen: 'imagen2.jpg', fechaFin: '2023-08-15', precio: 15 }
    ];

    service.obtenerOfertasDelComercio(idComercio).subscribe(ofertas => {
      expect(ofertas).toEqual(mockOfertas);
    });

    const req = httpMock.expectOne(API_URL + `comercio/verOfertas/${idComercio}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOfertas);
  });
});
