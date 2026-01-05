import React from "react";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const {loggedIn} = useAuth();
  const navigate = useNavigate()
  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-8xl font-(family-name:--headings) tracking-[0.3em] text-foreground leading-[0.9] m-0 ">
          WELCOME
        </h1>
        <p className="m-0 pt-1 text-center text-lg text-(--secondary-text) tracking-widest leading-[1.4] ">
          Hi, welcome to Cognify. Helping you think sharper, every day.
        </p>
      </div>
      <button onClick={() => navigate(loggedIn ? "/dashboard" : "/login")} className="self-end text-xl font-semibold tracking-[0.5] py-[0.3em] px-[1em] rounded-[0.5em] border-2 bg-primary text-primary-foreground cursor-pointer transition-shadow duration-200 ease-in-out hover:bg-primary/90 hover:shadow-sm "  >
        Get Started
      </button>
    </section>
  );
}
