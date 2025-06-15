import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCampusJobById } from '../../services/campusService';

const JobDescription4 = () => {
  const [job, setJob] = useState(null);
  const { jobId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const data = await getCampusJobById(jobId);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div key={job.id} className="mb-3 border px-3 py-4 rounded">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <div>
                <h5 className="card-title mb-0"><strong className="text-black">{job.title}</strong></h5>
                <p className="card-subtitle text-muted"><strong>{job.company_name}</strong></p>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="job-details d-flex flex-wrap mb-2 col-9">
              <span className="me-3">
                <i className="bi bi-clock me-1 text-primary"></i>
                <strong className="text-muted">{job.job_type}</strong>
              </span>
              <span className="me-3">
                <i className="bi bi-currency-rupee me-1 text-primary"></i>
                <strong className="text-muted">{job.salary}</strong>
              </span>
              <span>
                <i className="bi bi-geo-alt me-1 text-primary"></i>
                <strong className="text-muted">{job.location}</strong>
              </span>
            </div>

            <div className="mt-3 col-3 d-flex justify-content-end">
              <button className="btn btn-outline-primary w-100"
                onClick={() => navigate(`/campus/edit-job/${job.id}`)}
              >
                <strong>Edit <i className="bi bi-pencil-square ms-2"></i></strong>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <div className="col-3 p-3 rounded border" style={{ height: 'fit-content' }}>
          <h5>Job Overview</h5>

          <div className="d-flex gap-2 mb-2">
            <div className="col-2">
              <i className="fs-3 text-primary bi bi-person"></i>
            </div>
            <div className="col-10">
              <strong>Job Title</strong>
              <div className="text-muted">{job.title}</div>
            </div>
          </div>

          <div className="d-flex mb-2">
            <div className="col-2">
              <i className="fs-3 text-primary bi bi-clock"></i>
            </div>
            <div className="col-10">
              <strong>Job Type</strong>
              <div className="text-muted">{job.job_type}</div>
            </div>
          </div>

          <div className="d-flex mb-2">
            <div className="col-2">
              <i className="fs-3 text-primary bi bi-mortarboard"></i>
            </div>
            <div className="col-10">
              <strong>Qualification</strong>
              <div className="text-muted">{job.qualification}</div>
            </div>
          </div>

          <div className="d-flex mb-2">
            <div className="col-2">
              <i className="fs-3 text-primary bi bi-wallet"></i>
            </div>
            <div className="col-10">
              <strong>Offered Salary</strong>
              <div className="text-muted">₹{job.salary}</div>
            </div>
          </div>

          <div className="d-flex mb-2">
            <div className="col-2">
              <i className="fs-3 text-primary bi bi-geo-alt"></i>
            </div>
            <div className="col-10">
              <strong>Location</strong>
              <div className="text-muted">{job.location}</div>
            </div>
          </div>

          <div className="d-flex mb-2">
            <div className="col-2">
              <i className="fs-3 text-primary bi bi-calendar"></i>
            </div>
            <div className="col-10">
              <strong className="text-danger">Deadline</strong>
              <div className="text-muted">{new Date(job.deadline).toLocaleDateString('en-IN')}</div>
            </div>
          </div>
        </div>

        <div className="col-9 p-3 rounded border">
          <h5 className="mb-3">Job Description</h5>
          <p>{job.description}</p>

          <h6 className="mt-4">Required Skills</h6>
          <ul className="mt-2 list-inline">
            {job.skills.map((skill, index) => (
              <li key={index} className="list-inline-item me-2">
                <span className="badge bg-secondary d-flex align-items-center p-2 mb-1 text-secondary">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDescription4;
