import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComercioComponent } from './perfil-comercio.component';


describe('PerfilComercioComponent', () => {
  let component: PerfilComercioComponent;
  let fixture: ComponentFixture<PerfilComercioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilComercioComponent]
    });
    fixture = TestBed.createComponent(PerfilComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
