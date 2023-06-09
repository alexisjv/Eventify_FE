import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock de main.js
    spyOn(window, 'addEventListener'); // Ejemplo de mock para window.addEventListener
    spyOn(document, 'querySelector'); // Ejemplo de mock para document.querySelector
    // Mock otras funciones y eventos utilizados en main.js
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
