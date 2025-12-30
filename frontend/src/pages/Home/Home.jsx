import Nav from "../../components/Nav";
import Hero from "./Hero";
import Aims from "./Aims";
import { useAuth } from "../../Contexts/AuthContext";
import Box from '@mui/material/Box';


function Home(){
  const {loggedIn} = useAuth()
  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      rowGap: "7em"
    }}>
      <Nav loggedIn={loggedIn} />
      <Box component="main" sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "9em",
        alignItems: "center",
        mt: "6em"
      }}>
        <Hero loggedIn={loggedIn} />
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2em 0",
          bgcolor: "background.paper",
        }}>
          <Aims />
        </Box>
      </Box>
    </Box>
  );
}


export default Home;
