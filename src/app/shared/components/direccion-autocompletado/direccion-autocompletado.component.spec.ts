import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DireccionAutocompletadoComponent } from './direccion-autocompletado.component';

describe('DireccionAutocompletadoComponent', () => {
  let component: DireccionAutocompletadoComponent;
  let fixture: ComponentFixture<DireccionAutocompletadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ DireccionAutocompletadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireccionAutocompletadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });
});
