import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ErrorDetallado } from "../components/ErrorDetallado";
import { ModalDetalles } from "../components/ModalDetalles";
import { ModalRuta } from "../components/ModalRuta";
import { UnidadCard } from "../components/UnidadCard";
import { useDatosTermo } from "../hooks/useDatosTermo";
import { useRutaStorage } from "../hooks/useRutaStorage";
import { UnidadProcesada } from "../types";

import "../global.css";

// URL por defecto
const URL_POR_DEFECTO = "http://web.ctehabana.une.cu/api/carga-activa.php";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [unidadSeleccionada, setUnidadSeleccionada] =
    useState<UnidadProcesada | null>(null);
  const [modalRutaVisible, setModalRutaVisible] = useState(false);

  const { urlRuta, guardarUrl } = useRutaStorage();

  // Usar la URL guardada o la URL por defecto
  const urlActual = urlRuta || URL_POR_DEFECTO;

  const {
    unidades,
    ultimaActualizacion,
    error,
    cargando,
    obtenerDatos,
    errorDetalle,
  } = useDatosTermo(urlActual);

  const mostrarDetalles = (unidad: UnidadProcesada) => {
    setUnidadSeleccionada(unidad);
    setModalVisible(true);
  };

  if (cargando) {
    return (
      <View className="flex-1 bg-blue-500 justify-center items-center">
        <Text className="text-lg text-white text-center">
          🌤️ Cargando datos...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-600">
      <Text className="text-3xl font-bold text-white text-center mt-12 mb-5 drop-shadow-md">
        ⚡ CTE Ernesto Guevara ⚡
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {!error && !errorDetalle && (
          <>
            {unidades.map((unidad, index) => (
              <UnidadCard
                key={index}
                unidad={unidad}
                onPress={mostrarDetalles}
              />
            ))}

            <Text className="text-base font-medium text-white text-center mt-3 mb-2">
              Última Actualización: {ultimaActualizacion}
            </Text>
          </>
        )}

        {/* Mostrar error detallado si existe */}
        {error && errorDetalle && (
          <ErrorDetallado
            error={errorDetalle}
            urlActual={urlActual}
            onReintentar={obtenerDatos}
          />
        )}

        {/* Botón Insertar URL con la URL actual (resumida) */}
        <View className="items-center my-5">
          <View className="bg-white/20 rounded-full px-6 py-3 active:bg-white/30">
            <Text
              className="text-white font-bold text-base text-center"
              onPress={() => setModalRutaVisible(true)}
            >
              🌐 Insertar URL{" "}
              {urlRuta
                ? `(${urlRuta.length > 25 ? urlRuta.substring(0, 22) + "..." : urlRuta})`
                : "(usando URL por defecto)"}
            </Text>
          </View>
        </View>

        {/* Mostrar la URL actual (la que se está usando) */}
        <View className="bg-white/10 rounded-xl p-3 mx-4 mb-5">
          <Text className="text-xs text-white text-center break-words">
            📍 URL activa: {urlActual}
          </Text>
        </View>
      </ScrollView>

      <ModalDetalles
        visible={modalVisible}
        unidadSeleccionada={unidadSeleccionada}
        ultimaActualizacion={ultimaActualizacion}
        onClose={() => setModalVisible(false)}
      />

      <ModalRuta
        visible={modalRutaVisible}
        urlActual={urlRuta}
        onGuardar={guardarUrl}
        onClose={() => setModalRutaVisible(false)}
      />
    </View>
  );
}
