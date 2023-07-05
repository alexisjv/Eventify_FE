import { TestBed } from '@angular/core/testing';

import { PerfilComercioService } from './perfil-comercio.service';

describe('PerfilComercioService', () => {
  let service: PerfilComercioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilComercioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
