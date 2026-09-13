import axios from "axios";

const url = import.meta.env.VITE_GATEWAY_URL;

export const apiClient = axios.create({
  baseURL: url,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});




export const authRegister = (data: { name: string; email: string; password: string }) => {
  return apiClient.post("/auth/register", data)
}

export const authLogin = (data: { email: string; password: string }) => {
  return apiClient.post("/auth/login", data)
}

export const refreshToken = () => {
  return apiClient.post("/auth/refresh");
};

export const getMe = () => {

  return apiClient.get("/auth/me");

};