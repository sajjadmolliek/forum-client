import { Outlet } from "react-router-dom";
import AdminNavbar from "../../Pages/Admin/AdminNavbar/AdminNavbar";
import Footer from "../Footer/Footer";

const AdminDash = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default AdminDash;
