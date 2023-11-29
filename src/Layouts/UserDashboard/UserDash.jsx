
import { Outlet } from "react-router-dom";

import AdminNavbar from "../../Pages/Admin/AdminNavbar/AdminNavbar";

const UserDash = () => {
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <Outlet></Outlet>
    </div>
  );
};

export default UserDash;
