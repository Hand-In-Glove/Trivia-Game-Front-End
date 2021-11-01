import type { AppProps /*, AppContext */ } from 'next/app';
import { useEffect } from "react";
import "../styles/globals.css";
import socket from "../utils/socket";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    return () => socket.disconnect();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
