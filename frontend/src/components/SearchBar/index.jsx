import React from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [skills, setSkills] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [errors, setErrors] = React.useState({ skills: '', location: '' });
    const navigate = useNavigate();

    const handleSearch = async () => {
        const newErrors = { skills: '', location: '' };

        if (!skills) newErrors.skills = 'Skills are required.';
        if (!location) newErrors.location = 'Location is required.';

        setErrors(newErrors);

        if (!newErrors.skills && !newErrors.location) {
            const queryParams = new URLSearchParams();
            queryParams.append('skills', skills);
            queryParams.append('location', location);
            navigate(`/search?${queryParams.toString()}`);
        }
    };

    return (
        <div className="search-bar-container d-flex align-items-center shadow-sm">
            {/* Title + Company Input Group */}
            <div className="d-flex align-items-center flex-grow-1 me-3 mb-2 mb-md-0">
                <i className="bi bi-search me-2 text-muted fs-5" />
                <div className="w-100">
                    <input
                        type="text"
                        placeholder="Enter Skills eg. React, Node.js"
                        className="form-control border-0"
                        onChange={(e) => setSkills(e.target.value)}
                    />
                    {errors.skills && <small className="text-danger">{errors.skills}</small>}
                </div>
            </div>

            <div className="vertical-divider d-none d-md-block" />

            {/* Location Input Group */}
            <div className="d-flex align-items-center flex-grow-1 me-3 mb-2 mb-md-0">
                <i className="bi bi-geo-alt me-2 text-muted fs-5 " />
                <div className="w-100">
                    <input
                        type="text"
                        placeholder="Enter location"
                        className="form-control border-0"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    {errors.location && <small className="text-danger">{errors.location}</small>}
                </div>
            </div>

            {/* Search Button */}
            <button className="btn btn-primary px-4" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
