import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://payments.pre-bnvo.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // ✅ Verificamos si estamos en el cliente antes de acceder a localStorage
    let deviceId = process.env.NEXT_PUBLIC_DEVICE_ID; // ✅ Valor por defecto desde las variables de entorno

    if (typeof window !== "undefined") {
      const storedDeviceId = localStorage.getItem("device_id");
      if (storedDeviceId) {
        deviceId = storedDeviceId;
      }
    }

    if (deviceId) {
      config.headers["X-Device-Id"] = deviceId;
    }

    return config;
  },
  (error) => {
    console.error("Error en el interceptor de solicitudes:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
