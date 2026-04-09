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
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={onClose}
      >
        <Pressable
          className="bg-white rounded-2xl w-[90%] max-w-[400px] p-6 shadow-xl"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="items-center border-b-2 border-blue-700 pb-4 mb-5">
            <Text className="text-2xl font-bold text-gray-800 text-center">
              {unidadSeleccionada?.nombre}
            </Text>
          </View>

          {unidadSeleccionada && (
            <View className="mb-6">
              <View className="flex-row items-center mb-3 bg-gray-100 rounded-xl p-3.5">
                <Text className="text-3xl mr-3.5">⚡</Text>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Carga activa
                  </Text>
                  <Text className="text-xl font-bold text-gray-700">
                    {unidadSeleccionada.valorMostrado}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-3 bg-gray-100 rounded-xl p-3.5">
                <Text className="text-3xl mr-3.5">🕐</Text>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Última actualización
                  </Text>
                  <Text className="text-xl font-bold text-gray-700">
                    {ultimaActualizacion}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <Pressable
            className="bg-blue-900 py-3.5 rounded-xl items-center mt-2 active:bg-blue-800 active:scale-95"
            onPress={onClose}
          >
            <Text className="text-white font-bold text-base">Cerrar</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
