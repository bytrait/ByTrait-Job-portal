import React, { useEffect, useState } from 'react';
import { approveCompany, getPendingCompanies, rejectCompany } from '../../services/CompanyService';

const CompanyRequests = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getPendingCompanies();
        setCompanies(data);
      } catch (err) {
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') {
        await approveCompany(id);
      } else {
        await rejectCompany(id);
      }
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(`Failed to ${action} company:`, err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold">Company Registration Requests</h3>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p className="mb-0">🎉 No new company requests</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle shadow-sm">
            <thead className="table-primary text-center">
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Email</th>
                <th>Website</th>
                <th>Country</th>
                <th>Requested On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={company.id}>
                  <td className="text-center">{index + 1}</td>
                  <td><strong>{company.companyName}</strong></td>
                  <td>{company.email}</td>
                  <td>
                    {company.website ? (
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        {company.website}
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{company.country || '-'}</td>
                  <td>{new Date(company.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleAction(company.id, 'approve')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleAction(company.id, 'reject')}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyRequests;
