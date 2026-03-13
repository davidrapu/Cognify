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

  const login = (fetchedUser?: User) => {
    setLoggedIn(true);
    // fetch user data from backend and set it to state
    setUser(fetchedUser || { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com" });
  };
  const logout = () => setLoggedIn(false);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
