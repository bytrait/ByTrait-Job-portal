import React, { useState, useEffect } from 'react';
import { sendOtpForLogin, varifyOTPAndLogin } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Loader from '../common/Loader';
import logo from '../../assets/bytrait_logo.png';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user?.role === 'company') {
      navigate('/company/dashboard', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && otp.trim() !== '');
  }, [email, otp]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await sendOtpForLogin(email);
      if (res.status === 200) {
        toast.success('OTP sent to your email');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await varifyOTPAndLogin(email, otp);
      if (res.status === 200) {
        sessionStorage.setItem('company-token', res.data.token);
        sessionStorage.setItem('role', 'company');
        toast.success('Login successful');
        window.location.reload();
        // Do not navigate here — let AuthContext detect the token and handle redirect
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Optional loading UI
  if (loading) return <Loader />;

  return (
    <div className="auth float-start vh-100 d-flex flex-column justify-content-center">
      <div className="flex">
        <div className="col-md-6">
          <div className="p-4">
            <img src={logo} alt="ByTrait Logo" className="img-fluid" style={{ maxWidth: '250px' }} />
            <div className="fs-3">Company Login</div>
          </div>
          <div className="p-4">
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text text-primary">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSendOtp}>Send OTP</button>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text text-primary">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleVerifyOtp}
              disabled={!isFormValid}
            >
              Login
            </button>
            <div className="text-center mt-3">
              <p className="mb-0">Don't have an account? <Link to="/company/register" className="text-primary">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
