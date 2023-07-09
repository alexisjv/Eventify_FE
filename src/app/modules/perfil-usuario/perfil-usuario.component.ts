import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PerfilUsuarioService } from './services/perfil-usuario.service';
import { ListaGuardada } from '@core/models/listaGuardada';
import { ListaDetalle } from '@core/models/listaDetalle';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent implements OnInit, AfterViewInit {
  listasGuardadas: ListaGuardada[] = [];
  detalleLista!: ListaDetalle;
  currentUser: any = {};
  modalDetalle: boolean = false;

  constructor(private perfilService: PerfilUsuarioService) {}
  
  ngOnInit(): void {
    this.obtenerUsuarioActual();
    this.obtenerListasGuardadas(this.currentUser.id);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    this.modalDetalle = true;
    }, 0);
  }


  

  private obtenerUsuarioActual() {
    let user = sessionStorage.getItem('currentUser');
    if (user !== null) {
      this.currentUser = JSON.parse(user);
    }
  }

  obtenerListasGuardadas(idUsuario: number) {
    this.perfilService.obtenerListasDelUsuario(idUsuario).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.listadosAsociados)) {
          
          this.listasGuardadas = response.listadosAsociados;
          console.log("listas del usuario: ", this.listasGuardadas)
        } else {
          console.error('El endpoint obtenerListasDelUsuario no devuelve un array válido:', response);
        }
      },
      
      (error) => console.error(error)
    );
  }
  
  

  verDetalleLista(idListado: number, idUsuario: number) {
    this.perfilService.verDetalleLista(idListado, idUsuario).subscribe(
      (response: any) => {
        if (response && typeof response === 'object') {
          this.detalleLista = response.listado;
          
          this.modalDetalle = true;
          console.log("detalle: ", this.detalleLista)
        } else {
          console.error('El endpoint verDetalleLista no devuelve un objeto válido:', response);
        }
      },
      (error) => console.error(error)
    );
  }
  
  

  async abrirMapaRecorrido() {
    try {
      const enlaceMapa = this.detalleLista.urlRecorrido;

      window.open(enlaceMapa, '_blank');
    } catch (error) {
      console.error('Error al obtener el enlace de GPS:', error);
    }
  }

  compartirLista(lista: ListaDetalle) {
    let mensajeOfertas = '';

    for (const oferta of lista.ofertas) {
      mensajeOfertas += `
        Comercio: ${oferta.oferta.nombreComercio}
        Localidad: ${oferta.oferta.localidad}
        Producto: ${oferta.oferta.nombreProducto}
        Marca: ${oferta.oferta.marca}
        Precio unitario: $${oferta.oferta.precio}
        Unidades: ${oferta.cantidad}
        Subtotal: $${oferta.subtotal}
        --------------------------
      `;
    }

    const mensajeWhatsApp = `¡Hola! Acá tenés tu lista de compras ♥ :
      ${mensajeOfertas}`;

    const enlaceWhatsAppWeb = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;
    window.open(enlaceWhatsAppWeb, '_blank');
  }
}
