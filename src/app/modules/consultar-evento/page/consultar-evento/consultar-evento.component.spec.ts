import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ConsultarEventoComponent } from './consultar-evento.component';

describe('ConsultarEventoComponent', () => {
  let component: ConsultarEventoComponent;
  let fixture: ComponentFixture<ConsultarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega el módulo HttpClientModule aquí
      declarations: [ConsultarEventoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
