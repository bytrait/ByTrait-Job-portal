import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const CompanyDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h2 className="mb-4">Welcome, {user?.companyName || 'Company'} 👋</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <Link to="/company/job-post" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">📄 Post a Job</h5>
                <p className="card-text">Start hiring by posting a new job</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/company/job-list" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">📋 View Jobs</h5>
                <p className="card-text">Manage all your posted jobs</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
