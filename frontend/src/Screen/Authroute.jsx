import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';



function Authroute() {
  return !localStorage.getItem("user") ? (
   
    <Outlet /> ) : (

    <Navigate to={'/home'}/>
 ) 
  
}

export default Authroute