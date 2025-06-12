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
        console.log('✅ Authenticated as non-company user:', res.data);
      } catch (err) {
        const token = sessionStorage.getItem('company-token');
        console.log('🔍 Checking company-token in sessionStorage:', token);

        if (token) {
          try {
            const res = await getCompanyInfo(token);
            setUser({ ...res.data, role: 'company' });
            console.log('✅ Authenticated as company:', res.data);
          } catch (companyErr) {
            console.error('❌ Company auth failed:', companyErr.response?.data || companyErr.message);
            sessionStorage.removeItem('company-token'); // Clear bad token
            setUser(null);
          }
        } else {
          console.warn('⚠️ No token found. Not authenticated.');
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
