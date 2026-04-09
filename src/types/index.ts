export interface DatosAPI {
  lec1: number | null;
  lec2: number | null;
  lec3: number | null;
  hora: string;
}

export interface UnidadTermo {
  nombre: string;
  valor: number | null;
  lecKey: "lec1" | "lec2" | "lec3";
}

export interface UnidadProcesada {
  nombre: string;
  valorMostrado: string;
  valorOriginal: number | null;
}

export interface DatoHistorial {
  lec1: number;
  lec2: number;
  lec3: number | null;
  hora: string;
}

export interface PuntoGrafico {
  hora: string;
  valor: number;
}
