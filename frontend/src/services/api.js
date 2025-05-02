// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, 
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response?.status === 401) {
      console.warn('Unauthorized - redirecting to login');
    }
    return Promise.reject(error);
  }
);

export default API;
