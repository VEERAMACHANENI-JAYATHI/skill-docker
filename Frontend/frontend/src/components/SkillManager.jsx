import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState({
    id: '',
    skillName: '',
    level: '',
    experience: '',
    topics: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedSkill, setFetchedSkill] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/skillapi`;
  const skillKeys = ['id', 'skillName', 'level', 'experience', 'topics'];

  useEffect(() => {
    fetchAllSkills();
  }, []);

  const fetchAllSkills = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setSkills(res.data);
    } catch (error) {
      setMessage('Failed to fetch skills.');
    }
  };

  const handleChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key of skillKeys) {
      if (!skill[key] || skill[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addSkill = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, skill);
      setMessage('Skill added successfully.');
      fetchAllSkills();
      resetForm();
    } catch (error) {
      setMessage('Error adding skill.');
    }
  };

  const updateSkill = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, skill);
      setMessage('Skill updated successfully.');
      fetchAllSkills();
      resetForm();
    } catch (error) {
      setMessage('Error updating skill.');
    }
  };

  const deleteSkill = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllSkills();
    } catch (error) {
      setMessage('Error deleting skill.');
    }
  };

  const getSkillById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedSkill(res.data);
      setMessage('');
    } catch (error) {
      setFetchedSkill(null);
      setMessage('Skill not found.');
    }
  };

  const handleEdit = (skl) => {
    setSkill(skl);
    setEditMode(true);
    setMessage(`Editing skill with ID ${skl.id}`);
  };

  const resetForm = () => {
    setSkill({
      id: '',
      skillName: '',
      level: '',
      experience: '',
      topics: ''
    });
    setEditMode(false);
  };

  return (
    <div className="skill-container" style={{ padding: '20px' }}>

      {message && (
        <div style={{ marginBottom: '10px', color: message.toLowerCase().includes('error') ? 'red' : 'green' }}>
          {message}
        </div>
      )}

      <h2>Skill Management</h2>

      {/* Add / Edit Form */}
      <div style={{ marginBottom: '20px' }}>
        <h3>{editMode ? 'Edit Skill' : 'Add Skill'}</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="number" name="id" placeholder="ID" value={skill.id} onChange={handleChange} />
          <input type="text" name="skillName" placeholder="Skill Name" value={skill.skillName} onChange={handleChange} />
          <input type="text" name="level" placeholder="Level" value={skill.level} onChange={handleChange} />
          <input type="number" name="experience" placeholder="Experience (Years)" value={skill.experience} onChange={handleChange} />
          <input type="text" name="topics" placeholder="Topics to Learn" value={skill.topics} onChange={handleChange} />
        </div>
        <div style={{ marginTop: '10px' }}>
          {!editMode ? (
            <button onClick={addSkill} style={{ marginRight: '10px' }}>Add Skill</button>
          ) : (
            <>
              <button onClick={updateSkill} style={{ marginRight: '10px' }}>Update Skill</button>
              <button onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Fetch By ID */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Get Skill By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
          style={{ marginRight: '10px' }}
        />
        <button onClick={getSkillById}>Fetch</button>

        {fetchedSkill && (
          <div style={{ marginTop: '10px' }}>
            <pre>{JSON.stringify(fetchedSkill, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Skills Table */}
      <div>
        <h3>All Skills</h3>
        {skills.length === 0 ? (
          <p>No skills found.</p>
        ) : (
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                {skillKeys.map((key) => <th key={key}>{key}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skl) => (
                <tr key={skl.id}>
                  {skillKeys.map((key) => <td key={key}>{skl[key]}</td>)}
                  <td>
                    <button onClick={() => handleEdit(skl)} style={{ marginRight: '5px' }}>Edit</button>
                    <button onClick={() => deleteSkill(skl.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default SkillManager;
