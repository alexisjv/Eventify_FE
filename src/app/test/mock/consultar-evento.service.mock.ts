import { Evento } from '@core/models/evento';
import { Observable, of } from 'rxjs';
import { Oferta } from 'src/app/core/models/oferta';

export class ConsultaEventoServiceMock {

    
  getListaEventos(): Observable<Evento[]> {
    
    // Devuelve datos ficticios para las pruebas
    const ofertasMock: Evento[] = [
        { id: 1, nombre: 'Cumpleaños', estado: true },
        { id: 2, nombre: 'Parrillada con amigos' , estado: true},
      ]
    ;
    return of(ofertasMock);
  }
}
