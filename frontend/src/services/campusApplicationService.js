import API from './api';

export const applyToCampusJob = async (jobId) => {
  const res = await API.post(`/campus-job-applications/apply/${jobId}`);
  return res.data;
};

export const getCampusApplications = async (jobId) => {
  try {
    const res = await API.get(`/campus-job-applications/applications/${jobId}`, {
      params: { jobId },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching campus applications:", error);
    throw error;
  }
};  