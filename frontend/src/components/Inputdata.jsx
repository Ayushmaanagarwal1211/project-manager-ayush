

import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const InputData = ({ InputDiv, setInputDiv }) => {
  const [members, setMembers] = useState([]);
  const [project, setProject] = useState([]);
  const [currentProject, setCurrentProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project data from localStorage
        const project = JSON.parse(localStorage.getItem("project"));

        setProject([...project])
        // Fetch user data from API
         if(project){
                for(let i of project){

                    let formData = { project: i._id };
            
                    let data = await fetch("http://localhost:3001/api/v2/get-all-tasks", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });
                    data = await data.json();
                    data.data=data.data.filter((d)=>d.project==project)
                    setTasks((prev)=>[...prev,...data.data]);
                }
            }
     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
let [member,setMember]=useState('')
  const handleClose = () => {
    setInputDiv("hidden");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    let project=JSON.parse(localStorage.getItem('project'))[0]
    console.log(project)
    let formData={
      title:newTask,
      desc:description,
      user:JSON.parse(localStorage.getItem('user'))._id,
      project:project._id,
      member:member
    }
    console.log(formData)
    let token=localStorage.getItem("token")
    if (newTask.trim() && description.trim()) {
        await  fetch('http://localhost:3001/api/v2/create-task',{
          method:"POST",
          headers: {
            'authorization': `Bearer ${token}`,            'Content-Type': 'application/json',
            // Forward the token in the proper format
        },
          body:JSON.stringify(formData)
        })
      const task = { title: newTask, description };
      setTasks([...tasks, task]);
      setNewTask('');
      setDescription('');
      handleClose()
      window.location.reload()
      // navigate('/all-tasks', { state: { tasks: [...tasks, task] } });
    }
  };
function handleClick1(e){
  const selectedIndex = e.target.value;
  setMember(members[selectedIndex]._id);
}
async function handleClick2(e){
  const selectedIndex = e.target.value;
  setCurrentProject(selectedIndex);
  const response = await fetch("http://localhost:3001/api/v1/users");
        
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const { users } = await response.json();
  let u=[]
  // Filter users if there is a project

  project.map((p)=>{
console.log(p,selectedIndex)
    if(p._id==selectedIndex){
      console.log(users)
   u= users.filter((d)=>p.members.includes(d._id))
  }})
  console.log("FINAL ANSDWER",u)
  setMembers([...u])
}
  return (
    <>
      <div className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
      <div className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-gray-900 p-4 rounded">
          <div className="text-xl flex justify-between items-end mb-4">
            <button onClick={handleClose} className="text-gray-300 hover:text-gray-100">
              <IoMdCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-2 mb-4 rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 rounded"
            />            <br></br>

            Select Project
            <br></br>

             <select onChange={handleClick2}>
              <option>None</option>
              {
                project.map((data,index)=>
                  
               <option key={data._id} value={data._id} >{data.projectName}</option>
                )
              }
            </select>
                       <br></br>

            Select Team Member
            <br></br>

            <select onChange={handleClick1}>
              <option>None</option>
              {
                members.map((data,index)=>
                  
               <option key={data._id} value={index} >{data.username}</option>
                )
              }
            </select>
            <br></br>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputData; 