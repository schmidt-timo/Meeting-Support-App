import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import LoginScreen from "../pages/login";
import { supabase } from "./supabase";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkForSession = () => {
    const currentSession = supabase.auth.session();
    if (currentSession) {
      setSession(currentSession);
      setUser(currentSession.user);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkForSession();
  }, []);

  const logout = () => {
    supabase.auth.signOut();
    setSession(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        logout,
      }}
    >
      {loading && <LoadingScreen />}
      {!session && !loading && <LoginScreen />}
      {session && !loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
