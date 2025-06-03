import API from "./api";


export const applyToJob = async (jobId, isCustomResume, resumeLink) => {
  try {
    const response = await API.post('/job-applications/apply', {
      jobId,
      isCustomResume,
      resumeLink
    });
    return response;
  } catch (error) {
    console.error('Error applying to job:', error);
    throw error;
  }
}


export const getApplicationsWithUserData = async (jobId) => {
  try {
    const response = await API.get(`/job-applications/applications?jobId=${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications with user data:', error);
    throw error;
  }
}