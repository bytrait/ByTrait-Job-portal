import React, { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import JobList from '../components/JobSearchList';
import { useLocation } from 'react-router-dom';
import { getfilteredJobs } from '../services/jobService';

const JobsPage = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);

  const [filters, setFilters] = useState({
    skills: '',
    location: '',
    dateFilter: 'all',
    jobType: [],
    industryIds: [],
  });

  const fetchJobs = async (activeFilters) => {
    try {
      const response = await getfilteredJobs(activeFilters);
      setJobs(response.data.jobs);
    } catch (error) {
      setJobs([]);
      console.error('Error fetching jobs:', error);
    }
  };

  // 🛠️ Load filters from query and fetch once
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const updatedFilters = {
      skills: queryParams.get('skills') || '',
      location: queryParams.get('location') || '',
      jobType: '',
      industryIds: [],
      dateFilter: 'all',
    };

    setFilters(updatedFilters); // updates state
    fetchJobs(updatedFilters); // manually call fetch with correct filters
  }, [location.search]);

  // 🧠 Optional: if filters change through FilterPanel, fetch again
  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>
        <div className="col-md-9">
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
