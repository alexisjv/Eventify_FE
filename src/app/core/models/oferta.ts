export interface Oferta {
  cantidad: number,
  subtotal: number,
  oferta:{
  idPublicacion: number;
  idTipoProducto: number;
  idLocalidad: number;
  nombreProducto: string;
  marca: string;
  imagen: string;
  precio: number;
  nombreComercio: string;
  latitud: number;
  longitud: number;
  localidad: string;
}
}
