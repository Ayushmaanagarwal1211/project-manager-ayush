import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function ProjectDetails() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedProject = JSON.parse(localStorage.getItem('project'));
      if (storedProject && storedProject.manager) {
        setProject(storedProject);
      } else {
        setError('Project data not found or invalid.');
      }
    } catch (err) {
      setError('Error parsing project data.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center text-lg">{error}</div>;
  }

  return (
    <div className="flex flex-row h-[98vh] gap-4 p-4 bg-gray-100">
      {/* Sidebar */}
      <div className="w-auto md:w-1/6 h-full border border-gray-500 rounded-xl p-4 flex flex-row justify-between bg-white shadow-lg">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6 h-full border border-gray-500 rounded-xl p-6 bg-white shadow-xl">
        <h1 className="text-center text-4xl font-bold mb-6 text-blue-600">Project Details</h1>

        <div className="mb-6">
          <span className="font-semibold text-xl">Project Name:</span>
          <p className="text-gray-800 text-lg">{project.projectName}</p>
        </div>

        <div className="mb-6">
          <span className="font-semibold text-xl">Description:</span>
          <p className="text-gray-800 text-lg">{project.description}</p>
        </div>

        <div className="mb-6">
          <span className="font-semibold text-xl">Created At:</span>
          <p className="text-gray-800 text-lg">{formatDate(project.createdAt)}</p>
        </div>

        <div>
          <span className="font-semibold text-xl">Updated At:</span>
          <p className="text-gray-800 text-lg">{formatDate(project.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}
