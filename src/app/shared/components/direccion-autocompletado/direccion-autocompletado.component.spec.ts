import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionAutocompletadoComponent } from './direccion-autocompletado.component';

describe('DireccionAutocompletadoComponent', () => {
  let component: DireccionAutocompletadoComponent;
  let fixture: ComponentFixture<DireccionAutocompletadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionAutocompletadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireccionAutocompletadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
