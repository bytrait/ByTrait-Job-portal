import React, { useEffect, useState } from 'react';
import { getScrapedJobs } from '../../services/jobScrapService';

const AllScrapJobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function loadJobs() {
            try {
                setLoading(true);
                const data = await getScrapedJobs(currentPage); // Pass currentPage to backend
                setJobs(data.jobs);
                setTotalPages(data.totalPages); // Assume backend returns totalPages
            } catch (err) {
                console.error('Failed to load jobs', err);
            } finally {
                setLoading(false);
            }
        }

        loadJobs();
    }, [currentPage]);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container rounded">
            <h3 className="mb-4">You may want to explore these opportunities</h3>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : jobs.length === 0 ? (
                <div className="alert alert-info">No jobs found.</div>
            ) : (
                <>
                    <div className="row">
                        {jobs.map((job) => (
                            <div
                                className="mb-3 border px-3 py-4 rounded job-card"
                                key={job.id}
                                onClick={() => window.open(job.link, '_blank', 'noopener,noreferrer')}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="h-100">
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <strong className="bg-secondary p-2 rounded text-secondary">
                                                {formatTimeAgo(new Date(job.posted_date))}
                                            </strong>
                                        </div>
                                    </div>
                                    <h5 className="card-title">{job.title}</h5>
                                    <p className="card-text">
                                        <strong>Company:</strong> {job.company || 'N/A'}
                                        <br />
                                        <strong>Location:</strong> {job.location || 'N/A'}
                                        <br />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        totalPages={totalPages}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </>
            )}
        </div>
    );

    function formatTimeAgo(date) {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return `${seconds} sec ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} days ago`;
        const weeks = Math.floor(days / 7);
        return `${weeks} weeks ago`;
    }
};

const Pagination = ({ totalPages, paginate, currentPage }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${number === currentPage ? 'active' : ''}`}
                    >
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AllScrapJobPage;
