import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserInfo, getCompanyInfo } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchAuth = async () => {
      setAuthLoading(true);

      try {
        const res = await getUserInfo();
        setUser({ ...res.data, role: res.data.role || 'student' });
      } catch (err) {
        const token = sessionStorage.getItem('company-token');

        if (token) {
          try {
            const res = await getCompanyInfo(token);
            setUser({ ...res.data, role: 'company' });
          } catch (companyErr) {
            sessionStorage.removeItem('company-token'); 
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }

      setAuthLoading(false);
    };

    fetchAuth();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
