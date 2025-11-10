import axios from "axios";

/**
 * Configuración base de Axios
 * - Define la URL base de la API
 * - Configura timeout para evitar peticiones colgadas
 * - Establece headers por defecto
 */
export const apiClient = axios.create({
  baseURL: "https://dragonball-api.com/api",
  timeout: 10000, // 10 segundos máximo
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor para logging de peticiones
 * Útil para debugging en desarrollo
 */
apiClient.interceptors.request.use(
  (config) => {
    console.log(` Petición: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para manejo de respuestas y errores
 */
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Respuesta exitosa de: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(` Error en: ${error.config?.url}`, error.message);
    return Promise.reject(error);
  }
);
