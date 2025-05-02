import React, { useState } from 'react';
import { sendOtp, verifyOtp } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email');
  const [companyName,setCompanyName] = useState();

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOtp(email,companyName);
      setStep('otp');
    } catch (err) {
      alert('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'company');

      // check profile status and redirect
      if (res.data.isProfileComplete) {
        navigate('/company/dashboard');
      } else {
        navigate('/company/complete-profile');
      }
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Company Login</h2>
      {step === 'email' ? (
        <>

        <label htmlFor="companyName">Company Name</label>
        <input 
         className='form-control my-2'
         type='text'
         placeholder='Enter Company email'
         value={companyName}
         onChange={(e)=> setCompanyName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
          <input
            className="form-control my-2"
            type="email"
            placeholder="Enter company email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            className="form-control my-2"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleVerifyOtp}>Verify & Login</button>
        </>
      )}
    </div>
  );
};

export default CompanyLogin;
