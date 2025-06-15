import React from 'react';
import { Link } from 'react-router-dom';

const WaitingForApproval = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="bg-light p-5 rounded-4 shadow text-center" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="mb-4">
          <i className="bi bi-hourglass-split text-warning" style={{ fontSize: '3rem' }}></i>
        </div>

        <h2 className="fw-bold text-dark mb-3">We're Reviewing Your Company Profile</h2>

        <p className="fs-5 text-secondary mb-4">
          Thank you for registering your company with us. Your request is currently under review by our admin team.
        </p>

        <div className="text-start px-4">
          <p className="text-muted mb-3">
            <i className="bi bi-shield-lock-fill text-success me-2"></i>
            To protect students and maintain the quality of job listings, we manually verify each company before granting access.
          </p>
          <p className="text-muted mb-3">
            <i className="bi bi-hourglass-top text-primary me-2"></i>
            This process helps us prevent scams, fake job offers, and misuse of our platform.
          </p>
          <p className="text-muted mb-3">
            <i className="bi bi-envelope-open text-info me-2"></i>
            You’ll be notified via email as soon as your request is approved.
          </p>
        </div>

        <hr className="my-4" />

        <p className="text-secondary small">
          Need help? Contact us at <a href="mailto:contact@bytrait.com">contact@bytrait.com</a>
        </p>

        <Link to="/company/login" className="btn btn-outline-primary mt-3">
          <i className="bi bi-box-arrow-in-right me-2"></i>Back to Login
        </Link>
      </div>
    </div>
  );
};

export default WaitingForApproval;
