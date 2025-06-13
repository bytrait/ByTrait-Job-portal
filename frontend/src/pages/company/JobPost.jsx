import React, { useEffect, useState } from 'react';
import { getIndustries } from '../../services/Industry';
import { toast } from 'react-toastify';
import { postJob, getJobByIdForCompany, updateJob } from '../../services/jobService';
import { useNavigate, useParams } from 'react-router-dom';

const JobPost = () => {
    const { jobId } = useParams();
    const isEditMode = Boolean(jobId);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [applyLink, setApplyLink] = useState('');
    const [jobType, setJobType] = useState('');
    const [qualification, setQualification] = useState('');
    const [location, setLocation] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [description, setJobDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [industries, setIndustries] = useState([]);
    const [industryId, setIndustryId] = useState('');

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput)) {
            setSkills([...skills, skillInput]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const response = await getIndustries();
                setIndustries(response.industries);
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        };

        const fetchJobData = async () => {
            try {
                const job = await getJobByIdForCompany(jobId);
                // const job = response.job;
                setTitle(job.title);
                setApplyLink(job.applyLink || '');
                setJobType(job.jobType);
                setIndustryId(job.industryId);
                setQualification(job.qualification);
                setLocation(job.location);
                setMinSalary(job.minSalary);
                setMaxSalary(job.maxSalary);
                setJobDescription(job.description);
                setSkills(job.skills || []);
            } catch (err) {
                toast.error('Failed to load job details');
            }
        };

        fetchIndustries();
        if (isEditMode) {
            fetchJobData();
        }
    }, [jobId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            title,
            applyLink,
            jobType,
            industryId,
            qualification,
            location,
            minSalary,
            maxSalary,
            description,
            skills
        };
        try {
            if (isEditMode) {
                await updateJob(jobId, jobData);
                toast.success('Job updated successfully!');
            } else {
                await postJob(jobData);
                toast.success('Job posted successfully!');
            }
            navigate('/company/job-list');
        } catch (error) {
            toast.error('Error saving job!');
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="title" className="form-label">Job Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="applyLink" className="form-label">Apply Link (Optional)</label>
                    <input type="url" className="form-control" id="applyLink" placeholder="Enter apply link"
                        value={applyLink}
                        onChange={(e) => setApplyLink(e.target.value)}
                    />
                    <span>Note: If you add an Apply Link, candidates will be redirected to that link when they click the Apply button.</span>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="skills" className="form-label">Skills</label>
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            id="skills"
                            placeholder="Enter required skills"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-primary px-5"
                            onClick={addSkill}
                        >
                            Add
                        </button>
                    </div>
                    <ul className="mt-3 list-inline">
                        {skills.map((skill, index) => (
                            <li key={index} className="list-inline-item me-2">
                                <span className="badge bg-secondary d-flex align-items-center p-3 mb-1 text-secondary">
                                    {skill}
                                    <i className="bi bi-x-lg text-danger mx-2" onClick={() => removeSkill(skill)}></i>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="jobType" className="form-label">Job Type</label>
                    <select className="form-select" id="jobType"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="">Select job type</option>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="freelance">Freelance</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="industry" className="form-label">Industry</label>
                    <select className="form-select" id="industry"
                        value={industryId}
                        onChange={(e) => setIndustryId(e.target.value)}
                    >
                        <option value="">Select industry</option>
                        {industries && industries.map((industry, index) => (
                            <option key={index} value={industry.id}>{industry.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="qualification" className="form-label">Qualification</label>
                    <input type="text" className="form-control" id="qualification" placeholder="Enter qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="minSalary" className="form-label">Minimum Salary</label>
                    <input type="number" className="form-control" id="minSalary" placeholder="Enter minimum salary"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="maxSalary" className="form-label">Maximum Salary</label>
                    <input type="number" className="form-control" id="maxSalary" placeholder="Enter maximum salary"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Job Description</label>
                    <textarea className="form-control" id="description" rows="4" placeholder="Enter job description"
                        value={description}
                        onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        {isEditMode ? 'Update Job' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobPost;
