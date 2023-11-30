import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import ErrorPage from "../Components/Error/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import PostDetails from "../Pages/Home/Post/PostDetails";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminDash from "../Layouts/AdminDashboard/AdminDash";
import UserDash from "../Layouts/UserDashboard/UserDash";
import PrivateRoute from "../Private/PrivateRoute";
import UserProfile from "../Pages/UserInfo/UserProfile/UserProfile";
import EditAbout from "../Pages/UserInfo/EditAbout/EditAbout";
import AddPost from "../Pages/UserInfo/AddPost/AddPost";
import MyPosts from "../Pages/UserInfo/MyPosts/MyPosts";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import Announcement from "../Pages/Admin/Announcement/Announcement";
import ReportedComments from "../Pages/Admin/ReportedComments/ReportedComments";
import CommentDetails from "../Pages/UserInfo/CommentDetails/CommentDetails";
import Membership from "../Pages/Membership/Membership";
import Notify from "../Components/Notification/Notify";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/Membership",
        element: <PrivateRoute><Membership/></PrivateRoute>,
      },
      {
        path: "/notification",
        element: <PrivateRoute><Notify/></PrivateRoute>,
      },
      {
        path: "/post/:id",
        element:<PostDetails/> ,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
    ],
  },
  // Admin Routs

  {
    path: "/adminDash",
    element: (
      <PrivateRoute>
        <AdminDash/>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/adminDash",
        element: (
          <PrivateRoute>
            <AdminProfile/>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDash/manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers/>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDash/reportedComments",
        element: (
          <PrivateRoute>
            <ReportedComments/>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDash/announcement",
        element: (
          <PrivateRoute>
            <Announcement/>
          </PrivateRoute>
        ),
      },
    ],
  },

  // User Routes
  {
    path: "/userProfile",
    element: (
      <PrivateRoute>
        <UserDash></UserDash>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/userProfile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/userProfile/myPost",
        element: (
          <PrivateRoute>
            <MyPosts></MyPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "/userProfile/addPost",
        element: (
          <PrivateRoute>
            <AddPost></AddPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/userProfile/editAbout",
        element: (
          <PrivateRoute>
            <EditAbout></EditAbout>
          </PrivateRoute>
        ),
      },
      {
        path: "/userProfile/commentDetails/:id",
        element:<CommentDetails/> ,
      },
    ],
  },
]);

export default Router;
