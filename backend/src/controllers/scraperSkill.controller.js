const axios = require('axios');

const FLASK_API = process.env.FLASK_API_BASE;

// GET /api/skills
exports.getAllSkills = async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API}/skills`);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching skills:', err.message);
    res.status(500).json({ error: 'Failed to fetch skills from Flask' });
  }
};

// POST /api/skills
exports.addSkill = async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API}/skills`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error('Error adding skill:', err.message);
    res.status(500).json({ error: 'Failed to add skill to Flask' });
  }
};

// DELETE /api/skills/:id
exports.deleteSkill = async (req, res) => {
  try {
    const response = await axios.delete(`${FLASK_API}/skills/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error deleting skill:', err.message);
    res.status(500).json({ error: 'Failed to delete skill from Flask' });
  }
};
