import React, { useEffect, useState } from 'react';
import { getIndustries } from '../../services/Industry';
import { toast } from 'react-toastify';
import { postCampusJob } from '../../services/campusService';

const CampusJobPost = () => {
  const [title, setTitle] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [jobType, setJobType] = useState('');
  const [qualification, setQualification] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [companyName, setCompanyName] = useState(''); // Only for TPO jobs
  const [deadline, setDeadline] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      deadline
    };
    try {
      await postCampusJob(jobData);
      toast.success('Campus job posted successfully!');
      // Optional: reset form
    } catch (error) {
      toast.error('Failed to post job.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Post Campus Job</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Job Title</label>
          <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Apply Link(Optional)</label>
          <input type="text" className="form-control" onChange={(e) => setApplyLink(e.target.value)} />
          <span className="form-text">
            If you want to redirect to a custom link, please enter the link here. Otherwise, leave it blank.
          </span>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Company Name</label>
          <input type="text" className="form-control" onChange={(e) => setCompanyName(e.target.value)} />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Job Type</label>
          <select className="form-select" onChange={(e) => setJobType(e.target.value)}>
            <option value="">Select Job Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Qualification</label>
          <input type="text" className="form-control" onChange={(e) => setQualification(e.target.value)} />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Salary</label>
          <input type="text" className="form-control" onChange={(e) => setSalary(e.target.value)} />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Application Deadline</label>
          <input type="date" className="form-control" onChange={(e) => setDeadline(e.target.value)} />
        </div>

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
                  <i className="bi bi-x-lg text-danger ms-2" onClick={() => removeSkill(skill)}></i>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Job Description</label>
          <textarea className="form-control" rows="4" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>

  );
};

export default CampusJobPost;
