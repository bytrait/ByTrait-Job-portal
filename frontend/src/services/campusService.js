import API from "./api";

export const postCampusJob = async (jobData) => {
  const res = await API.post(`/campus-jobs/jobs`, jobData);
  return res.data;
};

export const getCampusJobs = async () => {
  const res = await API.get(`/campus-jobs/my-campus-jobs`);
  return res.data;
}
