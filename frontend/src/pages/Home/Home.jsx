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

export default Home;
