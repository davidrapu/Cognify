import { useState } from "react";
import { AuthContext } from "./AuthContext";



type AuthContextProviderProps = {
    children: React.ReactNode;
}

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
