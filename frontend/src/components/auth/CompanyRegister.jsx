import React, { useState } from 'react';
import { registerAndLogin, sendOtp } from '../../services/authService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CompanyRegister = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleSendOtp = async () => {
        try {
            const res = await sendOtp(email);
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
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', 'company');
                toast.success('Login successful');
                // TODO: Redirect after successful login
            }
        } catch (err) {
            toast.error('Invalid OTP');
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
                        <button className="btn btn-primary w-100" type="button" onClick={handleVerifyOtp}>Login</button>
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
