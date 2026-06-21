import axios from "axios";

const NOTEHUB_BASE_URL = "https://notehub-public.goit.study/api/notes";

const notehubApi = axios.create({
  baseURL: NOTEHUB_BASE_URL,
});

notehubApi.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default notehubApi;
