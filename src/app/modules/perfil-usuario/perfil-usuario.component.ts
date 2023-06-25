import { Component, OnInit } from '@angular/core';
import { PerfilUsuarioService } from './services/perfil-usuario.service';
import { ListaGuardada } from '@core/models/listaGuardada';
import { ListaDetalle } from '@core/models/listaDetalle';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit{

  listasGuardadas!: ListaGuardada[];
  detalleLista!: ListaDetalle;
  
  constructor(
    private perfilService: PerfilUsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerListasGuardadas(1);
  }

  obtenerListasGuardadas(idUsuario: number) {
    this.perfilService.obtenerListasDelUsuario(idUsuario).subscribe(
      (listasGuardadas: ListaGuardada[]) => {
        this.listasGuardadas = listasGuardadas;
        console.log(listasGuardadas);
      },
      (error) => console.error(error)
    );
  }

  verDetalleLista(idListado, idUsuario){
    this.perfilService.verDetalleLista(idListado, idUsuario).subscribe(
      (detalleLista: ListaDetalle) => {
        this.detalleLista = detalleLista;
        console.log(detalleLista);
      },
      (error) => console.error(error)
    );
  }


}
