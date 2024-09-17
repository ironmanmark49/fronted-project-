import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({children}) => {

  if(sessionStorage.getItem("adminInfo")){
    return children;
}
return <Navigate to="/admin/login" replace />;
}
export default AdminPrivateRoute;