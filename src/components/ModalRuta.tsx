import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

interface Props {
  visible: boolean;
  urlActual: string | null;
  onGuardar: (url: string) => void;
  onClose: () => void;
}

export const ModalRuta: React.FC<Props> = ({
  visible,
  urlActual,
  onGuardar,
  onClose,
}) => {
  const [valorInput, setValorInput] = useState("");

  // Cuando se abre el modal, cargar la URL actual en el input
  useEffect(() => {
    if (visible) {
      setValorInput(urlActual !== null ? urlActual : "");
    }
  }, [visible, urlActual]);

  // Función para validar si es una URL válida (acepta localhost, IPs, dominios)
  const esUrlValida = (url: string): boolean => {
    if (!url || url.trim() === "") return false;

    const urlTrim = url.trim();

    // Patrón que acepta:
    // - localhost, localhost:8000
    // - IPs: 192.168.1.1, 192.168.1.1:3000
    // - Dominios: google.com, sub.dominio.com
    // - Con o sin http:// o https://
    const patronUrl =
      /^(https?:\/\/)?((localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?|([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)$/i;

    return patronUrl.test(urlTrim);
  };

  const manejarGuardar = () => {
    const url = valorInput.trim();
    if (true) {
      //(esUrlValida(url)) {
      // Si no tiene http:// ni https://, se agrega https:// por defecto
      // let urlFinal = url;
      // if (!url.startsWith("http://") && !url.startsWith("https://")) {
      //   urlFinal = "https://" + url;
      // }
      onGuardar(url);
      onClose();
    }
  };

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
              🌐 Configurar URL
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Dirección URL:
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base text-gray-800 bg-gray-50"
              placeholder="Ej: http://localhost:8000/api"
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              value={valorInput}
              onChangeText={setValorInput}
              autoFocus={true}
            />
            <Text className="text-xs text-gray-500 mt-2">
              Ejemplos válidos: localhost:8000/api | 192.168.1.100:3000 |
              google.com | http://midominio.com
            </Text>
          </View>

          <View className="flex-row gap-3">
            <Pressable
              className="flex-1 bg-gray-400 py-3.5 rounded-xl items-center active:bg-gray-500 active:scale-95"
              onPress={onClose}
            >
              <Text className="text-white font-bold text-base">Cancelar</Text>
            </Pressable>
            <Pressable
              className="flex-1 bg-blue-700 py-3.5 rounded-xl items-center active:bg-blue-800 active:scale-95"
              onPress={manejarGuardar}
            >
              <Text className="text-white font-bold text-base">Guardar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
