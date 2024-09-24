import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inputdata.css'
export default function AddProject() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState([]);
  const [manager, setManager] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data } = await axios.get('http://localhost:3001/api/v1/users');
      setUsers(data.users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any previous error or success messages
    setError('');
    setSuccess('');

    const formData = {
      projectName,
      description,
      status,
      manager,
      members: team,
    };

    try {
      const response = await fetch('http://localhost:3001/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setSuccess('Project added successfully!');
        // Optionally, reset form fields
        setProjectName('');
        setDescription('');
        setStatus('pending');
        setTeam([]);
        setManager('');
      }
    } catch (err) {
      setError('Failed to add project. Please try again.');
    }
  };

  const handleManagerChange = (event) => {
    setManager(event.target.value);
  };

  const handleTeamChange = (event) => {
    const index = event.target.value;
    if (index === '') return;
console.log(index)
    if (team.length < 4 && !team.includes(index)) {
      setTeam([...team, index]);
    }
  };

  const removeFromTeam = (userId) => {
    setTeam(team.filter((id) => id !== userId));
  };


  return (
    <div className="add-project-page">
      <header className="page-header">
        <h1>Add New Project</h1>
      </header>

      <section className="add-project-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="manager">Manager:</label>
            <select
              id="manager"
              onChange={handleManagerChange}
              value={manager}
            >
              <option value="">Select a manager</option>
              {users
                .filter((user) => user.role === 'manager')
                .map((user, index) => (
                  <option key={index} value={user._id}>
                    {user.username}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="team">Team Members:</label>
            <select
              id="team"
              onChange={handleTeamChange}
              disabled={team.length >= 4}
            >
              <option value="">Select a team member</option>
      {        users
    .map((user, index) =>{
     return user.role=="team member" && !team.includes(user._id) &&  <option key={index} value={user._id}>
        {user.username}
      </option>
})}
            </select>
          </div>

          <div className="form-group">
            <label>Selected Team Members:</label>
            <ul className="selected-team-members">
              {team.map((userId) => {
                const user = users.find((u) => u._id === userId);
                return (
                  <li key={userId} className="selected-member">
                    {user?.username}
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeFromTeam(userId)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Add Project</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
}
