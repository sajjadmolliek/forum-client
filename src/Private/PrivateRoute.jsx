/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../Hooks/useAuthProvider/useAuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthProvider();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={ location.pathname} replace />;
};


export default PrivateRoute;
