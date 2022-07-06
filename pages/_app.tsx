import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase-config";
import LoginPage from "./login";
import { useRouter } from "next/router";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Component {...pageProps} />;
  }

  return <LoginPage />;
}

export default MyApp;
