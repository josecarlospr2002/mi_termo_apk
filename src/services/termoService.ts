import mockData from "../mocks/data.json";
import { DatosAPI } from "../types";

const USAR_MOCK = false;

// User-Agent de un navegador real para evitar bloqueos del proxy
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const termoService = {
  obtenerDatosCargaActiva: async (
    urlBase?: string | null,
  ): Promise<DatosAPI[]> => {
    // Si se está usando mock, devolver datos falsos
    if (USAR_MOCK) {
      return mockData["carga-activa"];
    }

    // URL por defecto si no se proporciona ninguna
    const url = urlBase || "http://web.ctehabana.une.cu/api/carga-activa.php";

    try {
      const respuesta = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "es-ES,es;q=0.9",
          "Accept-Encoding": "gzip, deflate",
          "Cache-Control": "no-cache",
        },
      });

      if (!respuesta.ok) {
        // Intentar obtener el cuerpo del error para más detalles
        let cuerpoError = null;
        try {
          cuerpoError = await respuesta.json();
        } catch {
          cuerpoError = await respuesta.text();
        }

        // Lanzar un error enriquecido con más información
        const errorPersonalizado = new Error(`Error HTTP: ${respuesta.status}`);
        (errorPersonalizado as any).status = respuesta.status;
        (errorPersonalizado as any).statusText = respuesta.statusText;
        (errorPersonalizado as any).body = cuerpoError;
        throw errorPersonalizado;
      }

      const datos = await respuesta.json();
      return datos;
    } catch (err) {
      // Si ya es un error que lanzamos nosotros, lo relanzamos
      if ((err as any).status) {
        throw err;
      }
      // Si es error de red u otro, lo envolvemos
      const errorRed = new Error((err as Error).message);
      (errorRed as any).esErrorRed = true;
      throw errorRed;
    }
  },
};
