import React, { useEffect, useState } from 'react';
import { getMyAppliedJobs } from '../../services/jobService';
import { useNavigate } from 'react-router-dom';

const MyJobPage = () => {
    const [myJobs, setMyJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    navigation = useNavigate();

    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                const jobs = await getMyAppliedJobs();
                setMyJobs(jobs);
            } catch (error) {
                console.error('Error fetching my jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyJobs();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="container rounded bg-light mt-4">
            {myJobs.length > 0 ? (
                myJobs.map((job) => (
                    <div
                        key={job.id}
                        className="mb-3 border px-3 py-4 rounded job-card"
                        onClick={() => navigation(`/job/${job.Job.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-body">
                            <div className="text-muted mb-2">
                                <strong className="bg-secondary p-2 rounded text-secondary">
                                    {new Date(job.createdAt).toLocaleDateString('en-GB')}
                                </strong>
                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={job.Job.Company.imageUrl}
                                        alt={`${job.Job.Company.companyName} logo`}
                                        className="rounded-circle"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                    <div>
                                        <h5 className="card-title mb-0">
                                            <strong>{job.Job.title}</strong>
                                        </h5>
                                        <p className="card-subtitle text-muted">
                                            <strong>{job.Job.Company.companyName}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="job-details d-flex flex-wrap mb-2">
                                <span className="me-2">
                                    <i className="bi bi-briefcase me-1 text-primary"></i>
                                    <strong className="text-muted">{job.Job.Industry.name}</strong>
                                </span>
                                <span className="me-2">
                                    <i className="bi bi-clock me-1 text-primary"></i>
                                    <strong className="text-muted">{job.Job.jobType}</strong>
                                </span>
                                <span className="me-2">
                                    <i className="bi bi-currency-dollar me-1 text-primary"></i>
                                    <strong className="text-muted">
                                        {job.Job.minSalary} - {job.Job.maxSalary}
                                    </strong>
                                </span>
                                <span>
                                    <i className="bi bi-geo-alt me-1 text-primary"></i>
                                    <strong className="text-muted">{job.Job.location}</strong>
                                </span>
                            </div>

                            <p className="text-muted">{job.Job.skills.join(', ')}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-muted">
                    <strong>No jobs found</strong>
                </p>
            )}
        </div>
    );
};

export default MyJobPage;
