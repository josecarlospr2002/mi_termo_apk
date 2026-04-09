import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ErrorMessage } from "../components/ErrorMessage";
import { ModalDetalles } from "../components/ModalDetalles";
import { UnidadCard } from "../components/UnidadCard";
import { useDatosTermo } from "../hooks/useDatosTermo";
import { UnidadProcesada } from "../types";

import "../global.css";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [unidadSeleccionada, setUnidadSeleccionada] =
    useState<UnidadProcesada | null>(null);
  const { unidades, ultimaActualizacion, error, cargando, obtenerDatos } =
    useDatosTermo();

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
        {error && <ErrorMessage onReintentar={obtenerDatos} />}

        {!error &&
          unidades.map((unidad, index) => (
            <UnidadCard key={index} unidad={unidad} onPress={mostrarDetalles} />
          ))}

        <Text className="text-base font-medium text-white text-center mt-3 mb-5">
          Última Actualización: {ultimaActualizacion}
        </Text>
      </ScrollView>

      <ModalDetalles
        visible={modalVisible}
        unidadSeleccionada={unidadSeleccionada}
        ultimaActualizacion={ultimaActualizacion}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
