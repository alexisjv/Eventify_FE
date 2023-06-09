import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OptimizadorListaService } from './optimizador-lista.service';

describe('OptimizadorListaService', () => {
  let service: OptimizadorListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OptimizadorListaService]
    });
    service = TestBed.inject(OptimizadorListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
