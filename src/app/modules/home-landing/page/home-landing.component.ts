import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from '@core/enums/Rol.enum';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit, OnDestroy {
  public currentUser;
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const headerElemento = document.getElementById('header');
    
  if (headerElemento) {
    this.renderer.setStyle(headerElemento, 'position', 'fixed');
  }
    this.obtenerUsuarioActual();
  }

  private obtenerUsuarioActual() {
    let rol = sessionStorage.getItem("rol");
    let user = sessionStorage.getItem("currentUser");
    if (user !== null) {
      if(rol === 'Comercio'){
        this.currentUser = JSON.parse(user).razonSocial;
      }
      if(rol === 'Usuario'){
        this.currentUser = JSON.parse(user).usuario;
      }
    }
  }
  

  ngOnDestroy() {
    const headerElemento = document.getElementById('header');

    if (headerElemento) {
      this.renderer.removeStyle(headerElemento, 'position');
    }
  }


}
