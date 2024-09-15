import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../main';
import Loader from '../components/Loader';
const Profile = () => {
  const {isAuthenticated,loading,user}=useContext(Context);
  console.log(user.name);
  return (
    loading?<Loader/>:
      <div>
      <h1>{isAuthenticated ? user.name : 'Not Authenticated'}</h1>
      <h1>{isAuthenticated ? user.email : 'N/A'}</h1>
    </div>
  )
}

export default Profile
