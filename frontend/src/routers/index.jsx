import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import JobPost from '../pages/JobPost';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import CompanyProfile from '../pages/CompanyProfile';
import JobListPage from '../pages/JobLIstPage';
import JobsPage from '../pages/JobsPage';
import JobDescription from '../pages/JobDescription';
import MyJobPage from '../pages/MyJobPage';
import JobApplication from '../pages/JobApplication';
import CampusJobPost from '../pages/CampusJobPost';
import MyCampusPage from '../pages/MyCampusPage';
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/job-post" element={<JobPost />} />
                <Route path="/job-list" element={<JobListPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<JobsPage />} />
                <Route path="/job/:id" element={<JobDescription/>} />
                <Route path='/companyprofile' element={<CompanyProfile/>}/>
                <Route path='/myjobs' element={<MyJobPage/>}/>
                <Route path='applications/:jobId' element={<JobApplication/>}/>
                <Route path='campus/post-job' element={<CampusJobPost/>}/>
                <Route path="/my-campus" element={<MyCampusPage />} />
                {/* Add more routes as needed */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;