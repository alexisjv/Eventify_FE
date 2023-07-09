import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OfertaPublicada } from '@core/models/ofertaPublicada';
import { PerfilComercioService } from './services/perfil-comercio.service';
import { tipoProducto } from '@core/models/tipoProducto';
import { ProductoOferta } from '@core/models/ProductoOferta';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfertaPost } from '@core/models/ofertaPost';
import { ToastrService } from 'ngx-toastr';

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
page= 'misOfertas';
tiposDeProductos!: tipoProducto[];
selectedProductoTipo='';
selectedMarca='';
marcas!:String[]
productosAElegir!: ProductoOferta[];
mostrarProductos = false;
mostrarBotonDeProductoSeleccionado=true;
productoSeleccionado: ProductoOferta | null = null;
idProductoSeleccionado=0;
mostrarEleccionProducto= true;
mostrarCompletarOferta=false;
@ViewChild('codebar') Codebar!: ElementRef<HTMLInputElement>;
buscandoProducto=false;
escanearCodigo= true;
productoEncontrado:  ProductoOferta | null = null;
errorBuscandoProducto=false;
precioRegex='^\d+(\.\d{1,2})?$';
formOferta !: FormGroup;
fechaHoy: any;
fechaSeleccionada!:Date;
precioSeleccionado: any;
idComercio: any;
ofertaPost!: OfertaPost;
statusOferta!: string;
errorLongitudCodigo= false;
direccion: string = "";
localidad: string = "";

 
constructor(private perfilService: PerfilComercioService , private ngModal : NgbModal, 
  private toastr: ToastrService) {}

ngOnInit(): void {
  this.obtenerUsuarioActual();
  this.obtenerOfertasPublicadas(this.comercioLogueado.id);
  this.obtenerTipoDeProductos();
 
 this.formOferta = new FormGroup({
  precio: new FormControl(null, [
    Validators.required,
    Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]
  ),
  fecha: new FormControl(null, [
    Validators.required, this.fechaActualValidator
  ])
});
}



obtenerTipoDeProductos() {
    this.perfilService.obtenerTipoDeProductos().subscribe(
      (tipoProductos: tipoProducto[]) => {
        this.tiposDeProductos = tipoProductos;
      },
      (error) => console.error(error)
    );
}

private obtenerUsuarioActual() {
  let user = sessionStorage.getItem('currentUser');
  if (user !== null) {
    this.comercioLogueado = JSON.parse(user);
    this.nombreComercio = this.comercioLogueado.razonSocial;
    this.idComercio = this.comercioLogueado.id;
    this.cuit = this.comercioLogueado.cuit;
    this.localidad = this.comercioLogueado.localidad;
    this.direccion = this.comercioLogueado.direccion;
  }
}
obtenerOfertasPublicadas(idComercio: number) {
  this.perfilService.obtenerOfertasDelComercio(idComercio).subscribe(
    (ofertasPublicadas: OfertaPublicada[]) => {
      this.ofertasPublicadas = ofertasPublicadas;
    },
    (error) => {
      console.error(error)
      this.ofertasPublicadas = [];
    }
  );
}


onChangeProductoTipo(){
  this.selectedMarca='';
 this.obtenerMarcasDelProducto(this.selectedProductoTipo);
 this.productosAElegir = [];
 this.mostrarProductos=false;

}

obtenerMarcasDelProducto(idProducto: string) {
    this.perfilService.obtenerMarcasDelProducto(idProducto).subscribe(
      (marca: String[]) => {
        this.marcas = marca;
      },
      (error) => console.error(error)
    );
  }

  onChangeMarca(){
    this.obtenerProductos(this.selectedProductoTipo, this.selectedMarca);
   
  }

  obtenerProductos(selectedProduct: string, selectedMarca: string) {
   this.perfilService.obtenerProductos(selectedProduct, selectedMarca).subscribe(
      (productos: ProductoOferta[]) => {
        this.productosAElegir = productos;
        this.mostrarProductos=true;
      },
      (error) => console.error(error)
    );
  }
  onClickProducto (producto : ProductoOferta){
    if (this.idProductoSeleccionado === producto.id ) {
      this.idProductoSeleccionado = 0; 
      this.mostrarBotonDeProductoSeleccionado=false;
      this.productoSeleccionado=null;
    } else {
      this.idProductoSeleccionado = producto.id; 
      this.productoSeleccionado=producto;
    }
   
  }
  onElegirProducto(){
    this.mostrarEleccionProducto= false;
    this.mostrarCompletarOferta = true;

  }
  volverAEleccionProducto(){
    this.mostrarEleccionProducto= true;
    this.mostrarCompletarOferta = false;
    this.formOferta.reset();
  }

  onCargaConCodigo(){
    this.Codebar.nativeElement.focus();
    this.Codebar.nativeElement.value='';
    this.productoSeleccionado=null;
    this.selectedMarca ='';
    this.selectedProductoTipo='';
    this.idProductoSeleccionado=0;
    this.errorLongitudCodigo=false;
  }
  onCargaManual(){
    this.productoSeleccionado=null;
    this.productoEncontrado=null;
    this.escanearCodigo=true;
    this.buscandoProducto=false;
    this.productosAElegir=[];
    this.formOferta.reset();
    this.errorBuscandoProducto=false;
    this.errorLongitudCodigo=false;
  }

  onCodebarChange(event: any){
      const inputValue = (event.target as HTMLInputElement).value;
      const inputLength = inputValue.length;
      if (event.keyCode === 13) {
      if (inputLength >= 8 && inputLength <= 14) {
        this.errorLongitudCodigo=false;
        this.escanearCodigo=false;
        this.buscandoProducto = true;
        this.buscarProducto(inputValue);
        
      } else {
        // Realiza la acción deseada cuando la longitud no está en el rango deseado
        this.errorLongitudCodigo=true;
      }
    }
    
  }

  buscarProducto(code : string) {
    this.perfilService.buscarProducto(code).subscribe(
      (producto: ProductoOferta) => {
        this.productoEncontrado = producto;
        this.productoSeleccionado= producto;
        this.idProductoSeleccionado=producto.id;
        this.buscandoProducto=false;
      },
      (error) => {
      this.errorBuscandoProducto=true;
      this.buscandoProducto=false;  
    });
  }
  
  volverAEscanearProducto(){
    this.escanearCodigo=true;
    this.productoEncontrado=null;
    this.productoSeleccionado=null;
    this.Codebar.nativeElement.focus();
    this.formOferta.reset();
    this.errorBuscandoProducto=false;
  }

  openModalPublicar(content) { 
    this.fechaSeleccionada = this.fecha.value;
    this.precioSeleccionado = this.precio.value;
    
    this.ngModal.open(content);
  }
  openModalPublicarOferta(){
    this.statusOferta='';
    this.mostrarCompletarOferta=false;
    this.mostrarEleccionProducto=true;
    this.productoEncontrado = null;
    this.productoSeleccionado = null;
  
  }

  cerrarModalSubirOferta(){
    this.productoSeleccionado=null;
    this.escanearCodigo=true;
    this.selectedMarca ='';
    this.selectedProductoTipo='';
    this.idProductoSeleccionado=0;
    this.productosAElegir=[];
    this.mostrarCompletarOferta=false;
    this.mostrarEleccionProducto=true;
    this.formOferta.reset();
    this.errorBuscandoProducto=false;
    this.errorLongitudCodigo=false;
    
  }

  onConfirmarOferta(){
   this.ofertaPost ={
    
    "idComercio": this.idComercio,
    "idProducto": this.idProductoSeleccionado,
     "precio": this.precio.value,
     "fechaFin": new Date(this.fecha.value).toISOString().slice(0, -1) 
    }

     
      this.perfilService.publicarOferta(this.ofertaPost) .subscribe(
      response => {
        this.statusOferta="success";
        
        
        this.toastr.success("La oferta se ha publicado con exito");
        this.ngModal.dismissAll();
        this.cerrarModalSubirOferta();
        this.mostrarCompletarOferta=false;
        this.mostrarEleccionProducto=false;
        this.obtenerOfertasPublicadas(this.idComercio);
        
      },
      (error) => {
        this.cerrarModalSubirOferta();
        this.mostrarCompletarOferta=false;
        this.mostrarEleccionProducto=false;
        this.ngModal.dismissAll();
        this.toastr.error(error.message);
        this.statusOferta="error";
      }
    );
    

  }
  reloadPage() {
    window.location.reload();
  }

  

  fechaActualValidator(control: AbstractControl) {
    const fechaIngresada = new Date(control.value);
    const fechaActual = new Date();

    if (fechaIngresada < fechaActual) {
      return { 
        fechaMenor: true 
      };
    }

    return null;
  }

  get precio(): AbstractControl {
    return this.formOferta.get('precio') as FormControl;
  }
  get fecha(): AbstractControl {
    return this.formOferta.get('fecha') as FormControl;
  }
}


