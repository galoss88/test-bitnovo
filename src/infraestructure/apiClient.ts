import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://payments.pre-bnvo.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const deviceId =
      typeof window !== "undefined"
        ? localStorage.getItem("device_id") || process.env.NEXT_PUBLIC_DEVICE_ID
        : process.env.NEXT_PUBLIC_DEVICE_ID;

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
