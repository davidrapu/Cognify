import { SignupForm } from "@/components/signup-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import image from "@/assets/images/Mobile login-amico.svg";
import { useApiFetch } from "@/hooks/useApiFetch";

const options = {
  enableHighAccuracy: true,
  // timeout: 5000,
  maximumAge: 0,
};

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [latAndLong, setLatAndLong] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const apiFetch = useApiFetch();

  const resetForm = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      resetForm();
      setError(true);
      return;
    }
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstName: userName.split(" ")[0],
          lastName: userName.split(" ")[1],
          email: email,
          password: password,
          latitude : latAndLong?.latitude,
          longitude : latAndLong?.longitude
        }),
      });

      if (res.status === 409) {
        resetForm();
        console.log("User already exists");
        setError(true);
        return;
      }
      const data = await res.json();
      login(data.user);
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      setError(true);
    }
  };

  const success = async (pos: GeolocationPosition) => {
    console.log("Geolocation permission granted. Position:", pos);
    // setAcceptedLocation(true);
    const { latitude, longitude } = pos.coords;
    setLatAndLong({ latitude, longitude });
  };
  const locationError = (err: GeolocationPositionError) => {
    console.error("Geolocation permission denied or error occurred:", err);
    // setAcceptedLocation(false);
    if (err.code === err.PERMISSION_DENIED) {
      console.log("User denied the request for Geolocation.");
      alert(
        "Geolocation permission is required for certain features of this app. Please allow access to use them.",
      );
      return;
    }

    console.error("An error occurred while fetching geolocation data.");
    alert(
      "An error occurred while fetching geolocation data.",
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, locationError, options); // Request geolocation permission and send data to server
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo size="small" className="text-2xl" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm
              error={error}
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
