import {AnimatedButton, Button} from "@/components/Button";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function Hero() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.section initial={{ opacity: 0, y:50 }} animate={{ opacity: 1, y: 0 }} transition={{duration: 0.5}} className="flex flex-col items-center gap-y-6 md:gap-y-8">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl font-(family-name:--headings) tracking-[0.2em] text-foreground leading-[0.9] m-0">
          WELCOME
        </h1>
        <p className="pt-2 text-center text-lg text-(--secondary-text) tracking-widest leading-[1.4]">
          Hi, welcome to Cognify. Helping you think sharper, every day.
        </p>
      </div>
      <AnimatedButton
        onClick={() => navigate(loggedIn ? "/dashboard" : "/quiz")}
        className="
          self-center
          text-xl
          py-[0.3em] px-[1em]
          rounded-[0.5em]
          border-2
          transition-shadow duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
        "
      >
        Get Started
      </AnimatedButton>
    </motion.section>
  );
}
