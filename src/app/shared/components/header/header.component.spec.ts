import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CognitoService } from '@shared/services/cognito.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '@shared/services/event.service';
import { Subscription, of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockCognitoService: jasmine.SpyObj<CognitoService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockEventService: jasmine.SpyObj<EventService>;
  let mockEventSubscription: jasmine.SpyObj<Subscription>;

  beforeEach(async () => {
    // Crear instancias de los servicios mockeados
    mockCognitoService = jasmine.createSpyObj('CognitoService', ['signOut']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockEventService = jasmine.createSpyObj('EventService', ['getEvent']);
    mockEventSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: CognitoService, useValue: mockCognitoService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
        { provide: EventService, useValue: mockEventService }
      ]
    }).compileComponents();

    // Configurar el espía del evento para devolver un observable de ejemplo
    mockEventService.getEvent.and.returnValue(of('loginSuccess'));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería inicializar las propiedades sessionAuthenticated y rolUsuario cuando se establece currentUser', () => {
    const currentUser = { rol: 'comercio' };
    const storedUser = JSON.stringify(currentUser);
    spyOn(sessionStorage, 'getItem').and.returnValue(storedUser);

    component.ngOnInit();

    expect(component.sessionAuthenticated).toBe('auth');
    expect(component.rolUsuario).toBe(currentUser.rol);
  });

  it('Debería suscribirse a eventService y actualizar sessionAuthenticated y rolUsuario en el evento loginSuccess', () => {
    const currentUser = { rol: 'comercio' };
    const storedUser = JSON.stringify(currentUser);
    spyOn(sessionStorage, 'getItem').and.returnValue(storedUser);

    component.ngOnInit();

    expect(mockEventService.getEvent).toHaveBeenCalled();
    expect(component.sessionAuthenticated).toBe('auth');
    expect(component.rolUsuario).toBe(currentUser.rol);
  });

  

  
});
