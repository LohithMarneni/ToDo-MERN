import React,{useContext, useState} from 'react'
import { Link ,Navigate} from "react-router-dom";
import axios from "axios";
import { Context, server } from '../main';
import toast from "react-hot-toast";
const Register = () => {
  const [fname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
  const signupHandler =async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
    const {data}=await axios.post(`${server}/users/signup`,{name:fname,email:email,password:password},{
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
  return (
    <div className="login">
      <section>
        <form onSubmit={signupHandler} autoComplete="on">
        <input type="text" value={fname}
            onChange={(e) => setName(e.target.value)} placeholder='Name' required autoComplete="name"  />
          <input type="email" placeholder='Email' value={email}
            onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          <input type="password" placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)} required autoComplete="password"/>
          <button type='submit' disabled={loading}>Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Login</Link>
        </form>
      </section>
    </div>
  );
}

export default Register
                             