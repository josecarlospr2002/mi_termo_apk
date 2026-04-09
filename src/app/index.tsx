import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ErrorMessage } from "../components/ErrorMessage";
import { ModalDetalles } from "../components/ModalDetalles";
import { UnidadCard } from "../components/UnidadCard";
import "../global.css"; // Estilos globales de Tailwind/NativeWind
import { useDatosTermo } from "../hooks/useDatosTermo";
import { UnidadProcesada } from "../types";

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
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-lg text-white text-center mt-12">
          🌤️ Cargando datos...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Text className="text-3xl font-bold text-white text-center mt-12 mb-5 drop-shadow-lg">
        ⚡ CTE Ernesto Guevara ⚡
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {error && <ErrorMessage onReintentar={obtenerDatos} />}

        {!error &&
          unidades.map((unidad, index) => (
            <UnidadCard key={index} unidad={unidad} onPress={mostrarDetalles} />
          ))}

        <Text className="text-base font-medium text-white text-center mt-5 mb-2.5 opacity-90">
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
