import type { NextPage } from "next";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import ButtonPrimary from "../components/common/ui/button-primary";
import MainLayout from "../components/layouts/main.layout";

import garyPic from "../../public/gary.webp";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>TinySlug - Home</title>
        <meta
          name="description"
          content="Free, unlimited custom links & QR codes."
        />
      </Head>
      <MainLayout>
        <h1 className="mx-auto w-max bg-gradient-to-r from-lime-500 via-teal-500 to-indigo-500 bg-clip-text p-2 text-center text-xl font-bold tracking-tight text-transparent mobile-md:text-2xl mobile-lg:text-3xl sm:mb-14 sm:text-4xl">
          <span>
            <span className="text-4xl text-purple-500 mobile-md:text-5xl mobile-lg:text-6xl sm:text-7xl">
              T
            </span>
            <span className="-ml-1.5 mobile-md:-ml-2 mobile-lg:-ml-2.5 sm:-ml-3">
              iny
            </span>
          </span>
          <span>
            <span className="text-4xl text-purple-500 mobile-md:text-5xl mobile-lg:text-6xl sm:text-7xl">
              S
            </span>
            <span className="ml-0">lug</span>
          </span>
          <span>
            <span className="text-4xl text-purple-500 mobile-md:text-5xl mobile-lg:text-6xl sm:text-7xl">
              U
            </span>
            <span className="-ml-0.5 mobile-lg:-ml-1">rl</span>
          </span>
          <span>
            <span className="text-4xl text-purple-500 mobile-md:text-5xl mobile-lg:text-6xl sm:text-7xl">
              S
            </span>
            <span className="ml-0">hortener</span>
          </span>
        </h1>

        <div className="m-7 flex flex-col-reverse items-center justify-center sm:flex-row">
          <Image
            src={garyPic}
            alt="picture of gary the slug"
            className="mr-12 w-48"
          />
          <div className="relative mb-4 rounded-lg bg-zinc-900 p-5 shadow before:absolute before:bottom-0 before:left-2/3 before:h-6 before:w-6 before:translate-y-1/2 before:rotate-45 before:bg-zinc-900 mobile-lg:p-7 sm:before:bottom-1/3 sm:before:left-0 sm:before:-translate-x-1/2">
            <h2 className="max-w-[9rem] text-center text-xl font-semibold tracking-wide text-zinc-400 mobile-lg:max-w-[12rem] mobile-lg:text-2xl">
              Free, unlimited custom links & QR codes.
            </h2>
            {sessionData && (
              <Link
                href={`/user-dashboard`}
                className="group relative mx-auto mt-5 block w-max rounded-lg border-2 border-pink-600 bg-pink-600 px-3 py-1 text-center text-base font-semibold uppercase text-pink-100 transition duration-300 ease-out hover:bg-transparent mobile-lg:px-5 mobile-lg:py-2 mobile-lg:text-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <span>get started</span>
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 mobile-lg:h-6 mobile-lg:w-6 mobile-lg:group-hover:translate-x-2" />
                </div>
                <span className="absolute inset-0 h-full w-full animate-pulse rounded-lg bg-transparent shadow-[0_2px_17px_5px] shadow-pink-600/50 group-hover:animate-none" />
              </Link>
            )}
            {!sessionData && (
              <ButtonPrimary
                className="group relative mx-auto mt-5 block w-max"
                onClick={signIn}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>sign in</span>
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 mobile-lg:h-6 mobile-lg:w-6 mobile-lg:group-hover:translate-x-2" />
                </div>
                <span className="absolute inset-0 h-full w-full animate-pulse rounded-lg bg-transparent shadow-[0_2px_17px_5px] shadow-pink-600/50 group-hover:animate-none" />
              </ButtonPrimary>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
