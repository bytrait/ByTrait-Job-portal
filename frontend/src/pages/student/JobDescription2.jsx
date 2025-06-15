import React, { useEffect, useState } from 'react';
import { getCampusJobById } from '../../services/campusService';
import { useParams } from 'react-router-dom';
import { applyToCampusJob } from '../../services/campusApplicationService';
import { toast } from 'react-toastify';

const JobDescription2 = () => {
    const { jobId } = useParams("jobId");
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const data = await getCampusJobById(jobId);
                console.log(data);
                setJob(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleApply = async () => {
        if (!job.applyLink) return;
      
        try {
          await applyToCampusJob(job.id);
          toast.success('Application submitted!');
      
          const url = job.applyLink.startsWith('http') ? job.applyLink : `https://${job.applyLink}`;
          window.open(url, '_blank');  // open in new tab
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to apply');
          console.error('Apply Error:', error);
        }
      };
      
    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div
                key={job.id}
                className='mb-3 border px-3 py-4 rounded '
            >
                <div className='card-body'>
                    {/* <div className="text-muted mb-2">
                        <strong className="bg-secondary p-2 rounded text-secondary">{new Date(job.createdAt).toLocaleDateString('en-GB')}</strong>
                    </div> */}

                    <div className='d-flex align-items-center mb-3'>
                        <div className='d-flex align-items-center gap-3'>
                            <div>
                                <h5 className='card-title mb-0'><strong className="text-black">{job.title}</strong></h5>
                                <p className='card-subtitle text-muted'><strong>{job.company_name}</strong></p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className='job-details d-flex flex-wrap mb-2 col-9'>
                            <span className='me-2'>
                                <i className='bi bi-clock me-1 text-primary'></i>
                                <strong className='text-muted'>{job.job_type}</strong>
                            </span>
                            <span className='me-2'>
                                <i className='bi bi-currency-dollar me-1 text-primary'></i>
                                <strong className='text-muted'>{job.salary}</strong>
                            </span>
                            <span>
                                <i className='bi bi-geo-alt me-1 text-primary'></i>
                                <strong className='text-muted'>{job.location}</strong>
                            </span>
                        </div>
                        <div className="mt-3 col-3 d-flex justify-content-end">
                            {job.applyLink && (
                                <button className="btn btn-primary w-100" onClick={handleApply}>
                                    <strong>Apply <i className="bi bi-box-arrow-up-right ms-2"></i></strong>
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <div className="d-flex gap-2">
                <div className="col-3 p-3 rounded border" style={{ height: 'fit-content' }}>
                    <h5>Job Overview</h5>
                    <div className="d-flex gap-2 mb-2">
                        <div className="col-2">
                            <i className='fs-3 text-primary bi bi-person'></i>
                        </div>
                        <div className="col-10">
                            <strong>Job Title</strong>
                            <div className="text-muted">{job.title}</div>
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="col-2">
                            <i className='fs-3 text-primary bi bi-clock'></i>
                        </div>
                        <div className="col-10">
                            <strong>Job Type</strong>
                            <div className="text-muted">{job.job_type}</div>
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="col-2">
                            <i className='fs-3 text-primary bi bi-mortarboard'></i>
                        </div>
                        <div className="col-10">
                            <strong>Qualification</strong>
                            <div className="text-muted">{job.qualification}</div>
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="col-2">
                            <i className='fs-3 text-primary bi bi-wallet'></i>
                        </div>
                        <div className="col-10">
                            <strong>Offered Salary</strong>
                            <div className="text-muted">₹{job.salary}</div>
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="col-2">
                            <i className='fs-3 text-primary bi bi-geo-alt'></i>
                        </div>
                        <div className="col-10">
                            <strong>Location</strong>
                            <div className="text-muted">{job.location}</div>
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="col-2">
                            <i className='fs-3 text-primary bi bi-calendar'></i>
                        </div>
                        <div className="col-10">
                            <strong className='text-danger'>Deadline</strong>
                            <div className="text-muted">{new Date(job.deadline).toLocaleDateString('en-GB')}</div>
                        </div>
                    </div>
                </div>
                <div className="col-9 p-3 rounded border">
                    {job.description}

                    <ul className="mt-3 list-inline">
                        {job.skills.map((skill, index) => (
                            <li key={index} className="list-inline-item me-2">
                                <span className="badge bg-secondary d-flex align-items-center p-3 mb-1 text-secondary">
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

export default JobDescription2;
