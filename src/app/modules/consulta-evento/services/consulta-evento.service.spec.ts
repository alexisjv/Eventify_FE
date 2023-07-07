/* import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsultaEventoService } from './consulta-evento.service';
import { Evento } from '@core/models/evento';
import { Comidas } from '@core/models/comidas';
import { Bebidas } from '@core/models/bebidas';
import { API_URL } from '@core/config/url';


describe('ConsultaEventoService', () => {
  let service: ConsultaEventoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConsultaEventoService]
    });
    service = TestBed.inject(ConsultaEventoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Deberia traerme la lista de eventos', () => {
    const mockEventos: Evento[] = [
      { id: 1, nombre: 'Cumpleaños', estado: true },
      { id: 2, nombre: 'Parrillada con amigos', estado: true }
    ];

    service.getListaEventos().subscribe((eventos: Evento[]) => {
      expect(eventos).toEqual(mockEventos);
    });

    const req = httpMock.expectOne(API_URL + 'evento/eventos');
    expect(req.request.method).toBe('GET');
    req.flush(mockEventos);
  });

  it('Deberia traer la lista de comidas para el tipo de evento Cumpleaños', () => {
    const mockComidas: Comidas[] = [
      {
        "id": 1,
        "nombre": "Pizzas",
        "comensales": 2
      },
      {
        "id": 2,
        "nombre": "Hamburguesas",
        "comensales": 2
      },
      {
        "id": 3,
        "nombre": "Panchos",
        "comensales": 2
      },
      {
        "id": 4,
        "nombre": "Snacks",
        "comensales": 2
      },
      {
        "id": 5,
        "nombre": "Hamburguesas veganas",
        "comensales": 2
      }
    ];
    const idEvento = 1;

    service.getListaTiposDeComidas(idEvento).subscribe((comidas: Comidas[]) => {
      expect(comidas).toEqual(mockComidas);
    });

    const req = httpMock.expectOne(`${API_URL}Evento/comidas?idEvento=${idEvento}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComidas);
  });


}); */