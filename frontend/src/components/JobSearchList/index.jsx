import { useState } from 'react';

const JobList = ({ jobs }) => {

  return (
    <div className='container rounded bg-light'>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div 
            key={job.id} 
            className='mb-3 border px-3 py-4 rounded job-card' 
            onClick={() => window.open(`/job/${job.id}`, '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <div className='card-body'>
              <div className="text-muted mb-2">
                <strong className="bg-secondary p-2 rounded text-secondary">{new Date(job.createdAt).toLocaleDateString('en-GB')}</strong>
              </div>

              <div className='d-flex align-items-center mb-3'>
                <div className='d-flex align-items-center gap-3'>
                  <img src={job.Company.imageUrl} alt={`${job.companyName} logo`} className='rounded-circle' style={{ width: '50px', height: '50px' }} />
                  <div>
                    <h5 className='card-title mb-0'><strong>{job.title}</strong></h5>
                    <p className='card-subtitle text-muted'><strong>{job.Company.companyName}</strong></p>
                  </div>
                </div>
              </div>

              <div className='job-details d-flex flex-wrap mb-2'>
                <span className='me-2'>
                  <i className='bi bi-briefcase me-1 text-primary'></i>
                  <strong className='text-muted'>{job.Industry.name}</strong>
                </span>
                <span className='me-2'>
                  <i className='bi bi-clock me-1 text-primary'></i>
                  <strong className='text-muted'>{job.jobType}</strong>
                </span>
                <span className='me-2'>
                  <i className='bi bi-currency-dollar me-1 text-primary'></i>
                  <strong className='text-muted'>{job.minSalary} - {job.maxSalary}</strong>
                </span>
                <span>
                  <i className='bi bi-geo-alt me-1 text-primary'></i>
                  <strong className='text-muted'>{job.location}</strong>
                </span>
              </div>

              <p className='text-muted'>
                {job.skills.join(', ')}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center text-muted'><strong>No jobs found</strong></p>
      )}
    </div>
  );

  // Add the following CSS to your styles
  /*
  .job-card:hover {
    background-color: #f8f9fa; // Light color on hover
  }
  */
};

export default JobList;