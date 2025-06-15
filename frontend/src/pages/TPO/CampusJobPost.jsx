import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import {
  postCampusJob,
  updateCampusJob,
  getCampusJobById,
} from '../../services/campusService';

const CampusJobForm = () => {
  const { jobId } = useParams(); // if editing
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [jobType, setJobType] = useState('');
  const [qualification, setQualification] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (jobId) {
      // Load job data for editing
      const fetchJob = async () => {
        try {
          const data = await getCampusJobById(jobId);
          console.log(data);
          setTitle(data.title || '');
          setApplyLink(data.applyLink || '');
          setJobType(data.job_type || '');
          setQualification(data.qualification || '');
          setLocation(data.location || '');
          setSalary(data.salary || '');
          setDescription(data.description || '');
          setSkills(data.skills || []);
          setCompanyName(data.company_name || '');
          setDeadline(data.deadline ? data.deadline.split('T')[0] : '');
        } catch (err) {
          toast.error('Failed to load job details');
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const addSkill = () => {
    const newSkill = skillInput.trim();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Job title is required';
    if (!applyLink.trim()) newErrors.applyLink = 'Apply link is required';
    if (!jobType.trim()) newErrors.jobType = 'Job type is required';
    if (!qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!salary.trim()) newErrors.salary = 'Salary is required';
    if (!description.trim()) newErrors.description = 'Job description is required';
    if (!companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!deadline.trim()) newErrors.deadline = 'Application deadline is required';
    if (skills.length === 0) newErrors.skills = 'At least one skill is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const jobData = {
      title,
      applyLink,
      jobType,
      qualification,
      location,
      salary,
      description,
      skills,
      companyName,
      deadline,
    };

    try {
      if (jobId) {
        await updateCampusJob(jobId, jobData);
        toast.success('Job updated successfully!');
      } else {
        await postCampusJob(jobData);
        toast.success('Campus job posted successfully!');
      }
      navigate('/campus/manage-jobs'); // adjust path as per your routes
    } catch (error) {
      toast.error('Failed to save job.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">{jobId ? 'Edit Campus Job' : 'Post Campus Job'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Title */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Job Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <small className="text-danger">{errors.title}</small>}
          </div>

          {/* Apply Link */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Apply Link</label>
            <input type="text" className="form-control" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} />
            {errors.applyLink && <small className="text-danger">{errors.applyLink}</small>}
          </div>

          {/* Company */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            {errors.companyName && <small className="text-danger">{errors.companyName}</small>}
          </div>

          {/* Job Type */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Job Type</label>
            <select className="form-select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Select Job Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
            {errors.jobType && <small className="text-danger">{errors.jobType}</small>}
          </div>

          {/* Qualification */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Qualification</label>
            <input type="text" className="form-control" value={qualification} onChange={(e) => setQualification(e.target.value)} />
            {errors.qualification && <small className="text-danger">{errors.qualification}</small>}
          </div>

          {/* Location */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
            {errors.location && <small className="text-danger">{errors.location}</small>}
          </div>

          {/* Salary */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Salary</label>
            <input type="text" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} />
            {errors.salary && <small className="text-danger">{errors.salary}</small>}
          </div>

          {/* Deadline */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Application Deadline</label>
            <input type="date" className="form-control" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            {errors.deadline && <small className="text-danger">{errors.deadline}</small>}
          </div>

          {/* Skills */}
          <div className="col-12 mb-3">
            <label className="form-label">Skills</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Enter skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <button type="button" className="btn btn-primary px-4 ms-2" onClick={addSkill}>
                Add
              </button>
            </div>
            <ul className="mt-2 list-inline">
              {skills.map((skill, index) => (
                <li key={index} className="list-inline-item me-2">
                  <span className="badge bg-secondary text-secondary p-2 d-flex align-items-center">
                    {skill}
                    <i
                      className="bi bi-x-lg text-danger ms-2"
                      role="button"
                      onClick={() => removeSkill(skill)}
                    ></i>
                  </span>
                </li>
              ))}
            </ul>
            {errors.skills && <small className="text-danger">{errors.skills}</small>}
          </div>

          {/* Description */}
          <div className="col-12 mb-3">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <small className="text-danger">{errors.description}</small>}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {jobId ? 'Update Job' : 'Submit Job'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CampusJobForm;
