import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface ErrorDetalladoProps {
  error: {
    mensaje: string;
    status?: number;
    statusText?: string;
    body?: any;
    esErrorRed?: boolean;
  } | null;
  urlActual?: string | null;
  onReintentar?: () => void;
}

export const ErrorDetallado: React.FC<ErrorDetalladoProps> = ({
  error,
  urlActual,
  onReintentar,
}) => {
  if (!error) return null;

  const esErrorDeRed = error.esErrorRed === true;

  return (
    <ScrollView className="flex-1">
      <View className="bg-red-50 rounded-xl p-5 mx-4 mt-5 border border-red-300">
        {/* Título del error */}
        <Text className="text-xl font-bold text-red-700 text-center mb-4">
          {esErrorDeRed ? "⚠️ ERROR DE RED" : `❌ ERROR HTTP`}
        </Text>

        {/* URL que se intentó consultar */}
        {urlActual && (
          <View className="bg-gray-100 rounded-lg p-3 mb-4">
            <Text className="text-xs text-gray-500 mb-1 font-bold">
              URL consultada:
            </Text>
            <Text className="text-sm text-gray-800 break-words">
              {urlActual}
            </Text>
          </View>
        )}

        {/* Mensaje original del error */}
        <View className="bg-white rounded-lg p-3 mb-4 border border-gray-200">
          <Text className="text-xs text-gray-500 mb-1 font-bold">
            Mensaje original:
          </Text>
          <Text className="text-sm text-red-600 font-mono">
            {error.mensaje}
          </Text>
        </View>

        {/* Status y StatusText (solo para errores HTTP) */}
        {!esErrorDeRed && error.status !== undefined && (
          <View className="bg-white rounded-lg p-3 mb-4 border border-gray-200">
            <Text className="text-xs text-gray-500 mb-1 font-bold">
              Status:
            </Text>
            <Text className="text-lg font-bold text-red-600">
              {error.status}
            </Text>

            {error.statusText && (
              <>
                <Text className="text-xs text-gray-500 mt-3 mb-1 font-bold">
                  StatusText:
                </Text>
                <Text className="text-sm text-gray-800">
                  {error.statusText}
                </Text>
              </>
            )}
          </View>
        )}

        {/* Body de la respuesta del servidor (si existe) */}
        {!esErrorDeRed && error.body !== undefined && error.body !== null && (
          <View className="bg-gray-900 rounded-lg p-3 mb-4">
            <Text className="text-xs text-gray-400 mb-2 font-bold">
              Body del error (respuesta del servidor):
            </Text>
            <ScrollView horizontal={true} className="max-h-64">
              <Text className="font-mono text-xs text-green-400">
                {typeof error.body === "object"
                  ? JSON.stringify(error.body, null, 2)
                  : String(error.body)}
              </Text>
            </ScrollView>
          </View>
        )}

        {/* Información adicional para error de red */}
        {esErrorDeRed && (
          <View className="bg-yellow-50 rounded-lg p-3 mb-4 border border-yellow-200">
            <Text className="text-xs text-yellow-700 mb-1 font-bold">
              Tipo de error:
            </Text>
            <Text className="text-sm text-yellow-800">
              Error de red - No se pudo establecer conexión con el servidor
            </Text>
          </View>
        )}

        {/* Botón de reintento */}
        {onReintentar && (
          <Pressable
            className="mt-3 bg-blue-700 py-3 rounded-xl items-center active:bg-blue-800 active:scale-95"
            onPress={onReintentar}
          >
            <Text className="text-white font-bold text-base">
              🔄 Reintentar
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};
