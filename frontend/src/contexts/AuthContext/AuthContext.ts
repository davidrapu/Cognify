import { createContext, useContext } from "react";

type AuthContextType = {
    loggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    loggedIn: false,
    login: () => null,
    logout: () => null
};


export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};