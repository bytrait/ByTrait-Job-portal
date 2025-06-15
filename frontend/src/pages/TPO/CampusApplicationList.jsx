import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampusApplications } from "../../services/campusApplicationService";
import "bootstrap/dist/css/bootstrap.min.css";

const CampusApplicationList = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getCampusApplications(jobId);
        setApplications(res);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    if (jobId) fetchApplications();
  }, [jobId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Campus Job Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Resume/CV</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>
                <strong>{app.name || "N/A"}</strong>
                <div className="text-muted">{app.education || "N/A"}</div>
                <div className="text-muted">{app.location || "N/A"}</div>
              </td>
              <td className="text-end">
                <a
                  href={
                    `https://myprofile.bytrait.com/user/${app.studentId}`
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

export default CampusApplicationList;
