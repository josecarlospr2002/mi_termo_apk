import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { UnidadProcesada } from "../types";

interface Props {
  visible: boolean;
  unidadSeleccionada: UnidadProcesada | null;
  ultimaActualizacion: string;
  onClose: () => void;
}

export const ModalDetalles: React.FC<Props> = ({
  visible,
  unidadSeleccionada,
  ultimaActualizacion,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/70 justify-center items-center"
        onPress={onClose}
      >
        <Pressable
          className="bg-white rounded-3xl w-[90%] max-w-[400px] p-6 shadow-modal"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header centrado */}
          <View className="items-center border-b-2 border-blue-dark pb-4 mb-5">
            <Text className="text-2xl font-bold text-gray-800 text-center">
              {unidadSeleccionada?.nombre}
            </Text>
          </View>

          {/* Body con detalles */}
          {unidadSeleccionada && (
            <View className="mb-6">
              {/* Detalle de carga activa */}
              <View className="flex-row items-center mb-3 bg-gray-light rounded-xl p-3.5">
                <Text className="text-3xl mr-3.5">⚡</Text>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Carga activa
                  </Text>
                  <Text className="text-xl font-bold text-gray-dark">
                    {unidadSeleccionada.valorMostrado}
                  </Text>
                </View>
              </View>

              {/* Detalle de actualización */}
              <View className="flex-row items-center mb-3 bg-gray-light rounded-xl p-3.5">
                <Text className="text-3xl mr-3.5">🕐</Text>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Última actualización
                  </Text>
                  <Text className="text-xl font-bold text-gray-dark">
                    {ultimaActualizacion}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Botón cerrar */}
          <Pressable
            className="bg-blue-dark py-3.5 rounded-xl items-center mt-2 active:bg-blue-darker active:scale-98"
            onPress={onClose}
          >
            <Text className="text-white font-bold text-base">Cerrar</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
