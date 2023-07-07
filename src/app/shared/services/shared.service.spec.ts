import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { MapaComponent } from '@shared/components/mapa/mapa.component';

describe('SharedService', () => {
  let service: SharedService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let mockMapaComponent: jasmine.SpyObj<MapaComponent>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    mockMapaComponent = jasmine.createSpyObj('MapaComponent', ['obtenerEnlaceGPS', 'calcularYMostrarRuta', 'setValorRadio']);

    TestBed.configureTestingModule({
      providers: [
        SharedService,
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: MapaComponent, useValue: mockMapaComponent }
      ]
    });

    service = TestBed.inject(SharedService);
  });

  it('Debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('Debería llamar al método obtenerEnlaceGPS de MapaComponent', async () => {
    const expectedLink = 'https://maps.google.com';
    mockMapaComponent.obtenerEnlaceGPS.and.returnValue(Promise.resolve(expectedLink));

    const result = await service.obtenerLinkGps();

    expect(mockMapaComponent.obtenerEnlaceGPS).toHaveBeenCalled();
    expect(result).toBe(expectedLink);
  });

  it('Debería llamar al método calcularYMostrarRuta de MapaComponent', () => {
    const comercios = [{ id: 1, nombre: 'Comercio 1' }, { id: 2, nombre: 'Comercio 2' }];
    const radio = 100;
    const callback = jasmine.createSpy('callback');
    
    service.obtenerRuta(comercios, radio, callback);

    expect(mockMapaComponent.calcularYMostrarRuta).toHaveBeenCalledWith(comercios, radio, callback);
  });

  it('Debería llamar al método setValorRadio de MapaComponent', () => {
    const valorRadio = 200;

    service.enviarValorRadio(valorRadio);

    expect(mockMapaComponent.setValorRadio).toHaveBeenCalledWith(valorRadio);
  });
});
