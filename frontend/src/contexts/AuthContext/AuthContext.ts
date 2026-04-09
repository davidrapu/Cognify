import User from "@/components/AppBar/UserProfile";
import { createContext, useContext } from "react";

type AuthContextType = {
  loggedIn: boolean;
  login: (fetchedUser: User) => void;
  logout: () => void;
  refresh: () => Promise<string | null>;
  user: User;
  setAcceptedCookies: (accepted: boolean) => void;
  acceptedCookies: boolean;
};
type User = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
};

const defaultAuthContext: AuthContextType = {
  loggedIn: false,
  login: () => null,
  logout: () => null,
  refresh: () => Promise.resolve(null),
  setAcceptedCookies: () => null,
  acceptedCookies: false,
  user: {} as User,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};
