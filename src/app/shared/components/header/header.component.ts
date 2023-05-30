import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Consultar evento',
        icon: 'uil uil-estate',
        router: ['/', 'consultar-evento']
      }
    ]
  }

}
