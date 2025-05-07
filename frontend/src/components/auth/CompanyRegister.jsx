import React, { useState, useEffect } from 'react';
import { registerAndLogin, sendOtpForRegistration } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CompanyRegister = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Check if all fields are filled
        setIsFormValid(email.trim() !== '' && otp.trim() !== '' && companyName.trim() !== '');
    }, [email, otp, companyName]);

    const handleSendOtp = async () => {
        try {
            const res = await sendOtpForRegistration(email);
            if (res.status === 200) {
                toast.success('OTP sent to your email');
            }
        } catch (err) {
            toast.error('Error sending OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await registerAndLogin(companyName, email, otp);
            console.log(res);
            if (res.status === 201) {
                sessionStorage.setItem('compnay-token', res.data.token);
                sessionStorage.setItem('role', 'company');
                toast.success('Login successful');

                useNavigate('/company/dashboard');

            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error verifying OTP');
        }
    };

    return (
        <div className="auth float-start vh-100 d-flex flex-column justify-content-center">
            <div className="flex">
                <div className="col-md-6">
                    <div className="p-4">
                        <img src="/src/assets/bytrait_logo.png" alt="ByTrait Logo" className="img-fluid" style={{ maxWidth: '250px' }} />
                        <div className="fs-3">Company Register</div>
                    </div>
                    <div className="p-4">
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text text-primary">
                                    <i className="bi bi-building"></i>
                                </span>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Company Name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
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
                                    required
                                />
                                <button className="btn btn-primary" type="button" onClick={handleSendOtp}>Send OTP</button>
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
                                    required
                                />
                            </div>
                        </div>
                        <button
                            className="btn btn-primary w-100"
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={!isFormValid} // Disable button if form is invalid
                        >
                            Login
                        </button>
                        <div className="text-center mt-3">
                            <p className="mb-0">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyRegister;
