import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';



function Protected() {

  return localStorage.getItem('userdata') ? (
     <Outlet />
  ) : (
    
     <Navigate to={"/"}/>
  )
     
}

export default Protected;