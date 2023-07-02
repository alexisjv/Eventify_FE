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

  async abrirMapaRecorrido() {
    try {
      const enlaceMapa = this.detalleLista.urlRecorrido

      window.open(enlaceMapa, '_blank');
    } catch (error) {
      console.error('Error al obtener el enlace de GPS:', error);
    }
  }

  compartirLista(lista: any) {
    this.detalleLista.mensajeOfertas = lista
      .map((oferta) => {
        return `
        Comercio: ${oferta.oferta.nombreComercio}
        Localidad: ${oferta.oferta.localidad}
        Producto: ${oferta.oferta.nombreProducto}
        Marca: ${oferta.oferta.marca}
        Precio unitario: $${oferta.oferta.precio}
        Unidades: ${oferta.cantidad}
        Subtotal: $${oferta.subtotal}
        --------------------------
    `;
      })
      .join('');

    const mensajeWhatsApp = `¡Hola! Acá tenés tu lista de compras ♥ :
  ${this.detalleLista.mensajeOfertas}`;

    const enlaceWhatsAppWeb = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;
    window.open(enlaceWhatsAppWeb, '_blank');
  }


}
