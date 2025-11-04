"use client"

import { IUser } from "@/types/types";
import checkAuthStatus from "@/utility/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const userContext = createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within the useProvider");
  }
  return context;
};

export const UserProvider = ({
  initializer,
  children,
}: {
  initializer?: IUser | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const revaldate = async () => {
      try {
        const res = await checkAuthStatus();

        setUser(res.user);
      } catch {
        setUser(null);
      }
    };
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
