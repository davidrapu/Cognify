import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import image from "@/assets/images/Mobile login-amico.svg";
import { Logo } from "@/components/Logo";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{

      const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        setEmail(null)
        setPassword(null)
        setError(true);
        console.log(error, 'Username or password is incorrect');
        return;
      }
  
      // const data = await response.json();
      login()
      navigate("/dashboard");
    } catch (error){
      console.log(error)
    }
  };
  
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo size="small" className="text-2xl" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={image}
          alt="Image"
          className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
