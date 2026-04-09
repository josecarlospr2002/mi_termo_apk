/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ==================== COLORES PERSONALIZADOS ====================
      colors: {
        // Color principal de la app
        primary: "#4a77f3",

        // Fondos translúcidos (solo los que realmente se usan)
        "white/20": "rgba(255, 255, 255, 0.2)", // Tarjetas normales
        "white/35": "rgba(255, 255, 255, 0.35)", // Tarjetas al presionar
        "white/95": "rgba(255, 255, 255, 0.95)", // Fondo del mensaje de error
        "black/40": "rgba(0, 0, 0, 0.4)", // Contenedor del valor numérico

        // Colores específicos del diseño
        "blue-dark": "#1E3A8A", // Botones normales
        "blue-darker": "#0F2A5E", // Botones al presionar
        "red-error": "#FF4444", // Texto de error
        "gray-light": "#F8F9FA", // Fondo de detalles en modal
        "gray-dark": "#2C3E50", // Texto de valores en modal
      },

      // ==================== SOMBRAS PERSONALIZADAS ====================
      boxShadow: {
        // Sombra original de las tarjetas (styles.ts)
        card: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        // Sombra original del modal (styles.ts)
        modal: "0px 8px 12px rgba(0, 0, 0, 0.4)",
      },

      // ==================== ESCALAS PERSONALIZADAS ====================
      scale: {
        98: ".98", // Efecto de presión para botones y tarjetas
      },
    },
  },
  plugins: [],
};
