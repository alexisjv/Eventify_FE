import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
    });
    service = TestBed.inject(SharedService);
  });

  it('Debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });
});
