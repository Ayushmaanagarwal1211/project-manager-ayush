import React, { useEffect, useState } from 'react';
// import Cards from '../components/Cards';
import './styles.css';
import Sidebar from '../components/Sidebar';

const IncompletedTasks = () => {
    let [tasks, setTasks] = useState([]);
    let user = localStorage.getItem('user');

    useEffect(() => {
        fetchData();
      }, []);
    
      async function fetchData() {
        if(JSON.parse(localStorage.getItem('project')).manager){

          let project = JSON.parse(localStorage.getItem('project'))._id;
          let formData = { project: project };
      
          let data = await fetch("https://backend-projectmanager.onrender.com/api/v2/get-all-tasks", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
      
          data = await data.json();
          data = data.data.filter((d) => d.project == project);
          setTasks([...data]);
        }
      }
    return (
        <div className="flex flex-row md:flex-row h-[98vh] gap-4 p-4">
        {/* Sidebar */}
        <div className="w-auto md:w-1/6 h-full border border-gray-500 rounded-xl p-4 flex flex-row justify-between">
            <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-5/6 h-full border border-gray-500 rounded-xl p-4">
            <h1 className="text-2xl font-bold mb-4">Incomplete Tasks</h1>
            <div className="flex h-[100vh] flex-col gap-10">
                {tasks.map((task, index) => {
               
              return  !task.complete && <div key={index} className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
                        <h2 className="text-xl font-semibold">{task.title}</h2>
                        <p className="text-gray-700 mb-2">{task.desc}</p>
                      
                    </div>
})}
            </div>
        </div>
    </div>
    );
}

export default IncompletedTasks;
