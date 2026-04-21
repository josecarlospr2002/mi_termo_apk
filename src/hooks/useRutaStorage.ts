import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "@ruta_url";

export const useRutaStorage = () => {
  const [urlRuta, setUrlRuta] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  // Cargar la URL guardada al iniciar
  useEffect(() => {
    cargarUrl();
  }, []);

  const cargarUrl = async () => {
    try {
      const guardado = await AsyncStorage.getItem(STORAGE_KEY);
      if (guardado !== null) {
        setUrlRuta(guardado);
      }
    } catch (error) {
      console.error("Error cargando la URL:", error);
    } finally {
      setCargando(false);
    }
  };

  const guardarUrl = useCallback(async (url: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, url);
      setUrlRuta(url);
      return true;
    } catch (error) {
      console.error("Error guardando la URL:", error);
      return false;
    }
  }, []);

  const eliminarUrl = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUrlRuta(null);
      return true;
    } catch (error) {
      console.error("Error eliminando la URL:", error);
      return false;
    }
  }, []);

  return {
    urlRuta,
    cargando,
    guardarUrl,
    eliminarUrl,
  };
};
