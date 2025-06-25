import axios from 'axios';
import { hideLoader, showLoader } from '../utills/globalLoader';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});
 
axiosInstance.interceptors.request.use(
  (config) => {
   if (config.loader !== false) {
      showLoader();
    }
    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.loader !== false) {
      hideLoader();
    }
    return response;
  },
  (error) => {
    if (error.config?.loader !== false) {
      hideLoader();
    }
    const msg =
      error?.response?.data?.message || 'Something went wrong. Try again!';
    return Promise.reject({ ...error, message: msg });
  }
);
export  {axiosInstance};
