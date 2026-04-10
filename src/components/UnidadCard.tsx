import React from "react";
import { Pressable, Text, View } from "react-native";
import { UnidadProcesada } from "../types";

interface Props {
  unidad: UnidadProcesada;
  onPress: (unidad: UnidadProcesada) => void;
}

export const UnidadCard: React.FC<Props> = ({ unidad, onPress }) => {
  return (
    <Pressable
      className="bg-white/15 rounded-2xl mb-5 py-5 px-4 border border-white/15 mx-4
       active:bg-white/30 active:scale-95"
      onPress={() => onPress(unidad)}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="text-xl font-bold text-white drop-shadow-sm">
            {unidad.nombre}
          </Text>
        </View>
        <View className="bg-black/10 px-0.5 py-1 rounded-full min-w-[80px] items-center">
          <Text className="text-2xl font-bold text-white">
            {unidad.valorMostrado}
          </Text>
        </View>
      </View>
      <Text className="text-sm text-white text-center mt-3">
        🔍 Pulse para ver detalles
      </Text>
    </Pressable>
  );
};
