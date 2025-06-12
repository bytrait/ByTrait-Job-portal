import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectPage = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    window.location.href = 'https://user-app.bytrait.com/login'; // external login app
  };

  const handleCompanyLogin = () => {
    navigate('/company/login');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h2 className="mb-4">Welcome to ByTrait Job Portal</h2>
      <p className="mb-4">Please select your role to continue</p>
      <div className="d-flex gap-4">
        <button className="btn btn-primary btn-lg" onClick={handleUserLogin}>
          I'm a Student / TPO 
        </button>
        <button className="btn btn-success btn-lg" onClick={handleCompanyLogin}>
          I'm a Company
        </button>
      </div>
    </div>
  );
};

export default RoleSelectPage;
