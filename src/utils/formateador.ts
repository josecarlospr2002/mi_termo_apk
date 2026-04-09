/**
 * Procesa un valor numérico para mostrarlo en la UI
 * @param valor - Número o null
 * @returns String formateado: "-" si es null, "0" si es <= 0, o el número sin decimales
 */
export const procesarValor = (valor: number | null): string => {
  if (valor === null) return "-";
  if (valor <= 0) return "0";
  return Math.round(valor).toString(); // Redondeo estándar
};

/**
 * Formatea una fecha/hora para mostrar
 * @param horaStr - String de hora en formato "HH:MM:SS" o similar
 * @returns String formateado "HH:MM"
 */
export const formatearHora = (horaStr: string): string => {
  if (!horaStr || horaStr === "--:-- --") return "--:-- --";
  // Si viene con formato "HH:MM:SS", tomar solo HH:MM
  if (horaStr.includes(":")) {
    const partes = horaStr.split(":");
    return `${partes[0]}:${partes[1]}`;
  }
  return horaStr;
};
