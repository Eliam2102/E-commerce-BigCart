import axios from "axios";

// Se crea una instancia de Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Cambia por la URL de tu API en producción
  withCredentials: true, // Permite el uso de cookies si el backend las maneja
});

// Interceptor de solicitudes para incluir el token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Recupera el token almacenado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adjunta el token al encabezado
    }
    return config; // Retorna la configuración actualizada
  },
  (error) => {
    // Manejo de errores en la configuración de la solicitud
    console.error("Error en el interceptor de solicitud:", error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores globales
axiosInstance.interceptors.response.use(
  (response) => response, // Devuelve la respuesta si no hay errores
  (error) => {
    if (error.response?.status === 401) {
      // Error 401: No autorizado
      console.warn("Token inválido o expirado. Redirigiendo al login...");
      localStorage.removeItem("authToken"); // Elimina el token inválido
      window.location.href = "/login"; // Redirige al login
    }
    return Promise.reject(error); // Rechaza el error para que pueda ser manejado por el llamador
  }
);

export default axiosInstance;
