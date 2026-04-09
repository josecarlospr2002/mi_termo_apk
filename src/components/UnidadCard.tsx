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
      className="bg-white/20 rounded-2xl mb-5 py-4.5 px-5 border border-white/30 shadow-card w-[calc(100vw-40px)] self-center active:bg-white/35 active:scale-98"
      onPress={() => onPress(unidad)}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="text-xl font-bold text-white drop-shadow-sm">
            {unidad.nombre}
          </Text>
        </View>
        <View className="bg-black/40 px-4 py-2 rounded-full min-w-[70px] items-center">
          <Text className="text-2xl font-bold text-white">
            {unidad.valorMostrado}
          </Text>
        </View>
      </View>
      <Text className="text-xs text-white/70 text-center mt-2.5">
        🔍 Tap para detalles
      </Text>
    </Pressable>
  );
};
