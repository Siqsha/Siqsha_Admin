import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api`;

// authToken-less instance for authentication requests
export const authInstance = axios.create({
  baseURL: baseUrl,
});

// authToken-based instance for authenticated requests
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});