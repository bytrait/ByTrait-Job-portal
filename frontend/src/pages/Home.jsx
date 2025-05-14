import React from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light px-3">
          <h1
            className="text-primary fw-bold text-center"
            style={{
              fontSize: window.innerWidth <= 576 ? '50px' : '70px', // Adjust based on screen width
            }}
          >
            Find Your Best Job Today
          </h1>
          <p
            className="text-center mb-4 fs-4"
            style={{
              fontSize: window.innerWidth <= 576 ? '18px' : '24px', // Adjust based on screen width
            }}
          >
            Browse through curated jobs that suit you the best
          </p>
          <SearchBar />
        </div>
      );
      
};

export default Home;
