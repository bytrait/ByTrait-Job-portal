import API from "./api";

export const getIndustries = async () => {
    try {
        const response = await API.get("/industry");
        return response.data;
    } catch (error) {
        console.error("Error fetching industry:", error);
        throw error;
    }
}

export const getAllIndustries = async () => {
    const res = await API.get('/industry');
    return res.data;
};

export const createIndustry = async (name) => {
    const res = await API.post('/industry', { name });
    return res.data;
};

export const updateIndustry = async (id, name) => {
    const res = await API.put(`/industry/${id}`, { name });
    return res.data;
};

export const deleteIndustry = async (id) => {
    const res = await API.delete(`/industry/${id}`);
    return res.data;
};