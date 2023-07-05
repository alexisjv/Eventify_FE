import { Component, OnInit } from '@angular/core';
import { OfertaPublicada } from '@core/models/ofertaPublicada';
import { PerfilComercioService } from './services/perfil-comercio.service';

@Component({
  selector: 'app-perfil-comercio',
  templateUrl: './perfil-comercio.component.html',
  styleUrls: ['./perfil-comercio.component.scss']
})
export class PerfilComercioComponent implements OnInit{

comercioLogueado!: any;
ofertasPublicadas!: OfertaPublicada[];
nombreComercio!: string;
cuit!: string;

constructor(private perfilService: PerfilComercioService) {}

ngOnInit(): void {
  this.obtenerUsuarioActual();
  this.obtenerOfertasPublicadas(this.comercioLogueado.id);
}

private obtenerUsuarioActual() {
  let user = localStorage.getItem('currentUser');
  if (user !== null) {
    this.comercioLogueado = JSON.parse(user);
    this.nombreComercio = this.comercioLogueado.usuario;
    this.nombreComercio = this.nombreComercio.substring(0, this.nombreComercio.length - 11);
  }
}
obtenerOfertasPublicadas(idComercio: number) {
  this.perfilService.obtenerOfertasDelComercio(idComercio).subscribe(
    (ofertasPublicadas: OfertaPublicada[]) => {
      this.ofertasPublicadas = ofertasPublicadas;
    },
    (error) => console.error(error)
  );
}

}
