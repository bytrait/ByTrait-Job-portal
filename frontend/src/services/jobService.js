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

export const getMyAppliedJobs = async () => {
    try {
        const response = await API.get(`/jobs/myjobs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching my applied jobs:", error);
        throw error;
    }
}

export const deleteJob = async (jobId) => {
    try {
        const response = await API.delete(`/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting job:", error);
        throw error;
    }
}
export const getJobByIdForCompany =  async (jobId)=>{
    try{
    const response = await API.get(`/jobs/${jobId}`);
    return response.data;
    }catch(error){
        console.error("Error fetching by id",error);
        throw error;
    }
}
export const updateJob = async (jobId, jobData) => {
    try {
        const response = await API.put(`/jobs/${jobId}`, jobData);
        return response.data;
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
}