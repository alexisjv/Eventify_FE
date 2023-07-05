import { Oferta } from "./oferta";

export interface ListaDetalle {
    idListado: number;
    idUsuario: number;
    usuario: string;
    evento: string;
    comidasElegidas: string[];
    bebidasElegidas: string[];
    cantidadOfertas: number;
    ofertas: Oferta[];
    totalListado: number;
    fechaCreacion: string;
    urlRecorrido: string;
    mensajeOfertas: string;
    distanciaARecorrer: number;
  }