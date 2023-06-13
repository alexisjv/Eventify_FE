import { TestBed } from '@angular/core/testing';

import { FormRegistroService } from './form-registro.service';

describe('FormRegistroService', () => {
  let service: FormRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
