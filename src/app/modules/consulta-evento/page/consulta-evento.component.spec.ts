import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaEventoComponent } from './consulta-evento.component';
import { ConsultaEventoService } from '../services/consulta-evento.service';
import { of } from 'rxjs';

describe('ConsultaEventoComponent', () => {
  let component: ConsultaEventoComponent;
  let fixture: ComponentFixture<ConsultaEventoComponent>;
  let consultaEventoService: ConsultaEventoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ConsultaEventoComponent],
      providers: [ConsultaEventoService]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaEventoComponent);
    component = fixture.componentInstance;
    consultaEventoService = TestBed.inject(ConsultaEventoService);

    spyOn(consultaEventoService, 'getListaEventos').and.returnValue(
      of([
        { id: 1, nombre: 'Cumpleaños', estado: true },
        { id: 2, nombre: 'Parrillada con amigos', estado: true }
      ])
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia traer la lista de eventos del servicio', () => {
    component.getListaEventos();
    expect(consultaEventoService.getListaEventos).toHaveBeenCalled();
    expect(component.aListaEventos).toEqual([
      { id: 1, nombre: 'Cumpleaños', estado: true },
      { id: 2, nombre: 'Parrillada con amigos', estado: true }
    ]);
  });
});