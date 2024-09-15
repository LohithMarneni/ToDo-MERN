import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh]=useState(false);
  const {isAuthenticated}=useContext(Context);
  const updateHandler=async (id)=>{
    try{
      const {data}=await axios.patch(`${server}/tasks/${id}`,{},{
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh(prev=>!prev);
    }
    catch(error){
      // const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(error.response.data.message);
      // toast.error(errorMessage);
    }
  }

  const deleteHandler=async (id)=>{
    try{
      const {data}=await axios.delete(`${server}/tasks/${id}`,{
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh(prev=>!prev);
    }
    catch(error){
      // const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(error.response.data.message);
    }
  }
  const addTaskHandler=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const {data}=await axios.post(`${server}/tasks/addtask`,{
        title,description:desc,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        }
      });
      setTitle("");
      setDesc("");
      toast.success(data.message);
      setLoading(false);
      setRefresh(prev=>!prev);
    }
   catch (error) {
      // const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(()=>{
    axios.get(`${server}/tasks/gettasks`,{
      withCredentials:true,
    }).then(res=>{
        setTasks(res.data.tasks);
    }).catch(e=>{
      toast.error(e.response.data.message);
      // console.log(e.response.data.message);
    });
  },[refresh]);
  if(!isAuthenticated)
    return <Navigate to={"/login"}/>
  return (
    <div className="container">
      <div className="login">
      <section>
      <form onSubmit={addTaskHandler} autoComplete="on"        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title" required autoComplete="title"  
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description" required autoComplete="Description"  
          />
          <button disabled={loading} type="submit">Add Task</button>
        </form>
      </section>
      </div>
        <section className="todosContainer"> 
          {tasks.map((i)=>(
            <TodoItem key={i._id} id={i._id} title={i.title} description={i.description} isCompleted={i.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
          ))}
        </section>
    </div>
  )
}

export default Home
