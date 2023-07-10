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
  public currentUser;
  private eventSubscription!: Subscription;


  isNavOpen: boolean = false;


  constructor(private cognitoService : CognitoService, 
              private router: Router, private location : Location,
              private eventService: EventService) { }
  

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.obtenerUsuarioActual();

    this.eventSubscription = this.eventService.getEvent().subscribe((event: string) => {
      if (event === 'loginSuccess') {
        this.obtenerUsuarioActual();
        

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
    if(window.location.pathname == "/" ){
      window.location.reload();
    }else{
    this.router.navigateByUrl('/');
    }
  }


  private obtenerUsuarioActual() {
    let rol = sessionStorage.getItem("rol");
    let user = sessionStorage.getItem("currentUser");
    if (user !== null) {
      if(rol !== null){
        this.rolUsuario = rol;
      }
      this.sessionAuthenticated= 'auth';
      if(this.rolUsuario === 'Comercio'){
        this.currentUser = JSON.parse(user).comercio;
      }
      if(this.rolUsuario === 'Usuario'){
        this.currentUser = JSON.parse(user).usuario;
      }
    }
  }
 
  

  closeMobileNav(): void {
    const navbar = document.querySelector('#navbar') as HTMLElement | null;
    if (navbar) {
      navbar.classList.remove('navbar-mobile');
    }
  }

}
