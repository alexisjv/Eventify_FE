import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Oferta } from '@core/models/oferta';

@Component({
  selector: 'app-card-oferta',
  templateUrl: './card-oferta.component.html',
  styleUrls: ['./card-oferta.component.scss'],
})
export class CardOfertaComponent {
  @Input()
  nombreProducto!: string;
  @Input()
  marca!: string;
  @Input()
  precio!: number;
  @Input()
  nombreComercio!: string;
  @Input()
  imagen!: string;
  @Input()
  subtotal!: number;
  @Input()
  cantidad!: number;
  @Input()
  fechaVencimiento!: string;
  @Input()
  editar!: boolean;
  @Input() 
  i!: number;
  @Input()
  idProducto!: number;
  @Input()
  rol!: number;
  @Input()
  fechaFin!: string;
  @Input() oferta!: Oferta;
  @Output() idMarcaProductoSeleccionadoActual: EventEmitter<{ idProducto: number, marca: string }> = new EventEmitter<{ idProducto: number, marca: string }>();
  @Output() cantidadActualizada: EventEmitter<{ idProducto: number; marca: string; cantidad: number, subtotal: number; }> = new EventEmitter<{idProducto: number; marca: string, cantidad: number; subtotal: number }>();
  @Output() eliminarOferta: EventEmitter<number> = new EventEmitter<number>();


  confirmarCambioMarca(): void {
    const productoMarca = { idProducto: this.idProducto, marca: this.marca };
    this.idMarcaProductoSeleccionadoActual.emit(productoMarca);
  }

  sumarCantidad(): void {
    const nuevaCantidad = this.cantidad + 1;
    this.actualizarCantidad(nuevaCantidad);
  }

  restarCantidad(): void {
    if (this.cantidad > 1) {
      const nuevaCantidad = this.cantidad - 1;
      this.actualizarCantidad(nuevaCantidad);
    }
  }

  actualizarCantidad(nuevaCantidad: number): void {
    const subtotal = this.calcularSubtotal(nuevaCantidad);
    const productoCantidad = {
      idProducto: this.idProducto,
      marca: this.marca,
      cantidad: nuevaCantidad,
      subtotal: subtotal,
    };
    this.cantidadActualizada.emit(productoCantidad);
  }
  
  calcularSubtotal(cantidad: number): number {
    return this.precio * cantidad;
  }


  eliminar(): void {
    this.eliminarOferta.emit(this.idProducto);
  }
  
  
}