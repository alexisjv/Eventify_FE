import { TestBed } from '@angular/core/testing';

import { ListaComprasService } from './lista-compra.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListaCompraService', () => {
  let service: ListaComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
    });
    service = TestBed.inject(ListaComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
