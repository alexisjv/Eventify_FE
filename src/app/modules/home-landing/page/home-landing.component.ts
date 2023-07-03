import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
    let user = localStorage.getItem("currentUser");
    if (user !== null) {
      this.currentUser = JSON.parse(user);
    }
  }

  ngOnDestroy() {
    const headerElemento = document.getElementById('header');

    if (headerElemento) {
      this.renderer.removeStyle(headerElemento, 'position');
    }
  }


}
