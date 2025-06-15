import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCampusJobs } from '../../services/campusService';
import { useAuth } from '../../context/AuthContext';


const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getCampusJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch campus jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-success" onClick={() => navigate('/campus/post-job')}>
          + Post New Job
        </button>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Total Jobs Posted</h5>
          <p className="card-text fs-4">{jobs.length}</p>
        </div>
      </div>

      <h4 className="mb-3">Your Posted Jobs</h4>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div className="col-md-6 mb-4" key={job.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{job.title}</h5>
                  <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                  <p className="mb-2">{job.description}</p>
                  <div className="mt-auto">
                    <Link
                        to={`/campus/job/${job.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary w-100"
                    >
                      View 
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
