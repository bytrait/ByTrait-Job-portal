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