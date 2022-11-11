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
            className="bg-te ml-6 text-xl text-zinc-100 transition-colors hover:text-violet-400"
          >
            tinySlug
          </Link>
          <div className="flex justify-between">
            {sessionData && (
              <Image
                src={sessionData.user?.image || ""}
                width={32}
                height={32}
                alt="user avatar"
                className="rounded-full"
              />
            )}
            <button
              onClick={() => {
                sessionData ? signOut() : signIn();
              }}
              className="rounded-md px-3 py-1 uppercase text-zinc-100 transition-colors hover:text-violet-400"
            >
              {sessionData ? "sign out" : "sign in"}
            </button>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
}

export default MainLayout;
