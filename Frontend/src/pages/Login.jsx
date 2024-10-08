import React,{useContext, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
  const loginHandler =async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
    const {data}=await axios.post(`${server}/users/login`,{email:email,password:password},{
     headers:{
      "Content-Type":"application/json",
     },
     withCredentials:true,
    });
    toast.success(data.message);
    setIsAuthenticated(true);
    setLoading(false);
    }
    catch(error){
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  if(isAuthenticated)
    return <Navigate to={"/"}/>
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler} autoComplete="on"        >
          <input
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" required autoComplete="email"  
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" required autoComplete="password" 
          />
          <button disabled={loading} type="submit">Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
