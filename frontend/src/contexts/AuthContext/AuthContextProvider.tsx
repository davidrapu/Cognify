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
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (fetchedUser: User) => {
    setLoggedIn(true);
    // fetch user data from backend and set it to state
    setUser(fetchedUser);
  };
  const logout = () => setLoggedIn(false);
  
  const refresh = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // include cookies
      });
      if (response.status === 200) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setUser(data.user);
        setLoggedIn(true);
        return data.accessToken;
      } else {
        setAccessToken(null);
        setUser({} as User);
        setLoggedIn(false);
        return null
      }
    } catch {
      setAccessToken(null);
      setUser({} as User);
      setLoggedIn(false);
      return null
    }
  };

  useEffect(() => {

    // call the refresh token endpoint to get a new access token and user data if the user is logged in
    // eslint-disable-next-line
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, user, accessToken, refresh }}>
      {props.children}
    </AuthContext.Provider>
  );
}
