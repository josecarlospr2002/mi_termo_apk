import { useCallback, useEffect, useState } from "react";
import { termoService } from "../services/termoService";
import { UnidadProcesada } from "../types";
import { procesarValor } from "../utils/formateador";

interface ErrorDetallado {
  mensaje: string;
  status?: number;
  statusText?: string;
  body?: any;
  esErrorRed?: boolean;
}

export const useDatosTermo = (urlBase?: string | null) => {
  const [unidades, setUnidades] = useState<UnidadProcesada[]>([
    { nombre: "Unidad No. 1", valorMostrado: "-", valorOriginal: null },
    { nombre: "Unidad No. 2", valorMostrado: "-", valorOriginal: null },
    { nombre: "Unidad No. 3", valorMostrado: "-", valorOriginal: null },
  ]);
  const [ultimaActualizacion, setUltimaActualizacion] =
    useState<string>("--:-- --");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [errorDetalle, setErrorDetalle] = useState<ErrorDetallado | null>(null);

  const obtenerDatos = useCallback(async () => {
    // Limpiar error detalle al empezar
    setErrorDetalle(null);
    setError(false);

    try {
      const datos = await termoService.obtenerDatosCargaActiva(urlBase);
      console.log("Datos obtenidos:", datos);
      console.log(`datos.length ${datos.length}`);
      if (datos && datos.length > 0) {
        const registro = datos[0];

        const unidadesProcesadas: UnidadProcesada[] = [
          {
            nombre: "Unidad No. 1",
            valorMostrado: procesarValor(registro.lec1),
            valorOriginal: registro.lec1,
          },
          {
            nombre: "Unidad No. 2",
            valorMostrado: procesarValor(registro.lec2),
            valorOriginal: registro.lec2,
          },
          {
            nombre: "Unidad No. 3",
            valorMostrado: procesarValor(registro.lec3),
            valorOriginal: registro.lec3,
          },
        ];

        setUnidades(unidadesProcesadas);
        setUltimaActualizacion(registro.hora);
        setError(false);
        setErrorDetalle(null);
      } else {
        setError(true);
        setErrorDetalle({
          mensaje: "El servidor no devolvió datos",
          esErrorRed: false,
        });
      }
    } catch (err) {
      console.error("Error obteniendo datos:", err);
      setError(true);

      // Extraer información del error
      if ((err as any).status) {
        // Error HTTP con detalles
        setErrorDetalle({
          mensaje: (err as Error).message,
          status: (err as any).status,
          statusText: (err as any).statusText,
          body: (err as any).body,
          esErrorRed: false,
        });
      } else {
        // Error de red u otro
        setErrorDetalle({
          mensaje: (err as Error).message,
          esErrorRed: true,
        });
      }
    } finally {
      setCargando(false);
    }
  }, [urlBase]);

  useEffect(() => {
    obtenerDatos();
    const intervalo = setInterval(() => {
      obtenerDatos();
    }, 60000);

    return () => clearInterval(intervalo);
  }, [obtenerDatos]);

  return {
    unidades,
    ultimaActualizacion,
    error,
    cargando,
    obtenerDatos,
    errorDetalle,
  };
};
