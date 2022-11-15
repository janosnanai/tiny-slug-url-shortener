import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { Grid } from "react-loader-spinner";

import { loadingSpinnerGetterAtom } from "../../utils/atoms/loading-spinner.atom";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { data: sessionData } = useSession();
  const [spinnerState] = useAtom(loadingSpinnerGetterAtom);
  const { isLoading } = spinnerState;

  return (
    <main className="min-h-screen bg-zinc-1000">
      <header>
        <nav className="container relative mx-auto flex justify-between p-2">
          <div className="absolute top-3 left-1.5">
            <Grid
              height="20"
              width="20"
              color="#2dd4bf"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={isLoading}
            />
          </div>
          <Link
            href="/"
            className="ml-6 font-bold text-zinc-100 transition hover:text-pink-600"
          >
            <span>TSUS</span>
          </Link>
          <div className="flex items-center justify-between">
            {sessionData && (
              <Image
                src={sessionData.user?.image || ""}
                width={24}
                height={24}
                alt="user avatar"
                className="rounded-full"
              />
            )}
            <button
              onClick={() => {
                sessionData ? signOut() : signIn();
              }}
              className="rounded-md px-3 py-1 text-sm uppercase text-zinc-100 transition-colors hover:text-pink-600"
            >
              {sessionData ? "sign out" : "sign in"}
            </button>
            <div className="mx-3 h-full w-0.5 rounded-full bg-white/30"></div>
            <Link href="/" className="group">
              <svg
                viewBox="0 0 16 16"
                className="h-5 w-5 text-zinc-200 transition group-hover:text-pink-600"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </Link>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
}

export default MainLayout;
