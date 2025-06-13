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
import Navbar from '../components/Header/Header';
import CompanyDashboard from '../pages/company/CompanyDashboard';
import CampusDashboard from '../pages/TPO/CampusDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import JobDescription3 from '../pages/company/JobDescription3';

const AppRouter = () => {
    return (

        <Router>
            <AuthProvider>
            <Navbar/>

            <Routes>

                {/* student routes */}
                <Route path="/" element={<RoleSelectPage /> } />
                <Route path="/home" element={<ProtectedRoute allowedRoles={['student']}> <Home /> </ProtectedRoute>} />
                <Route path="/all-jobs" element={<ProtectedRoute allowedRoles={['student']}> <AllScrapJobPage /> </ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute allowedRoles={['student']}> <JobsPage /> </ProtectedRoute>} />
                <Route path="/job/:id" element={<ProtectedRoute allowedRoles={['student']}> <JobDescription /> </ProtectedRoute>} />
                <Route path='/myjobs' element={<ProtectedRoute allowedRoles={['student']}> <MyJobPage /> </ProtectedRoute>} />
                <Route path="/my-campus" element={<ProtectedRoute allowedRoles={['student']}> <MyCampusPage /> </ProtectedRoute>} />
                <Route path='/my-campus/job/:jobId' element={<ProtectedRoute allowedRoles={['student']}> <JobDescription2 /> </ProtectedRoute>} />

                {/* company routes */}
                <Route path='/company/dashboard' element={<ProtectedRoute allowedRoles={['company']}> <CompanyDashboard /> </ProtectedRoute>} />
                <Route path="/company/edit-job-post/:jobId" element={<ProtectedRoute allowedRoles={['company']}> <JobPost /> </ProtectedRoute>} />
                <Route path="/company/job-post" element={<ProtectedRoute allowedRoles={['company']}> <JobPost /> </ProtectedRoute>} />

                <Route path="/company/job-list" element={<ProtectedRoute allowedRoles={['company']}> <JobListPage /> </ProtectedRoute>} />
                <Route path='/company/companyprofile' element={<ProtectedRoute allowedRoles={['company']}> <CompanyProfile /> </ProtectedRoute>} />
                <Route path='/company/applications/:jobId' element={<ProtectedRoute allowedRoles={['company']}> <JobApplication /> </ProtectedRoute>} />
                <Route path='/company/job/:id' element={<ProtectedRoute allowedRoles={['company']}> <JobDescription3 /> </ProtectedRoute>} />
                <Route path="/company/login" element={<Login /> } />
                <Route path="/company/register" element={<Register />} />

                {/* campus routes */}
                <Route path='/campus/dashboard' element={<ProtectedRoute allowedRoles={['TPO']}> <CampusDashboard /> </ProtectedRoute>} />
                <Route path='/campus/post-job' element={<ProtectedRoute allowedRoles={['TPO']}> <CampusJobPost /> </ProtectedRoute>} />
                <Route path="/campus/campus-applications" element={<ProtectedRoute allowedRoles={['TPO']}> <CampusApplicatons /> </ProtectedRoute>} />

                {/* admin routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}> <AdminDashboard/> </ProtectedRoute>} />



                <Route path="*" element={<NotFound />} />
            </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRouter;