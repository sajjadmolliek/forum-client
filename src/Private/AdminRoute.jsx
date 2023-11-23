import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin/UseAdmin";
import useAuthProvider from "../Hooks/useAuthProvider/useAuthProvider";

const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading] = UseAdmin()
    const {user,loading} = useAuthProvider()
    const location = useLocation();


    if (loading || isAdminLoading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner text-warning"></span>
          </div>
        );
      }
      if (user && isAdmin) {
        return children;
      }
      return <Navigate to="/login" state={ location.pathname} replace />;
};

export default AdminRoute;