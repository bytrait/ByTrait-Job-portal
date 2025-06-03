
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import CommonModal from '../components/common/CommonModal';
import { applyToJob } from '../services/jobApplicationService';
import { toast } from 'react-toastify';

const JobDescription = () => {
    const { id } = useParams("id");
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isCustomResume, setIsCustomResume] = useState(false);
    const [resumeLink, setResumeLink] = useState('');
    const [isApplied, setIsApplied] = useState(false);
    const [isAppliedLink, setIsAppliedLink] = useState(false);

    useEffect(() => {
        // Fetch job details using the id
        const fetchJobDetails = async () => {
            try {
                const data = await getJobById(id);
                console.log('Job data:', data);
                setJob(data);
                if (data.applyLink) {
                    console.log('Job has an apply link:', data.applyLink);
                    setIsAppliedLink(true);
                } else {
                    setIsAppliedLink(false);
                }
                setIsApplied(data.alreadyApplied);                
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);


    const handleApply = async () => {
        const response = await applyToJob(job.id, isCustomResume, resumeLink);
        if (response.status === 201) {
            
            toast.success('Application submitted successfully!');
            setShowModal(false);
            setResumeLink(''); 
            setIsCustomResume(false); 
            setIsApplied(true); 
           
        } else if (response.status === 400) {
            toast.error(response.data.message || 'You have already applied to this job.');
        }
        else {
            toast.error('Failed to apply for the job. Please try again later.');
        }
    };

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


                        {isAppliedLink ? (
                            <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 fs-5">
                                Apply <i className="bi bi-box-arrow-up-right ms-1"></i>
                            </a>
                        ) : isApplied ? (
                            <div className="btn btn-success w-100 fs-5" disabled>
                                Applied
                            </div>
                        ) : (
                            <div className="btn btn-primary w-100 fs-5"
                                onClick={() => setShowModal(true)}
                            >
                                Apply
                            </div>
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
            {showModal && (
                <CommonModal
                    title={`Apply for ${job.title}`}
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                >

                    <div className="mb-1 d-flex flex-row gap-2">
                        <input
                            type="radio"
                            name="resumeType"
                            value="bytrait"
                            checked={isCustomResume === false}
                            onChange={() => setIsCustomResume(false)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <label className="form-label">Use ByTrait Resume
                        </label>
                    </div>

                    {/* <div className="">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="resumeType"
                            // id="bytrait"
                            value="bytrait"
                            checked={resumeType === 'bytrait'}
                            onChange={() => setResumeType('bytrait')}
                        />
                        <label className="form-check-label" htmlFor="bytrait">
                            Use ByTrait Resume
                        </label>
                    </div> */}

                    <div className="mb-1 d-flex flex-row gap-2">
                        <input
                            className=""
                            type="radio"
                            name="resumeType"
                            id="custom"
                            value="custom"
                            checked={isCustomResume === true}
                            onChange={() => setIsCustomResume(true)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <label className="form-check-label" htmlFor="custom">
                            Provide Custom Resume Link
                        </label>
                    </div>

                    {isCustomResume === true && (
                        <>
                            <div className="mb-1">
                                <label htmlFor="resumeLink" className="form-label"> <strong>Resume Link</strong></label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="resumeLink"
                                    placeholder="Paste your resume link"
                                    value={resumeLink}
                                    onChange={(e) => setResumeLink(e.target.value)}
                                />
                            </div>
                            <small className="text-muted d-block">

                                <i className="bi bi-exclamation-triangle-fill text-warning me-1 fs-5"></i>
                                You may upload your resume to Google Drive or a similar platform. Please ensure the link is publicly accessible so recruiters can view it without restrictions.                            </small>
                        </>
                    )}


                    <div className="d-flex justify-content-end mt-3">
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => {
                                // Handle apply action here
                                handleApply();

                            }}
                        >
                            Apply
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </CommonModal>)
            }


        </div>
    );
}

export default JobDescription;
