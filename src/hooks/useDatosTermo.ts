import { useCallback, useEffect, useState } from "react";
import { termoService } from "../services/termoService";
import { UnidadProcesada } from "../types";
import { procesarValor } from "../utils/formateador";

export const useDatosTermo = () => {
  const [unidades, setUnidades] = useState<UnidadProcesada[]>([
    { nombre: "Unidad No. 1", valorMostrado: "-", valorOriginal: null },
    { nombre: "Unidad No. 2", valorMostrado: "-", valorOriginal: null },
    { nombre: "Unidad No. 3", valorMostrado: "-", valorOriginal: null },
  ]);
  const [ultimaActualizacion, setUltimaActualizacion] =
    useState<string>("--:-- --");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);

  const obtenerDatos = useCallback(async () => {
    try {
      const datos = await termoService.obtenerDatosCargaActiva();

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
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error obteniendo datos:", error);
      setError(true);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    obtenerDatos();
    const intervalo = setInterval(() => {
      obtenerDatos();
    }, 60000); // Actualiza cada 60 segundos

    return () => clearInterval(intervalo);
  }, [obtenerDatos]);

  return {
    unidades,
    ultimaActualizacion,
    error,
    cargando,
    obtenerDatos,
  };
};
