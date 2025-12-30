<<<<<<< HEAD
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

=======
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../../components/Button";

function Home() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
        <Aims />
      </main>
    </div>
  );
}

function Header() {
  const loggedIn = false;
  return (
    <div>
      <nav>
        <NavLink to="/">
          <p>Cognify</p>
        </NavLink>
        <ul>
          <NavLink to="/dashboard">
            <li>Dashboard</li>
          </NavLink>
          <NavLink to="/games">
            <li>Games</li>
          </NavLink>
          {loggedIn ? (
            <NavLink to="/profile">
              <li>Profile</li>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <li>Log In</li>
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.intro}>
        <h1 className={styles.head}>WELCOME.</h1>
        <p>Hi, welcome to Cognify. Helping you think sharper, every day.</p>
      </div>
      <Button className={styles.button}>Get Started</Button>
    </div>
  );
}

function Aims() {
  return (
    <div>
      <h2>Our Aims</h2>
      <div className="boxes">
        <div className="box1">Item1</div>
        <div className="box2">Item2</div>
        <div className="box3">Item3</div>
      </div>
    </div>
  );
}
>>>>>>> b3bb3c276b1b8fffee613d5b693dc54c5f98a013

export default Home;
