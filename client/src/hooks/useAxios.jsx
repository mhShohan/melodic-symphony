import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/config';

const axiosSecure = axios.create({
  baseURL: baseUrl,
});

const useAxios = () => {
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, []);

  return axiosSecure;
};

export default useAxios;
