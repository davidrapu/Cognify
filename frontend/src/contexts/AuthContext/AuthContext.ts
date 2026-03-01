import User from "@/components/AppBar/User";
import { createContext, useContext } from "react";

type AuthContextType = {
    loggedIn: boolean;
    login: (fetchedUser?: User) => void;
    logout: () => void;
    user: User | null;
}
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const defaultAuthContext: AuthContextType = {
    loggedIn: false,
    login: () => null,
    logout: () => null,
    user: null
};


export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};