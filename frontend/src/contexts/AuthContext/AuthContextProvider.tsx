import { useState } from "react";
import { AuthContext } from "./AuthContext";



type AuthContextProviderProps = {
    children: React.ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
