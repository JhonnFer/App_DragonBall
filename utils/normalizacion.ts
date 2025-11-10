const normalizeString = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD') // Paso 1: Separa el caracter base del diacrítico (acento)
    .replace(/[\u0300-\u036f]/g, "") // Paso 2: Elimina todos los diacríticos
    .trim();
};

export default normalizeString;