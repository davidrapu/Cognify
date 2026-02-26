import { SignupForm } from "@/components/signup-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const resetForm = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      resetForm()
      return;
    }

    // encrypt(password)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        firstName: userName.split(" ")[0],
        lastName: userName.split(" ")[1],
        email: email,
        password: password,
      }),
    });

    if (response.status === 409) {
      resetForm()
      console.log("User already exists");
      return;
    }

    login()
    navigate("/dashboard");

  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm 
          userName={userName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setUserName={setUserName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
