import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaEventoComponent } from './consulta-evento.component';

describe('ConsultaEventoComponent', () => {
  let component: ConsultaEventoComponent;
  let fixture: ComponentFixture<ConsultaEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega el módulo HttpClientModule aquí
      declarations: [ConsultaEventoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });
});
