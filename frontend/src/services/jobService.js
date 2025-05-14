import API from "./api";

export const postJob = async (jobData) => {
    try {
        const response = await API.post("/jobs/", jobData);
        return response.data;
    } catch (error) {
        console.error("Error posting job:", error);
        throw error;
    }
}

export const getallcompanyJobs = async () => {
    try {
        const response = await API.get(`/jobs/companyjob`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching company jobs:", error);
        throw error;
    }
}


export const getfilteredJobs = async (filters) => {
    try {
        const response = await API.get(`/jobs/filter`, { params: filters });
        return response;
    } catch (error) {
        console.error("Error fetching filtered jobs:", error);
        throw error;
    }
}

export const getJobById = async (jobId) => {
    try {
        const response = await API.get(`/jobs/jobdescription/${jobId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        throw error;
    }
}
