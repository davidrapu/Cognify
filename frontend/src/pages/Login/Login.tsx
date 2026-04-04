import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import image from "@/assets/images/Mobile login-amico.svg";
import { Logo } from "@/components/Logo";
import { useApiFetch } from "@/hooks/useApiFetch";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const apiFetch = useApiFetch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
  
      if (!res.ok) {
        setEmail(null)
        setPassword(null)
        setError(true);
        console.log(error, 'Username or password is incorrect');
        return;
      }
  
      const data = await res.json();
      login(data.user);
      navigate("/dashboard");
    } catch (error){
      console.log(error)
      setError(true)
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [error])
  
  return (
    <>
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
                error={error}
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
    </>
  );
}
