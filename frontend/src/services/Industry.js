import API  from "./api";

export const getIndustries = async () => {
    try {
        const response = await API.get("/industries/");
        return response.data;
    } catch (error) {
        console.error("Error fetching industries:", error);
        throw error;
    }
}