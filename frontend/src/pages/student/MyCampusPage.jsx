import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCampusJobs } from '../../services/campusService';
import { useNavigate } from 'react-router-dom';

const MyCampusPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchJobs = async () => {
        try {
            const data = await getCampusJobs();

            setJobs(data);
        } catch (err) {
            toast.error("Failed to load campus jobs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Campus Jobs</h4>

            {loading ? (
                <p>Loading campus jobs...</p>
            ) : jobs.length === 0 ? (
                <p>No campus jobs available currently.</p>
            ) : (
                jobs.map((job) => (
                    <div key={job.id} className="mb-3 bg-light rounded">
                        <div className="mb-3 border px-3 py-4 rounded job-card" 
                        onClick={() => navigate(`/my-campus/job/${job.id}`)}>

                            <div className='d-flex align-items-center mb-1'>
                                <div>
                                    <h5 className='card-title mb-1'><strong className="text-black">{job.title}</strong></h5>
                                    <p className='card-subtitle text-muted'><strong>{job.company_name}</strong></p>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <p><i className='bi bi-geo-alt text-primary'></i> {job.location}</p>
                                <p><i className='bi bi-clock text-primary'></i> {job.job_type || NaN}</p>
                                <p><i className='text-primary bi bi-mortarboard'></i> {job.qualification}</p>
                                <p><i className='text-primary bi bi-wallet'></i>₹{job.salary}</p>
                            </div>
                            <div>
                                {job.skills && job.skills.map((skill, idx) => (
                                    <span key={idx} className="text-muted me-2">{skill}</span>
                                ))}
                            </div>
                            <p><strong>Deadline:</strong>{new Date(job.deadline).toLocaleDateString('en-GB')}</p>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyCampusPage;
