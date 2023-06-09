import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OptimizadorListaComponent } from './optimizador-lista.component';
import { OptimizadorListaServiceMock } from '@shared/mock/optimizador-lista.service.mock';
import { OptimizadorListaService } from '../services/optimizador-lista.service';
import { MapaComponent } from '@shared/components/mapa/mapa.component';

describe('OptimizadorListaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [OptimizadorListaComponent, MapaComponent],
      providers: [
        { provide: OptimizadorListaService, useClass: OptimizadorListaServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(OptimizadorListaComponent);
    const component = fixture.componentInstance;

    // Asegúrate de que no haya referencia a GLightbox en el componente
    // Puedes comentar o eliminar cualquier código relacionado con GLightbox

    expect(component).toBeTruthy();
  });
});
