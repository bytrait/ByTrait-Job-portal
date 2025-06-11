import React from 'react';
import SearchBar from '../components/SearchBar';
import ScrapedJobs from '../components/ScrapedJobs/ScrapedJobs';
import Navbar from '../components/Header/Header';

const Home = () => {
  return (
    <>
    <Navbar/>
      {/* Fullscreen Hero Section */}
      <div className="d-flex flex-column align-items-center justify-content-center vh-75 bg-light px-3">
        <h1
          className="text-primary fw-bold text-center"
          style={{
            fontSize: window.innerWidth <= 576 ? '50px' : '70px',
          }}
        >
          Find Your Best Job Today
        </h1>
        <p
          className="text-center mb-4 fs-4"
          style={{
            fontSize: window.innerWidth <= 576 ? '18px' : '24px',
          }}
        >
          Browse through curated jobs that suit you the best
        </p>
        <SearchBar />
      </div>

      {/* Job Cards Section Below */}
      <div className="bg-white py-5">
        <ScrapedJobs />
      </div>
    </>
  );
};

export default Home;
