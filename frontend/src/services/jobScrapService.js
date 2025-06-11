import API from "./api";

export const getScrapedJobs = async (currentPage) => {
  try {
    const response = await API.get('/job-scraped',
      {
        params: {
          page: currentPage || 1,
          limit: 20 
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching scraped jobs:', error);
    throw error;
  }
};
