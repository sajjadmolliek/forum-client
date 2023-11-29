import { Outlet } from "react-router-dom";
import AdminNavbar from "../../Pages/Admin/AdminNavbar/AdminNavbar";

const AdminDash = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminDash;
