import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.pre-bnvo.com", // Reemplaza con la URL correcta si es necesario
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el X-Device-Id a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const deviceId = process.env.NEXT_PUBLIC_DEVICE_ID;
    if (deviceId) {
      config.headers["X-Device-Id"] = deviceId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
