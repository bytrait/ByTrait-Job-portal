import React, { useState } from 'react';
import { sendOtp } from '../../services/authService';

const CompanyRegister = () => {
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
        <div className="container  float-start vh-100 d-flex flex-column justify-content-center mx-md-5">
            <div className="flex">
                <div className="col-md-6">
            <div className="p-4 mb-4">
                <img src="/src/assets/bytrait_logo.png" alt="ByTrait Logo" className="img-fluid" style={{ maxWidth: '250px' }} />
            </div>
            <div className='p-4'>
                <div className="mb-3">
                    <label htmlFor="companyName" className="form-label">Company Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id="companyName"
                        placeholder="Enter Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            placeholder="Enter Company Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className="btn btn-primary" type="button" onClick={handleSendOtp}>Send OTP</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
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
                <button className="btn btn-success w-100" type="button" onClick={handleVerifyOtp}>Verify & Login</button>
            </div>
            </div>
            </div>
        </div>
    );
}

export default CompanyRegister;
