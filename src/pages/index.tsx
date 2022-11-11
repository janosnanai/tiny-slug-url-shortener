import type { NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import MainLayout from "../components/layouts/main.layout";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>tinySlug</title>
        <meta name="description" content="url shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <h1 className="text-center text-3xl font-semibold text-zinc-50">
          {sessionData ? `hello, ${sessionData.user?.name}` : "please sign in"}
        </h1>
        <Link
          href={`/user-dashboard`}
          className="rounded-lg bg-violet-500 p-3 text-xl font-semibold uppercase text-zinc-100"
        >
          {"let's get started"}
        </Link>
      </MainLayout>
    </>
  );
};

export default Home;
