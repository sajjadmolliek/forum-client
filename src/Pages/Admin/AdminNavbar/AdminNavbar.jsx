/* eslint-disable react/prop-types */
import * as React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AwesomeButton } from "react-awesome-button";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import useUserData from "../../../Hooks/useUserData/useUserData";

const drawerWidth = 240;

const AdminNavbar = (props) => {
  const {  logOut } = useAuthProvider();
  const [, admin, setAdmin] = useUserData();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    logOut();
    setAdmin(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Typography>
        <p className="font-bold font-mono text-3xl -mt-5 pb-10 text-center">
          ChitChat
        </p>
      </Typography>
      <Divider />
      <List className="space-y-4 grid grid-cols-1 justify-center items-center">
        <AwesomeButton type="primary">
          <NavLink to={"/"}>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </NavLink>
        </AwesomeButton>
        {admin ? (
          <>
            {/* Admin Route Link  */}
            <AwesomeButton type="primary">
              <NavLink to={"/adminDash"}>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Admin Profile"} />
                </ListItem>
              </NavLink>
            </AwesomeButton>
            <AwesomeButton type="primary">
              <NavLink to={"/adminDash/manageUsers"}>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Manage Users"} />
                </ListItem>
              </NavLink>
            </AwesomeButton>
            <AwesomeButton type="primary">
              <NavLink to={"/adminDash/reportedComments"}>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Activities"} />
                </ListItem>
              </NavLink>
            </AwesomeButton>
            <AwesomeButton type="primary">
              <NavLink to={"/adminDash/announcement"}>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Announcement"} />
                </ListItem>
              </NavLink>
            </AwesomeButton>
          </>
        ) : (
          <>
            {/* User Route Link */}

            <AwesomeButton type="primary">
              <NavLink to={"/userProfile"}>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"My Profile"} />
                </ListItem>
              </NavLink>
            </AwesomeButton>
            <AwesomeButton type="primary">
              <NavLink to={"/userProfile/myPost"}>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"My Post"} />
                </ListItem>
              </NavLink>
            </AwesomeButton>
            <AwesomeButton type="primary">
              <NavLink to={"/userProfile/addPost"}>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Add Post"} />
                </ListItem>
              </NavLink>
            </AwesomeButton>
          </>
        )}

        {/* Logout button */}
        <AwesomeButton type="primary">
          <ListItem onClick={handleLogout}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </AwesomeButton>
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <p className="font-bold font-mono text-3xl">ChitChat</p>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      ></Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default AdminNavbar;
