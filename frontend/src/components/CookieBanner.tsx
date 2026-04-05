// components/CookieBanner.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const { setAcceptedCookies } = useAuth();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent || consent === "declined") setShow(true); // eslint-disable-line
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
    setAcceptedCookies(true);
    window.location.reload()
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
    setAcceptedCookies(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-x-6">
        <p className="text-sm text-muted-foreground">
          We use cookies to keep you signed in and improve your experience. By
          continuing, you agree to our use of cookies.
        </p>
        <div className="flex gap-x-2 shrink-0">
          <Button variant="outline" size="sm" onClick={decline}>
            Decline
          </Button>
          <Button size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
