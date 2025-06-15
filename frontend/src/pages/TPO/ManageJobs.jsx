import React, { useEffect, useState } from 'react';
import { deleteCampusJob, getCampusJobs } from '../../services/campusService';
import { toast } from 'react-toastify';
import CommonModal from '../../components/common/CommonModal';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const data = await getCampusJobs();
      console.log('Fetched Jobs:', data);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCampusJob(selectedJob.id);
      toast.success('Job deleted successfully!');

      // Optimistically update state without re-fetching
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== selectedJob.id));
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete job');
    } finally {
      setShowModal(false);
      setSelectedJob(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Campus Jobs</h3>

      <div className="table-responsive">
        <table className="table  align-middle border-top">
          <thead className="table-light border-bottom">
            <tr>
              <th className="border-0" style={{ width: '60%' }}>Job Title</th>
              <th className="border-0 text-center" style={{ width: '15%' }}>Applications</th>
              <th className="border-0 text-center" style={{ width: '25%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No jobs found.</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-bottom">
                  <td className="border-0">
                    <div className="fw-bold">{job.title}</div>
                    <div className="text-muted small mt-1">
                      <i className="bi bi-geo-alt me-1 text-primary"></i> {job.location} &nbsp;|&nbsp;
                      <i className="bi bi-briefcase me-1 text-primary"></i> {job.job_type || 'Full Time'} &nbsp;|&nbsp;
                      <i className="bi bi-calendar-event me-1 text-primary"></i>
                      <strong className='text-danger'>
                        Deadline {new Date(job.deadline).toLocaleDateString('en-IN') || 'N/A'}
                      </strong>
                    </div>
                  </td>
                  <td className="border-0 text-center text-primary fw-semibold">
                    <strong
                      className="text-decoration-none cursor-pointer d-inline-block fw-normal hover-bold"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/campus/applications/${job.id}`)}
                    >
                      ({job.applicationCount || 0}) Applications
                    </strong>
                  </td>
                  <td className="border-0 text-center">
                    <div className="d-flex justify-content-center gap-3">
                      <button
                        className="btn btn-sm btn-primary"
                        title="View"
                        onClick={() => navigate(`/campus/job/${job.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Delete"
                        onClick={() => handleDeleteClick(job)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <CommonModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete <strong>{selectedJob?.title}</strong>?</p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-secondary me-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={confirmDelete}
          >
            Yes, Delete
          </button>
        </div>
      </CommonModal>
    </div>
  );
};

export default ManageJobs;
