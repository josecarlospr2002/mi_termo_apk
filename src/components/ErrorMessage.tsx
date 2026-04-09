import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  onReintentar: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ onReintentar }) => {
  return (
    <View className="bg-white/95 rounded-xl p-5 items-center mt-5">
      <Text className="text-lg font-bold text-red-error">
        ❌ ERROR DE CONEXIÓN
      </Text>
      <Text className="text-xs text-gray-500 mt-1">
        Verifica tu conexión a internet
      </Text>
      <Pressable
        className="mt-3 bg-blue-dark px-5 py-2 rounded-full active:bg-blue-darker active:scale-98"
        onPress={onReintentar}
      >
        <Text className="text-white font-bold text-sm">Reintentar</Text>
      </Pressable>
    </View>
  );
};
