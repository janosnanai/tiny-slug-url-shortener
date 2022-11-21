import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "react-hot-toast";

import MainLayout from "../../components/layouts/main.layout";
import SearchBar from "../../components/ui/search-bar";
import LimitSelect from "../../components/ui/limit-select";
import SortSelect from "../../components/ui/sort-select";
import SortSwitch from "../../components/ui/sort-switch";
import ButtonPrimary from "../../components/ui/button-primary";
import ShortLinkItem from "../../components/short-links/short-link-item";
import Pagination from "../../components/pagination/pagination";

import CreateLinkModal from "../../components/modals/create-link.modal";
import UpdateLinkModal from "../../components/modals/update-link.modal";
import ConfirmDeleteModal from "../../components/modals/confirm-delete.modal";
import QrCodeModal from "../../components/modals/qr-code.modal";

import { createLinkSetterAtom } from "../../utils/atoms/create-link.atom";
import { loadingSpinnerSetterAtom } from "../../utils/atoms/loading-spinner.atom";
import { limitGetterAtom } from "../../utils/atoms/limit.atom";
import { sortCompositeGetterAtom } from "../../utils/atoms/sort-select.atom";
import {
  currentPageNumGetterAtom,
  currentPageNumSetterAtom,
} from "../../utils/atoms/current-page-num.atom";

import { trpc } from "../../utils/trpc";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { filterGetterAtom } from "../../utils/atoms/filter.atom";

const UserDashboardPage: NextPage = () => {
  const [currentPageNum] = useAtom(currentPageNumGetterAtom);
  const [, setCurrentPageNum] = useAtom(currentPageNumSetterAtom);
  const [filter] = useAtom(filterGetterAtom);
  const [limit] = useAtom(limitGetterAtom);
  const [orderBy] = useAtom(sortCompositeGetterAtom);
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
    // something funky, only ts-parsing maybe?
    // eslint-disable-next-line
    // @ts-ignore
    { limit, filter, orderBy },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // dial back current page num if its too big
      onSuccess: ({ pages }) => {
        if (currentPageNum <= pages.length) return;
        setCurrentPageNum(pages.length);
      },
    }
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
    <>
      <MainLayout>
        <div className="mx-auto p-3 sm:container">
          <div className="flex justify-between sm:mx-3 md:mx-12">
            <div className="flex items-center gap-3">
              <SearchBar />
              <SortSwitch />
              <SortSelect />
              <LimitSelect />
            </div>
            <ButtonPrimary onClick={handleCreateLinkOpen}>
              create new link
            </ButtonPrimary>
          </div>
          {!isLoading && queryData && (
            <ul className="mt-3 space-y-3 sm:mx-3 md:mx-12">
              {queryData.pages[currentPageNum - 1]?.items.map((shortLink) => (
                <ShortLinkItem key={shortLink.id} shortLink={shortLink} />
              ))}
            </ul>
          )}
          {!isLoading && !queryData?.pages[currentPageNum - 1]?.items.length && (
            <div className="my-20 text-center text-zinc-100">
              <p>no links to show</p>
            </div>
          )}

          <div>
            <Oval
              visible={isLoading}
              wrapperClass="justify-center my-20"
              strokeWidth={5}
              height={72}
              width={72}
              color="#2dd4bf"
              secondaryColor="#2dd4bf"
              ariaLabel="oval-loading"
            />
          </div>
          <Pagination maxPageNum={queryData?.pages.length} />
        </div>
      </MainLayout>
      <CreateLinkModal />
      <UpdateLinkModal />
      <ConfirmDeleteModal />
      <QrCodeModal />
    </>
  );
};

export default UserDashboardPage;

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
