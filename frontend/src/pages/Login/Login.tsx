import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username: email, password }),
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
