import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
baseURL: import.meta.env.VITE_API_URL as string,
});

export default api;