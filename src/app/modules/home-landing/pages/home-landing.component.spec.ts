import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeLandingComponent } from './home-landing.component';

describe('HomeLandingComponent', () => {
  let component: HomeLandingComponent;
  let fixture: ComponentFixture<HomeLandingComponent>;

  beforeEach(async () => {
    // Configuración de TestBed sin incluir el componente real
    await TestBed.configureTestingModule({
      declarations: [HomeLandingComponent],
    }).compileComponents();

    // Crear el componente de prueba
    fixture = TestBed.createComponent(HomeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
