import API from "./api";

export const updateCompanyProfile = async (formData) => {
    try {
        const response = await API.put("/company/profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating company profile:", error);
        throw error;
    }
}

export const getCompanyProfile = async () => {
    try {
        const response = await API.get("/company/profile");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching company profile:", error);
        throw error;
    }
}



export const getPendingCompanies = async () => {
    const res = await API.get('/company/companies');
    return res.data;
  };
  
  export const approveCompany = async (companyId) => {
    const res = await API.put(`/company/${companyId}/approve`);
    return res.data;
  };
  
  export const rejectCompany = async (companyId) => {
    const res = await API.put(`/company/${companyId}/reject`);
    return res.data;
  };



