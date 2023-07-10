import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PerfilUsuarioService } from './services/perfil-usuario.service';
import { ListaGuardada } from '@core/models/listaGuardada';
import { ListaDetalle } from '@core/models/listaDetalle';
import { ToastrService } from 'ngx-toastr';

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
  selectedListas: any = [];
  comparar: boolean = false;
  listasAComparar: ListaDetalle[] = [];
  eventoImagen!: number[];
  enlaceMapaLista1!: string;
  enlaceMapaLista2!: string;



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
  
          // Inicializar la propiedad seleccionado en false para cada objeto
          this.listasGuardadas.forEach((listado: ListaGuardada) => {
            listado.seleccionado = false;
          });
          
          console.log("listas del usuario: ", this.listasGuardadas)
        } else {
          console.error('El endpoint obtenerListasDelUsuario no devuelve un array válido:', response);
        }
      },
      
      (error) => console.error(error)
    );
  }
  
  
  

  verDetalleLista(idListado: number, idUsuario: number, comparar: boolean) {
    this.perfilService.verDetalleLista(idListado, idUsuario).subscribe(
      (response: any) => {
        if (response && typeof response === 'object') {
          this.detalleLista = response.listado;
          if(comparar){
            this.listasAComparar.push(response.listado);
          }
          
          this.modalDetalle = true;
        } else {
          console.error('El endpoint verDetalleLista no devuelve un objeto válido:', response);
        }
      },
      (error) => console.error(error)
    );
  }
  
  

  async abrirMapaRecorrido(urlRecorrido?: string, posicion?: number) {
    try {

      let enlaceMapa = "";

      if(urlRecorrido && posicion == 0){
       this.enlaceMapaLista1 = urlRecorrido;
       enlaceMapa = urlRecorrido;
      }
      if(urlRecorrido && posicion == 1){
        this.enlaceMapaLista2 = urlRecorrido;
        enlaceMapa = urlRecorrido;
       }

      if(!urlRecorrido){
        enlaceMapa = this.detalleLista.urlRecorrido;
      } 

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

  // Función para verificar si hay dos listas seleccionadas
hasTwoSelectedLists(): boolean {
  return this.selectedListas.length >= 2;
}

// Función para seleccionar o deseleccionar un listado
seleccionarListado(idListado: number): void {
  const listado = this.listasGuardadas.find(listado => listado.idListado === idListado);

  if (listado) {
    listado.seleccionado = !listado.seleccionado;

    // Actualizar la lista de listados seleccionados
    if (listado.seleccionado) {
      this.selectedListas.push(listado);

      // Obtener el detalle del listado y agregarlo a listasAComparar
      this.verDetalleLista(idListado, this.currentUser.id, true);
      
    } else {
      const index = this.selectedListas.indexOf(listado);
      if (index !== -1) {
        this.selectedListas.splice(index, 1);

        // Eliminar el detalle del listado de listasAComparar
        const detalleIndex = this.listasAComparar.findIndex(detalle => detalle.idListado === idListado);
        if (detalleIndex !== -1) {
          this.listasAComparar.splice(detalleIndex, 1);
        }
      }
    }
  }

  console.log('listas seleccionadas: ', this.selectedListas);
  console.log('listaDetalle: ', this.listasAComparar);
}


compararListas(){
  this.comparar = true;
}

cancelarComparar(){
  
  this.selectedListas = [];
  this.listasAComparar = [];
  this.comparar = false;
for (let i = 0; i < this.listasGuardadas.length; i++) {
  this.listasGuardadas[i].seleccionado = false;
}

}



}
