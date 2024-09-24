import React from 'react'
import Sidebar from '../components/Sidebar';

export default function Projectdetails() {

    let project ;
    if(JSON.parse(localStorage.getItem('project'))){

      project = JSON.parse(localStorage.getItem('project'))[0];
    } 

    // Function to format dates
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  return (
    <div className="flex flex-row md:flex-row h-[98vh] gap-4 p-4">
        {/* Sidebar */}
        <div className="w-auto md:w-1/6 h-full border border-gray-500 rounded-xl p-4 flex flex-row justify-between">
            <Sidebar />
        </div>
        <div className="w-full md:w-5/6 h-full border border-gray-500 rounded-xl p-4">

        <h1 className="text-center text-3xl font-semibold mb-6">Project Details</h1>
        
        <div className="mb-4">
          <span className="font-bold text-lg">Project Name:</span>
          <p className="text-gray-700">{JSON.parse(localStorage.getItem('project')) && project.projectName}</p>
        </div>
        
        <div className="mb-4">
          <span className="font-bold text-lg">Description:</span>
          <p className="text-gray-700">{JSON.parse(localStorage.getItem('project')) && project.description}</p>
        </div>
        
       

        
        
        <div className="mb-4">
          <span className="font-bold text-lg">Created At:</span>
          <p className="text-gray-700">{JSON.parse(localStorage.getItem('project')) && formatDate(project.createdAt)}</p>
        </div>

        <div>
          <span className="font-bold text-lg">Updated At:</span>
          <p className="text-gray-700">{JSON.parse(localStorage.getItem('project')) && formatDate(project.updatedAt)}</p>
        </div>
    </div>
    </div>
  )
}
