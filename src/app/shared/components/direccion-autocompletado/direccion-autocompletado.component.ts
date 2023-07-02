import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-direccion-autocompletado',
  templateUrl: './direccion-autocompletado.component.html',
  styleUrls: ['./direccion-autocompletado.component.scss']
})
export class DireccionAutocompletadoComponent implements OnInit, AfterViewInit{
  @Input()
  adressType!: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput!: string;
  queryWait!: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
          {
              componentRestrictions: { country: 'AR' },
              types: [this.adressType] 
          });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          this.invokeEvent(place);
      });
  }

  invokeEvent(place: Object) {
      this.setAddress.emit(place);
      console.log("el lugar es: ", place)
  }

}
