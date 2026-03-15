import { SignupForm } from "@/components/signup-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import image from "@/assets/images/Mobile login-amico.svg";
import { useApiFetch } from "@/hooks/useApiFetch";

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const apiFetch = useApiFetch()

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

    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: userName.split(" ")[0],
        lastName: userName.split(" ")[1],
        email: email,
        password: password,
      }),
      credentials: "include"
    });

    if (res.status === 409) {
      resetForm()
      console.log("User already exists");
      return;
    }

    login()
    navigate("/dashboard");

  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo size="small" className="text-2xl" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm
              userName={userName}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              setUserName={setUserName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={image}
          alt="Image"
          className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.65]"
        />
      </div>
    </div>
  );
}
