import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { PerfilUsuarioService } from './services/perfil-usuario.service';
import { ListaDetalle } from '@core/models/listaDetalle';
import { Oferta } from '@core/models/oferta';
import { ListaGuardada } from '@core/models/listaGuardada';

describe('PerfilUsuarioComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;
  let perfilService: PerfilUsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilUsuarioComponent],
      imports: [HttpClientTestingModule],
      providers: [PerfilUsuarioService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    perfilService = TestBed.inject(PerfilUsuarioService);
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería recuperar al usuario actual en la inicialización', () => {
    const user = { id: 1, name: 'John Doe' };
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(user));

    component.ngOnInit();

    expect(component.currentUser).toEqual(user);
  });

  it('Debería recuperar las listas guardadas del usuario.', () => {
    const idUsuario = 1;
    const listasGuardadas: ListaGuardada[] = [
      {
        idListado: 1,
        idUsuario: 1,
        evento: 'Evento 1',
        comidasElegidas: [],
        bebidasElegidas: [],
        cantidadOfertas: 0,
        totalListado: 0,
        fechaCreacion: '2023-07-07',
      },
      {
        idListado: 2,
        idUsuario: 1,
        evento: 'Evento 2',
        comidasElegidas: [],
        bebidasElegidas: [],
        cantidadOfertas: 0,
        totalListado: 0,
        fechaCreacion: '2023-07-08',
      },
    ];

    spyOn(perfilService, 'obtenerListasDelUsuario').and.returnValue(
      of(listasGuardadas)
    );

    component.obtenerListasGuardadas(idUsuario);

    expect(perfilService.obtenerListasDelUsuario).toHaveBeenCalledWith(
      idUsuario
    );
    expect(component.listasGuardadas).toEqual(listasGuardadas);
  });

  it('Debería manejar el error al no recuperar listas', () => {
    const idUsuario = 1;
    const error = 'Error al obtener las listas guardadas';

    spyOn(perfilService, 'obtenerListasDelUsuario').and.returnValue(
      new Observable((observer) => {
        observer.error(error);
      })
    );

    spyOn(console, 'error');

    component.obtenerListasGuardadas(idUsuario);

    expect(perfilService.obtenerListasDelUsuario).toHaveBeenCalledWith(
      idUsuario
    );
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('Debería recuperar los detalles de la lista', () => {
    const idListado = 1;
    const idUsuario = 1;
    const detalleLista: ListaDetalle = {
      idListado: 1,
      idUsuario: 1,
      usuario: 'Usuario 1',
      evento: 'Evento 1',
      comidasElegidas: [],
      bebidasElegidas: [],
      cantidadOfertas: 0,
      ofertas: [],
      totalListado: 0,
      fechaCreacion: '2023-07-07',
      urlRecorrido: 'https://maps.google.com',
      mensajeOfertas: 'Mensaje de ofertas',
      distanciaARecorrer: 0,
    };

    spyOn(perfilService, 'verDetalleLista').and.returnValue(of(detalleLista));

    component.verDetalleLista(idListado, idUsuario);

    expect(perfilService.verDetalleLista).toHaveBeenCalledWith(
      idListado,
      idUsuario
    );
    expect(component.detalleLista).toEqual(detalleLista);
  });
});
