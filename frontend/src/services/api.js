import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  
  withCredentials: true, // Needed for cookie-based auth (students)
});

// Attach JWT for company users (from sessionStorage)
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('compnay-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // For company users
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling (e.g., 401 Unauthorized)
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('company-token'); // ✅ fixed typo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default API;
