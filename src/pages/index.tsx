import type { NextPage } from "next";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import MainLayout from "../components/layouts/main.layout";

import garyPic from "../../public/gary.svg";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>tinySlug</title>
        <meta name="description" content="url shortener" />
        <link rel="icon" href="/gary.svg" />
      </Head>
      <MainLayout>
        <h1 className="mx-auto flex max-w-xl justify-evenly text-center text-3xl font-bold text-zinc-100">
          <span className="w-24 text-left">
            <span className="text-7xl text-purple-500">T</span>
            <span className="-ml-3">iny</span>
          </span>
          <span className="w-24 text-left">
            <span className="text-7xl text-purple-500">S</span>
            <span>lug</span>
          </span>
          <span className="w-24 text-left">
            <span className="text-7xl text-purple-500">U</span>
            <span className="-ml-1">rl</span>
          </span>
          <span className="w-24 text-left">
            <span className="text-7xl text-purple-500">S</span>
            <span>hortener</span>
          </span>
        </h1>
        <h2 className="mt-5 text-center text-2xl font-semibold tracking-wide text-zinc-400">
          free, unlimited custom links & QR codes
        </h2>
        <div className="m-7 mt-16 flex justify-center gap-12">
          <Image
            src={garyPic}
            alt="picture of gary the slug"
            className="h-64 w-64 antialiased"
          />
          <div className="relative rounded-lg bg-zinc-900 p-7 shadow after:absolute after:bottom-1/3 after:left-0 after:h-6 after:w-6 after:-translate-x-1/2 after:rotate-45 after:bg-zinc-900">
            <p className="text-center text-3xl font-semibold text-zinc-50">
              {sessionData
                ? `Hello, ${sessionData.user?.name}`
                : "Please sign in"}
            </p>
            <Link
              href={`/user-dashboard`}
              className="group relative mx-auto mt-5 block w-max rounded-lg border-2 border-pink-600 bg-pink-600 px-5 py-2 text-center text-lg font-semibold uppercase text-pink-100 transition duration-300 ease-out hover:bg-zinc-1000"
            >
              <div className="flex items-center justify-between gap-2">
                <span>get started</span>
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
              </div>
              <span className="absolute inset-0 h-full w-full animate-pulse rounded-lg bg-transparent shadow-[0_2px_17px_5px] shadow-pink-600/50 group-hover:animate-none" />
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
