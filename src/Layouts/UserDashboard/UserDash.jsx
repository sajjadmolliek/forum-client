
import { Outlet } from "react-router-dom";

import AdminNavbar from "../../Pages/Admin/AdminNavbar/AdminNavbar";
import Footer from "../Footer/Footer";

const UserDash = () => {
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <Outlet></Outlet>
      <Footer/>
    </div>
  );
};

export default UserDash;
