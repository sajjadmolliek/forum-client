import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import useUserData from "../../Hooks/useUserData/useUserData";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";

const Navbar = () => {
  const { user, logOut } = useAuthProvider();
  const [, admin, setAdmin] = useUserData();

  const Navigate = useNavigate();
  const userName = user?.displayName;
  const pages = ["Home", "Membership"];
  const settings = ["Name", "Dashboard", "login"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const axiosPublic = useAxiousPublic();
  const [notify, setNotify] = React.useState(0);

  React.useEffect(() => {
    axiosPublic
      .get(`/notification?email=${user?.email}`)
      .then((res) => setNotify(res.data.notifications));
  }, [user?.email,axiosPublic,notify]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logOut();
    setAdmin(false);
    Navigate("/login");
  };

  // Get User Role For Go To Dashboard:
  const handleSeeNotification = ( ) =>{
    axiosPublic
    .patch(`/patchNotification?email=${user?.email}`)
    .then(() => {
  
      setNotify(0);
    });

    
  }

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="Logo" className=" hidden lg:flex w-[4rem]" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: 4,
              py: 2,
              display: { xs: "none", md: "flex", color: "blue" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <p className="font-bold font-mono text-3xl">ChitChat</p>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                page === "Home" ? (
                  <NavLink to={`/`} key={page}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </NavLink>
                ) : (
                  <NavLink to={`/${page}`} key={page}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </NavLink>
                )
              )}
            </Menu>
          </Box>
          <img
            src={logo}
            alt="Logo"
            className=" flex lg:hidden w-[3rem] py-5"
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none", color: "blue" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <p className="font-bold font-mono text-3xl">ChitChat</p>
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page === "Home" ? (
                <NavLink to={`/`} key={page}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "blue", display: "block" }}
                  >
                    {page}
                  </Button>
                </NavLink>
              ) : (
                <NavLink to={`/${page}`} key={page}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "blue", display: "block" }}
                  >
                    {page}
                  </Button>
                </NavLink>
              )
            )}
          </Box>
          {user ? (
            <>
              <NavLink to={"/notification"}>
              <Box onClick={handleSeeNotification}>
                <Badge badgeContent={notify} color="primary" sx={{ mr: 2 }}>
                  <NotificationsIcon sx={{ color: "blue", fontSize: "2rem" }} />
                </Badge>
              </Box>
              </NavLink>
            </>
          ) : (
            ""
          )}

          <Box sx={{ flexGrow: 0.1 }}>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <img
                    className="rounded-full w-[3rem] ml-[1rem]"
                    src={user?.photoURL}
                    alt="User"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Link to={"/login"}>
                <Button
                  sx={{ ml: 5, background: "blue" }}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Join Us
                </Button>
              </Link>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {user && setting === "login" ? (
                    <Typography onClick={handleLogout} textAlign="center">
                      Logout
                    </Typography>
                  ) : user && setting === "Name" ? (
                    userName
                  ) : user && admin && setting === "Dashboard" ? (
                    <Link to={`/adminDash`}>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  ) : (
                    <Link to={`/userProfile`}>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
