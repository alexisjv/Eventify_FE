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
  i!: number;
  @Input()
  idProducto!: number;
  @Input() oferta!: Oferta;
  @Output() ofertaSeleccionadaActual: EventEmitter<{ oferta: Oferta, index: number }> = new EventEmitter<{ oferta: Oferta, index: number }>();

  confirmarCambio(): void {
    const data = { oferta: this.oferta, index: this.i };
    this.ofertaSeleccionadaActual.emit(data);
  }

  
  
}
