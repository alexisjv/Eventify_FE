import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CognitoService } from '@shared/services/cognito.service';
import { Location } from '@angular/common';
import { EventService } from '@shared/services/event.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  sessionAuthenticated = "noauth";
  rolUsuario: string = '';
  private eventSubscription!: Subscription;

  constructor(private cognitoService : CognitoService, 
              private router: Router, private location : Location,
              private eventService: EventService) { }
  

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.sessionAuthenticated = "auth";
      this.rolUsuario = JSON.parse(currentUser).rol;
    }
    this.eventSubscription = this.eventService.getEvent().subscribe((event: string) => {
      if (event === 'loginSuccess') {
        // Lógica para actualizar el encabezado después del inicio de sesión
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser !== null) {
          this.sessionAuthenticated = "auth";
          this.rolUsuario = JSON.parse(storedUser).rol;
        }
      }
    });
  }

  onCerrarSesion(){
    this.cognitoService.signOut()
    .then(() => {
      // La sesión se cerró correctamente
      sessionStorage.removeItem('currentUser');
      this.sessionAuthenticated = "noauth";
      this.rolUsuario = '';
      this.reloadPage();
    })
    .catch((error) => {
      // Ocurrió un error al cerrar la sesión
      console.error('Error al cerrar sesión:', error);
    });
  }
  
  reloadPage() {
    window.location.reload();
  }

}
