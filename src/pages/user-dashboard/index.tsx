import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import ButtonPrimary from "../../components/ui/button-primary";
import MainLayout from "../../components/layouts/main.layout";
import CreateLinkModal from "../../components/modals/create-link.modal";
import UpdateLinkModal from "../../components/modals/update-link.modal";
import ConfirmDeleteModal from "../../components/modals/confirm-delete.modal";
import QrCodeModal from "../../components/modals/qr-code.modal";
import ShortLinkItem from "../../components/short-links/short-link-item";
import { createLinkSetterAtom } from "../../utils/atoms/create-link.atom";
import { loadingSpinnerSetterAtom } from "../../utils/atoms/loading-spinner.atom";
import { trpc } from "../../utils/trpc";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import ButtonSecondary from "../../components/ui/button-secondary";

const UserDashboardPage: NextPage = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [limit, setLimit] = useState(5);
  const [, setCreateLinkState] = useAtom(createLinkSetterAtom);
  const [, setSpinnerState] = useAtom(loadingSpinnerSetterAtom);
  const {
    data: queryData,
    isFetching,
    isLoading,
    error,
    fetchNextPage,
    refetch,
  } = trpc.link.getInfinite.useInfiniteQuery(
    { limit },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  function handleCreateLinkOpen() {
    setCreateLinkState({ isOpen: true });
  }

  // show fetching status in top spinner
  useEffect(() => {
    setSpinnerState({ isLoading: isFetching });
    return () => {
      setSpinnerState({ isLoading: false });
    };
  }, [isFetching, setSpinnerState]);

  // fire an error-toast when query errors
  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  // refetch current page
  useEffect(() => {
    refetch({ refetchPage: (_page, idx) => idx === currentPageNum - 1 });
  }, [currentPageNum, refetch]);

  // incrementally prefetch next pages
  useEffect(() => {
    const cursor = queryData?.pages[queryData.pages.length - 1]?.nextCursor;
    if (!cursor) return;
    fetchNextPage();
  }, [fetchNextPage, queryData]);

  return (
    <MainLayout>
      <CreateLinkModal />
      <UpdateLinkModal />
      <ConfirmDeleteModal />
      <QrCodeModal />
      <div className="mx-auto my-3 w-max">
        <ButtonPrimary onClick={handleCreateLinkOpen}>
          create new link
        </ButtonPrimary>
      </div>

      {!isLoading && queryData && (
        <ul className="mt-3 space-y-3 text-zinc-100 sm:mx-3 md:mx-12">
          {queryData.pages[currentPageNum - 1]?.items.map((shortLink) => (
            <ShortLinkItem key={shortLink.id} shortLink={shortLink} />
          ))}
        </ul>
      )}

      <div>
        <Oval
          visible={isLoading}
          wrapperClass="justify-center mt-10"
          strokeWidth={5}
          height={72}
          width={72}
          color="#2dd4bf"
          secondaryColor="#2dd4bf"
          ariaLabel="oval-loading"
        />
      </div>
      <div className="my-5 flex items-center justify-center gap-2">
        <ButtonSecondary
          onClick={() => setCurrentPageNum((prev) => prev - 1)}
          disabled={!(currentPageNum > 1)}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </ButtonSecondary>
        {(() => {
          const maxPageNum = queryData?.pages.length;
          const pageButtons = [];
          if (!maxPageNum) return;
          for (let i = 1; i <= maxPageNum; i++) {
            if (
              i === 1 ||
              (i >= currentPageNum - 1 && i <= currentPageNum + 1) ||
              (currentPageNum >= 1 &&
                currentPageNum <= 4 &&
                i >= 1 &&
                i <= 5) ||
              (currentPageNum <= maxPageNum &&
                currentPageNum >= maxPageNum - 3 &&
                i <= maxPageNum &&
                i >= maxPageNum - 4) ||
              i === maxPageNum
            ) {
              pageButtons.push(
                <PageButton
                  key={"pb" + i}
                  onClick={setCurrentPageNum}
                  value={i}
                  active={currentPageNum === i}
                />
              );
            } else if (i === 2 || i === maxPageNum - 1) {
              pageButtons.push(
                <span className="px-2 py-1 text-zinc-400">...</span>
              );
            }
          }
          return pageButtons;
        })()}
        <ButtonSecondary
          onClick={() => setCurrentPageNum((prev) => prev + 1)}
          disabled={
            !(
              queryData?.pages.length &&
              currentPageNum < queryData?.pages.length
            )
          }
        >
          <ChevronRightIcon className="h-6 w-6" />
        </ButtonSecondary>
      </div>
    </MainLayout>
  );
};

export default UserDashboardPage;

interface PageButtonProps {
  onClick: (value: number) => void;
  value: number;
  active: boolean;
}

function PageButton({ onClick, value, active }: PageButtonProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-lg px-2 py-1 hover:bg-white/10 ${
        active ? "text-teal-300" : "text-zinc-400 hover:text-zinc-100"
      }`}
    >
      {value}
    </button>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
