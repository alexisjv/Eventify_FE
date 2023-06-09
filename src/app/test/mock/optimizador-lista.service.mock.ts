import { Observable, of } from 'rxjs';
import { Oferta } from 'src/app/core/models/oferta';

export class OptimizadorListaServiceMock {
  obtenerOfertas(): Observable<Oferta[]> {
    
    // Devuelve datos ficticios para las pruebas
    const ofertasMock: Oferta[] = [
      // Datos ficticios de ofertas
    ];
    return of(ofertasMock);
  }
}
