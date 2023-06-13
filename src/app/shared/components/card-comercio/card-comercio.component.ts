import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Oferta } from '@core/models/oferta';

@Component({
  selector: 'app-card-comercio',
  templateUrl: './card-comercio.component.html',
  styleUrls: ['./card-comercio.component.scss']
})
export class CardComercioComponent {
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


}
