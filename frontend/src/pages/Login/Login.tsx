import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
