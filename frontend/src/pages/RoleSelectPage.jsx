import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleSelectPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'company') {
        navigate('/company/dashboard');
      } else if (user.role === 'student') {
        navigate('/home');
      } else if (user.role === 'TPO') {
        navigate('/campus/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [user, navigate]);

  const handleUserLogin = () => {
    window.location.href = 'https://college.bytrait.com/login';
  };

  const handleCompanyLogin = () => {
    navigate('/company/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5 rounded-4 animate__animated animate__fadeIn" style={{ width: '100%', maxWidth: '480px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Welcome to ByTrait Job Portal</h2>
          <p className="text-muted">Select your role to get started</p>
        </div>
        <div className="d-grid gap-4">
          <button className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
            onClick={handleUserLogin}>
            <i className="bi bi-person-circle fs-4"></i>
            Continue as Student or TPO
          </button>
          <button className="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2"
            onClick={handleCompanyLogin}>
            <i className="bi bi-building fs-4"></i>
            Continue as Employer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectPage;
