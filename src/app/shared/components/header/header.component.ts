import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Consultar evento',
        icon: 'uil uil-estate',
        router: ['/', 'consultar-evento']
      }
    ]

    const script = this.renderer.createElement('script');
    script.src = 'assets/js/main.js';
    this.renderer.appendChild(document.body, script);
  }

}
