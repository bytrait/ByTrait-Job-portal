import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getApplicationsWithUserData } from '../services/jobApplicationService';

const JobApplication = () => {
  const { jobId } = useParams("jobId");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const jobApplication = await getApplicationsWithUserData(jobId);
      setApplications(jobApplication);
    };
    fetchApplications();
  }, [jobId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Resume/CV</th> 
          </tr>
        </thead>
        <tbody>
          {applications.map((app,index) => (
            <tr key={index}>
              <td>
                <strong>{app.name}</strong>
                <div className="text-muted">{app.education}</div>
                <div className="text-muted">{app.location}</div>
              </td>
              <td className="text-end">
                <a
                  href={
                    app.isCustomResume
                      ? app.resumeLink
                      : `https://myprofile.bytrait.com/user/${app.userId}`
                  }
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplication;
