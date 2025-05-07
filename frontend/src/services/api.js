import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  
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
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - Logging out');
      sessionStorage.clear(); // Clear token if used
      // Optional: Redirect to respective login
      if (window.location.pathname.includes('/company')) {
        window.location.href = '/company/login';
      } else if (window.location.pathname.includes('/student')) {
        window.location.href = '/student/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
