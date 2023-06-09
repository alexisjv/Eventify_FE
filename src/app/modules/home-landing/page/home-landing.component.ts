import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const headerElement = document.getElementById('header');
    
  if (headerElement) {
    this.renderer.setStyle(headerElement, 'position', 'fixed');
  }
  }

  ngOnDestroy() {
    const headerElement = document.getElementById('header');

    if (headerElement) {
      this.renderer.removeStyle(headerElement, 'position');

    }
  }


}
