import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface Props {
  onReintentar: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ onReintentar }) => {
  const [cargando, setCargando] = useState(false);

  const manejarReintento = async () => {
    setCargando(true);
    try {
      await onReintentar();
    } finally {
      setCargando(false);
    }
  };

  return (
    <View className="bg-white rounded-xl p-5 items-center mt-5 shadow-md">
      <Text className="text-lg font-bold text-red-600">
        ❌ ERROR DE CONEXIÓN
      </Text>
      <Text className="text-xs text-gray-500 mt-1">
        Verifica tu conexión a internet
      </Text>

      {cargando ? (
        <View className="mt-3 bg-blue-700 px-5 py-2 rounded-full flex-row items-center justify-center min-w-[120px]">
          <ActivityIndicator color="white" size="small" />
          <Text className="text-white font-bold text-sm ml-2">
            Reconectando...
          </Text>
        </View>
      ) : (
        <Pressable
          className="mt-3 bg-blue-700 px-5 py-2 rounded-full active:bg-blue-800 active:scale-95"
          onPress={manejarReintento}
        >
          <Text className="text-white font-bold text-sm">Reintentar</Text>
        </Pressable>
      )}
    </View>
  );
};
