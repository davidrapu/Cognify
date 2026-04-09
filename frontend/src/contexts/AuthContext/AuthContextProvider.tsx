import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";



type AuthContextProviderProps = {
    children: React.ReactNode;
}

type User = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string
}

const API_URL = import.meta.env.VITE_API_URL;

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const cookiesAccepted = localStorage.getItem("cookie-consent") === "accepted";
  const [acceptedCookies, setAcceptedCookies] = useState(cookiesAccepted);

  const login = (fetchedUser: User) => {
    setLoggedIn(true);
    // fetch user data from backend and set it to state
    setUser(fetchedUser);
  };
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: acceptedCookies ? "include" : "omit", // include cookies if user accepted cookies, otherwise omit them
    });
    if (res.status === 200) {
      setLoggedIn(false);
      setUser({} as User);
    }
  };
  
  const refresh = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: acceptedCookies ? "include" : "omit", // include cookies if user accepted cookies, otherwise omit them
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(data.user);
        setLoggedIn(true);
        return data.accessToken;
      } else {
        setUser({} as User);
        setLoggedIn(false);
        return null
      }
    } catch {
      setUser({} as User);
      setLoggedIn(false);
      return null
    }
  };

  useEffect(() => {
    // call the refresh token endpoint to get a new access token and user data if the user is logged in
    // eslint-disable-next-line
    refresh();
  }, []); // eslint-disable-line

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, user, refresh, setAcceptedCookies, acceptedCookies }}>
      {props.children}
    </AuthContext.Provider>
  );
}
