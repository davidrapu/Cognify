import { Box, Button, Fade, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Hero({ loggedIn }) {
  const navigate = useNavigate();
  return (
    <Fade in={true} timeout={2000}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          rowGap: "1em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              textShadow: "5px 5px 4px rgb(0,0,0,0.3)",
              fontSize: "96px",
              letterSpacing: "0.3em",
              lineHeight: 0.9,
              color: "text.primary",
              m: 0,
            }}
            variant="h1"
          >
            WELCOME
          </Typography>
          <Typography
            sx={{
              pt: "0.3em",
              m: 0,
              textAlign: "center",
              fontSize: "1.2rem",
              color: "text.secondary",
              letterSpacing: "0.1em",
              opacity: 0.9,
              lineHeight: 1.4,
            }}
          >
            Hi, welcome to Cognify. Helping you think sharper, every day.
          </Typography>
        </Box>
        <Button
          onClick={() => navigate(`${loggedIn ? "/dashboard" : "/login"}`)}
          sx={{
            alignSelf: "flex-end",
            fontSize: "1.2rem",
            fontWeight: 600,
            letterSpacing: 0.5,
            padding: "0.5em 1em",
            borderRadius: "0.5em",
            border: "2px solid",
            bgcolor: "primary.main",
            color: "background.default",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            ":hover": {
              transform: "translateY(-2px)",
              bgcolor: "transparent",
              color: "primary.main",
            },
          }}
          variant="outlined"
        >
          Get Started
        </Button>
      </Box>
    </Fade>
  );
}

export default Hero;
