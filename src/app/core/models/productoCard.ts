import { Oferta } from "./oferta";

export interface ProductoCard {
    nombreProducto: string;
    ofertas: Oferta[];
    showArrows: boolean 
    total:number;// Asegúrate de importar el tipo 'Oferta' desde su ubicación correcta
    // Otras propiedades de producto si las hay
  }