import React, { useEffect, useState } from 'react';
import { deleteJob, getallcompanyJobs } from '../../services/jobService';
import { useNavigate } from 'react-router-dom';
import CommonModal from '../../components/common/CommonModal';

const JobListPage = () => {
  const navigation = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null); // Stores job to delete

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getallcompanyJobs();
        setJobs(response);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const confirmDelete = (job) => {
    setJobToDelete(job);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteJob(jobToDelete.id);
      setJobs(jobs.filter(job => job.id !== jobToDelete.id));
      setShowModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className='container mt-4'>
      <table className='table'>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Applications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} style={{ verticalAlign: 'middle' }}>
              <td>
                <h4>{job.title}</h4>
                <p className='text-muted'>
                  <i className="bi bi-building text-primary ms-1"></i> {job.Industry.name}
                  <i className="bi bi-clock text-primary ms-1"></i> {job.jobType}
                  <i className="bi bi-currency-dollar text-primary ms-1"></i> Rs {job.minSalary} - Rs {job.maxSalary}
                  <i className="bi bi-geo-alt text-primary ms-1"></i> {job.location}
                </p>
              </td>
              <td>
                <div
                  className='text-primary'
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                  onClick={() => navigation(`/company/applications/${job.id}`)}
                >
                  <i className="bi bi-people-fill"></i> ({job.applicationCount}) Applications
                </div>
              </td>
              <td>
                <button className='btn btn-primary me-2'
                onClick={()=> navigation(`/company/job/${job.id}`)}
                >
                  <i className="bi bi-eye"></i> View Post
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => confirmDelete(job)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Confirm Delete */}
      <CommonModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setJobToDelete(null);
        }}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete the job: <strong>{jobToDelete?.title}</strong>?</p>
        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-secondary me-2'
            onClick={() => {
              setShowModal(false);
              setJobToDelete(null);
            }}
          >
            Cancel
          </button>
          <button className='btn btn-danger' onClick={handleDeleteConfirmed}>
            Delete
          </button>
        </div>
      </CommonModal>
    </div>
  );
};

export default JobListPage;
