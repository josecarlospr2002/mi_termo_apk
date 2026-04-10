import mockData from "../mocks/data.json";
import { DatosAPI } from "../types";

const USAR_MOCK = true; //true para usar los datos de mocks

export const termoService = {
  obtenerDatosCargaActiva: async (): Promise<DatosAPI[]> => {
    if (USAR_MOCK) {
      return mockData["carga-activa"];
    } else {
      const respuesta = await fetch(
        "http://web.ctehabana.une.cu/api/carga-activa.php",
      );

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      return datos;
    }
  },
};
