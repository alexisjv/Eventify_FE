import { Component, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-direccion-autocompletado',
  templateUrl: './direccion-autocompletado.component.html',
  styleUrls: ['./direccion-autocompletado.component.scss']
})
export class DireccionAutocompletadoComponent {
  @ViewChild('searchInput', { static: false })
  searchInput!: ElementRef;
  searchText: string = ''; // Agrega la propiedad searchText
  lat!: number; // Variable para almacenar la latitud
  lng!: number; // Variable para almacenar la longitud
  address!: string;

  constructor() { }

  ngAfterViewInit() {
    window.onload = () => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address;

          console.log('Latitud:', lat);
          console.log('Longitud:', lng);
          console.log('Dirección:', address);
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.address = place.formatted_address ?? 'Dirección no disponible';
        }
      });
    };
  }
}
