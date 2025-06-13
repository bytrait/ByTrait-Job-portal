
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  getJobByIdForCompany } from '../../services/jobService';
import { applyToJob } from '../../services/jobApplicationService';
import { toast } from 'react-toastify';

const JobDescription3 = () => {
    const { id } = useParams("id");
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isCustomResume, setIsCustomResume] = useState(false);
    const [resumeLink, setResumeLink] = useState('');
    const [isApplied, setIsApplied] = useState(false);
    const [isAppliedLink, setIsAppliedLink] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        // Fetch job details using the id
        const fetchJobDetails = async () => {
            try {
                const data = await getJobByIdForCompany(id);
                console.log('Job data:', data);
                setJob(data);           
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);


    if (loading) {
        return <div className="container text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container">
            <div
                key={job.id}
                className='mb-3 border px-3 py-4 rounded '
            >
                <div className='card-body'>
                    <div className="text-muted mb-2">
                        <strong className="bg-secondary p-2 rounded text-secondary">{new Date(job.createdAt).toLocaleDateString('en-GB')}</strong>
                    </div>

                    <div className='d-flex align-items-center mb-3'>
                        <div className='d-flex align-items-center gap-3'>
                            <img src={job.Company.imageUrl} alt={`${job.companyName} logo`} className='rounded-circle' style={{ width: '50px', height: '50px' }} />
                            <div>
                                <h5 className='card-title mb-0'><strong className="text-black">{job.title}</strong></h5>
                                <p className='card-subtitle text-muted'><strong>{job.Company.companyName}</strong></p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className='job-details d-flex flex-wrap mb-2 col-9'>
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

                        <div className='col-3' >


                    
                            <div className="btn btn-primary w-100 fs-5"
                                onClick={() => {navigate(`/company/edit-job-post/${job.id}`) }
                                }
                            >
                                Edit
                            </div>
                        


                        
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
                            <div className="text-muted">{job.jobType}</div>
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="col-2">
                            <i className='fs-3 text-primary bi bi-briefcase'></i>
                        </div>
                        <div className="col-10">
                            <strong>Category</strong>
                            <div className="text-muted">{job.Industry.name}</div>
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
                            <div className="text-muted">₹{job.minSalary} - ₹ {job.maxSalary}</div>
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
}

export default JobDescription3;
