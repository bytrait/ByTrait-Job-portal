import API from './api';

// ✅ Get all skills
export const getScraperSkills = async () => {
  const res = await API.get('/skills');
  return res.data;
};

// ✅ Add a new skill
export const addScraperSkill = async (skillName) => {
  const res = await API.post('/skills', { name: skillName });
  return res.data;
};

// ✅ Delete skill by ID
export const deleteScraperSkill = async (id) => {
  const res = await API.delete(`/skills/${id}`);
  return res.data;
};
