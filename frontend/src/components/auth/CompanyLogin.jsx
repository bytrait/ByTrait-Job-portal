import React, { useState } from 'react';
import { sendOtp } from '../../services/authService';
import { Link } from 'react-router-dom';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await sendOtp(email, companyName);
      if (res.status === 200) {
        alert('OTP sent to your email');
      }
    } catch (err) {
      alert('Error sending OTP');
    }
  }

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', 'company');
        alert('Login successful');
        // Redirect to company dashboard or profile completion
      }
    } catch (err) {
      alert('Invalid OTP');
    }
  }


  return (
    <div className="auth float-start vh-100 d-flex flex-column justify-content-center">
      <div className="flex">
        <div className="col-md-6">
          <div className="p-4">
            <img src="/src/assets/bytrait_logo.png" alt="ByTrait Logo" className="img-fluid" style={{ maxWidth: '250px' }} />
            <div className="fs-3">Company Login </div>
          </div>
          <div className='p-4'>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text text-primary">
                  <i class="bi bi-envelope"></i>
                </span>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleSendOtp}>Send OTP</button>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text text-primary">
                  <i class="bi bi-lock"></i>
                </span>
                <input
                  className="form-control"
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary w-100" type="button" onClick={handleVerifyOtp}>Login</button>
            <div className="text-center mt-3">
              <p className="mb-0">Don't have an account? <Link to="/register" className="text-primary">Register</Link></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;
