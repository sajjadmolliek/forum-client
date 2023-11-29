/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../Hooks/useAuthProvider/useAuthProvider";
import { Skeleton } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthProvider();
  const location = useLocation();
 
  if (loading) {
    return (
      <div>
        <div className="hidden md:flex gap-10 justify-center items-center">
          <div className="p-10 min-h-screen space-y-5">
            <div className="flex gap-10 justify-center items-center">
              <Skeleton variant="circular" width={100} height={100} />
              <Skeleton variant="circular" width={100} height={100} />
              <Skeleton variant="circular" width={100} height={100} />
            </div>
            <div>
              <Skeleton variant="text" width={610} sx={{ fontSize: "5rem" }} />
            </div>
            <div>
              <Skeleton variant="rectangular" width={610} height={60} />
            </div>
            <div>
              <Skeleton variant="rounded" width={610} height={60} />
            </div>
            <div>
              <Skeleton variant="rounded" width={610} height={60} />
            </div>
          </div>
        </div>

        {/* for Phone device */}
        <div className=" md:hidden flex gap-10 justify-center items-center">
          <div className="p-10 min-h-screen space-y-5">
            <div className="flex gap-10 justify-center items-center">
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton variant="circular" width={50} height={50} />
            </div>
            <div>
              <Skeleton variant="text" width={350} sx={{ fontSize: "5rem" }} />
            </div>
            <div>
              <Skeleton variant="text" width={350} sx={{ fontSize: "5rem" }} />
            </div>
            <div>
              <Skeleton variant="rectangular" width={350} height={60} />
            </div>
            <div>
              <Skeleton variant="rounded" width={350} height={60} />
            </div>
            <div>
              <Skeleton variant="rounded" width={350} height={60} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return user ? (
    <div>{ children }</div>
) : (
    <Navigate to={ '/login' } state={ { from: location } } replace />
)
};

export default PrivateRoute;
