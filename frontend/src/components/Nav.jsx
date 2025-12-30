import AppBar from "@mui/material/AppBar";
import { Link, NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import PsychologyIcon from "@mui/icons-material/Psychology";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";

const navLinkStyle = {
  color: "text.secondary",
  transition: "all 0.3s ease-in-out",
  ":hover": {
    color: "text.primary",
  },
  fontSize: "1.1em",
};
function Nav({ loggedIn, userObj }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.default",
        borderBottomLeftRadius: "0.4em",
        borderBottomRightRadius: "0.4em",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "1em",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <IconButton
              size="large"
              disableRipple
              edge="start"
              color="primary"
              aria-label="logo"
              sx={{
                columnGap: "0.3em",
              }}
            >
              <PsychologyIcon sx={{ fontSize: "1em" }} />
              <Typography
                sx={{
                  fontSize: "1em",
                  p: 0,
                  m: 0,
                  fontFamily: `"Bungee", sans-serif`,
                  letterSpacing: "0.3em",
                }}
              >
                COGNIFY
              </Typography>
            </IconButton>
          </Link>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: "flex",
              fontWeight: 400,
            }}
          >
            <NavLink
              to="/dashboard"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography sx={navLinkStyle}>Dashboard</Typography>
            </NavLink>
            <NavLink
              to="/games"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography sx={navLinkStyle}>Games</Typography>
            </NavLink>
          </Stack>
        </Box>
        <Link
          style={{
            textDecoration: "none",
            justifySelf: "flex-end",
          }}
          to={`${loggedIn ? "/profile" : "/login"}`}
        >
          {loggedIn ? (
            // Check if user has a profile picture, else show initials
            <Tooltip title="Open Profile Page">
              <Avatar
                alt="insert user name"
                sx={{
                  bgcolor: "secondary.main",
                }}
                src="insert user image here"
                // variant="rounded"
              >
                DR {/* Replace with dynamic initials */}
              </Avatar>
            </Tooltip>
          ) : (
            <Typography sx={navLinkStyle}>Log in / Sign up</Typography>
          )}
        </Link>
      </Toolbar>
      
    </AppBar>
  );
}

export default Nav;
