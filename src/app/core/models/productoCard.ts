import { Oferta } from "./oferta";

export interface ProductoCard {
    nombreProducto: string;
    ofertas: Oferta[];
    showArrows: boolean 
    total:number;
  }