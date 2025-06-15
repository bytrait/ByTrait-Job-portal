import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '80vh', backgroundColor: '#f8f9fa' }}>
            <div>
                <div className="">
                    <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
                </div>
                <h1 className="display-1 text-danger fw-bold">404</h1>
                <h2 className="mb-3">Page Not Found</h2>
                <p className="text-muted mb-4">
                    Oops! The page you are looking for doesn’t exist or has been moved.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/" className="text-primary">
                        Go to Home
                    </Link>

                </div>
            </div>

        </div>
    );
};

export default NotFound;
