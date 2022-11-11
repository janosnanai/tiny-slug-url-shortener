import type { AppType } from "next/app";
import type { Session } from "next-auth";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster
        position="bottom-center"
        toastOptions={{ style: { color: "#f4f4f5", background: "#27272a" } }}
      />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
