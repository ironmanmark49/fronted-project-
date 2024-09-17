import React from 'react'
import { Navigate } from 'react-router-dom'

const UserPrivateRoutes = ({children}) => {

    if(sessionStorage.getItem("login status")){
        return children;
    }
  return <Navigate to="/login" replace />;
}

export default UserPrivateRoutes;
