import { Outlet } from "react-router-dom";
import Navbar from "../../App";
import Footer from "../Footer/Footer";


const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;