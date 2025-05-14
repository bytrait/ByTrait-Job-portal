import React from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [skills, setSkills] = React.useState('');
    const [Location, setLocation] = React.useState('');
    const navigate = useNavigate();




    const handleSearch = async () => {
       const queryParams = new URLSearchParams();
       if (skills) queryParams.append('skills', skills);
       if (Location) queryParams.append('location', Location);
       navigate(`/search?${queryParams.toString()}`);
    };



    return (
        <div className="search-bar-container d-flex align-items-center shadow-sm">

            {/* Title + Company Input Group */}
            <div className="d-flex align-items-center flex-grow-1 me-3 mb-2 mb-md-0">
                <i className="bi bi-search me-2 text-muted fs-5" />
                <input
                    type="text"
                    placeholder="Enter Skills eg. React, Node.js"
                    className="form-control border-0"
                    onChange={(e) => setSkills(e.target.value)}
                />
            </div>

            <div className="vertical-divider d-none d-md-block" />

            {/* Location Input Group */}
            <div className="d-flex align-items-center flex-grow-1 me-3 mb-2 mb-md-0">
                <i className="bi bi-geo-alt me-2 text-muted fs-5 " />
                <input
                    type="text"
                    placeholder="Enter location"
                    className="form-control border-0"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            {/* Search Button */}
            <button className="btn btn-primary px-4"
                onClick={handleSearch}
            >Search</button>
        </div>
    );
};

export default SearchBar;
