import React, { useEffect, useState } from 'react';
import {
  getScraperSkills,
  addScraperSkill,
  deleteScraperSkill,
} from '../../services/scraperSkillService';

const ManageScraperSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      const data = await getScraperSkills();
      setSkills(data);
    } catch {
      alert('Failed to fetch skills');
    }
  };

  const handleAdd = async () => {
    if (!newSkill.trim()) return;
    try {
      setLoading(true);
      await addScraperSkill(newSkill);
      setNewSkill('');
      fetchSkills();
    } catch {
      alert('Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteScraperSkill(id);
      fetchSkills();
    } catch {
      alert('Failed to delete skill');
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Manage Scraping Skills</h3>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g., React Developer"
        />
        <button className="btn btn-primary" onClick={handleAdd} disabled={loading}>
          {loading ? 'Adding...' : 'Add Skill'}
        </button>
      </div>
      <ul className="list-group">
        {skills.map((skill) => (
          <li key={skill.id} className="list-group-item d-flex justify-content-between align-items-center">
            {skill.name}
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(skill.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageScraperSkills;
