import Nav from "../../components/Nav";
import Hero from "./Hero";
import Domains from "./Domains";
import MiniGames from "./MiniGames";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "@/components/icons";

export default function Home() {
  const [sendAlert, setSendAlert] = useState<{message:string, title:string | null, show: boolean}>({message: '', title: null, show: false});
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (sendAlert.show) {
      const timer = setTimeout(() => {
        setSendAlert(prev => ({...prev, show: false}));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sendAlert.show]);

  return (
    <div className="relative flex flex-col gap-y-5 w-full">
      {sendAlert.show && <AlertUser message={sendAlert.message} title={sendAlert.title} />}
      <header>
        <Nav />
      </header>
      <main className="">
        <Hero loggedIn={loggedIn} />
        <Domains />
        <MiniGames loggedIn={loggedIn} />
        <CallToAction loggedIn={loggedIn} />
      </main>
      <Footer showAlert={(message:string, title: string | null) => {
        setSendAlert({message, title , show: true});
      }} />
    </div>
  );
}

function AlertUser({
  message,
  title = "",
}: {
  message: string;
  title: string | null;
}) {
  return (
    <Alert className="max-w-md fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-100 duration-300">
      <CheckCircle2Icon />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
