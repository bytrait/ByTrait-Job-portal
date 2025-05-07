import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import JobPost from '../pages/JobPost';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import CompanyProfile from '../pages/CompanyProfile';
import JobListPage from '../pages/JobLIstPage';
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/job-post" element={<JobPost />} />
                <Route path="/job-list" element={<JobListPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/companyprofile' element={<CompanyProfile/>}/>
                
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;