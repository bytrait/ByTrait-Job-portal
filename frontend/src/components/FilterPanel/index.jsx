import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIndustries } from '../../services/Industry';

const FilterPanel = ({ filters, setFilters }) => {
  const [skills, setSkills] = useState();
  const [location, setLocation] = useState();
  const [industries, setIndustries] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setSkills(filters?.skills);
    setLocation(filters?.location);
  }, [filters]);

  useEffect(() => {
    const fetchIndustrys = async () => {
      try {
        const data = await getIndustries();
        setIndustries(data.industries);
      } catch (error) {
        console.error('Error fetching industry data:', error);
      }
    };
    fetchIndustrys();
  }, []);

  // Handle checkbox changes

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      const currentArray = prevFilters[name] || [];
      let updatedArray;

      if (checked) {
        updatedArray = [...currentArray, value];
      } else {
        updatedArray = currentArray.filter((item) => item !== value);
      }

      return {
        ...prevFilters,
        [name]: updatedArray,
      };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    if (skills) queryParams.append('skills', skills);
    if (location) queryParams.append('location', location);
    navigate(`/search?${queryParams.toString()}`);
  };

  const jobTypes = ['full-time', 'freelance', 'contract', 'internship', 'part-time'];

  return (
    <div className="container p-3 border rounded bg-light">
      {/* Search by skills */}
      <div className="mb-3">
        <label htmlFor="skills" className="form-label">Search by skills</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={skills}
          className="form-control"
          onChange={e => {
            setSkills(e.target.value);
          }}
        // onChange={handleChange}
        />
      </div>

      {/* Location */}
      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          className="form-control"
          onChange={e => {
            setLocation(e.target.value);
          }
          }
        // onChange={handleChange}
        />
      </div>

      <div className='btn w-100 btn-primary' onClick={handleSearch}>Search</div>

      <h5 className='mt-4'>Job Type</h5>
      {jobTypes.map((type) => (
        <div className="mb-1 d-flex flex-row gap-2" key={type}>
          <input
            type='checkbox'
            name='jobType'
            value={type}
            checked={filters.jobType?.includes(type) || false}
            onChange={handleCheckboxChange}
            style={{ width: '20px', height: '20px' }}
          />
          <label className="form-label">{type.replace('-', ' ')}</label>
        </div>
      ))}

      <h5 className='mt-4'>Date Posted</h5>

      <div className="mb-1 d-flex flex-row gap-2">
        <input
          type="radio"
          name="dateFilter"
          value="24h"
          checked={filters.dateFilter === '24h'}
          onChange={handleRadioChange}
          style={{ width: '20px', height: '20px' }}
        />
        <label className="form-label">Last 1 day</label>
      </div>

      <div className="mb-1 d-flex flex-row gap-2">
        <input
          type="radio"
          name="dateFilter"
          value="3d"
          checked={filters.dateFilter === '3d'}
          onChange={handleRadioChange}
          style={{ width: '20px', height: '20px' }}
        />
        <label className="form-label">Last 3 days</label>
      </div>

      <div className="mb-1 d-flex flex-row gap-2">
        <input
          type="radio"
          name="dateFilter"
          value="7d"
          checked={filters.dateFilter === '7d'}
          onChange={handleRadioChange}
          style={{ width: '20px', height: '20px' }}
        />
        <label className="form-label">Last 7 days</label>
      </div>

      <div className="mb-1 d-flex flex-row gap-2">
        <input
          type="radio"
          name="dateFilter"
          value="30d"
          checked={filters.dateFilter === '30d'}
          onChange={handleRadioChange}
          style={{ width: '20px', height: '20px' }}
        />
        <label className="form-label">Last 30 days</label>
      </div>


      <h5 className='mt-4'>Industry</h5>

      {
        industries.map((industry, index) => (
          <div className="mb-1 d-flex flex-row gap-2" key={index}>
            <input
              type='checkbox'
              name='industryIds'
              value={industry.id}
              onChange={handleCheckboxChange}
              style={{ width: '20px', height: '20px' }}
            />
            <label htmlFor="industryIds" className="form-label">{industry.name}</label>
          </div>
        ))
      }

    </div>
  );
};

export default FilterPanel;
