import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/student/Home';
import AllScrapJobPage from '../pages/student/AllScrapJobPage';
import JobsPage from '../pages/student/JobsPage';
import JobDescription from '../pages/student/JobDescription';
import MyJobPage from '../pages/student/MyJobPage';
import JobDescription2 from '../pages/student/JobDescription2';
import CompanyProfile from '../pages/company/CompanyProfile';
import Login from '../pages/company/Login';
import JobListPage from '../pages/company/JobLIstPage';
import Register from '../pages/company/Register';
import JobApplication from '../pages/company/JobApplication';
import CampusJobPost from '../pages/TPO/CampusJobPost';
import CampusApplicatons from '../pages/TPO/CampusApplicatons';
import MyCampusPage from '../pages/student/MyCampusPage';
import JobPost from '../pages/company/JobPost';
import NotFound from '../pages/NotFound';
import { AuthProvider } from '../context/AuthContext';
import RoleSelectPage from '../pages/RoleSelectPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    return (
        <Router>
            {/* <AuthProvider> */}
            <Routes>

                {/* student routes */}
                <Route path="/" element={<RoleSelectPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/all-jobs" element={<AllScrapJobPage />} />
                <Route path="/search" element={<JobsPage />} />
                <Route path="/job/:id" element={<JobDescription />} />
                <Route path='/myjobs' element={<MyJobPage />} />
                <Route path="/my-campus" element={<MyCampusPage />} />
                <Route path='/my-campus/job/:jobId' element={<JobDescription2 />} />

                {/* company routes */}

                <Route path="/company/job-post" element={<JobPost />} />
                <Route path="/company/job-list" element={<JobListPage />} />
                <Route path='/company/companyprofile' element={<CompanyProfile />} />
                <Route path='/company/applications/:jobId' element={<JobApplication />} />
                <Route path="/company/login" element={<Login />} />
                <Route path="/company/register" element={<Register />} />

                {/* campus routes */}
                <Route path='/campus/post-job' element={<CampusJobPost />} />
                <Route path="/campus/campus-applications" element={<CampusApplicatons />} />

                {/* admin routes */}



                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </AuthProvider> */}
        </Router>
    );
};

export default AppRouter;