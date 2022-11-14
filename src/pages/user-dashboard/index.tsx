import type { NextPage } from "next";

import { useAtom } from "jotai";
import { useEffect } from "react";

import MainLayout from "../../components/layouts/main.layout";
import CreateLinkModal from "../../components/modals/create-link.modal";
import UpdateLinkModal from "../../components/modals/update-link.modal";
import ConfirmDeleteModal from "../../components/modals/confirm-delete.modal";
import QrCodeModal from "../../components/modals/qr-code.modal";
import ShortLinkItem from "../../components/short-links/short-link-item";
import { createLinkSetterAtom } from "../../utils/atoms/create-link.atom";
import { loadingSpinnerSetterAtom } from "../../utils/atoms/loading-spinner.atom";
import { trpc } from "../../utils/trpc";

const UserDashboardPage: NextPage = () => {
  const { data: queryData, isFetching } = trpc.link.getAll.useQuery();
  const [, setCreateLinkState] = useAtom(createLinkSetterAtom);
  const [, setSpinnerState] = useAtom(loadingSpinnerSetterAtom);

  function handleCreateLinkOpen() {
    setCreateLinkState({ isOpen: true });
  }

  useEffect(() => {
    setSpinnerState({ isLoading: isFetching });
    return () => {
      setSpinnerState({ isLoading: false });
    };
  }, [isFetching, setSpinnerState]);

  return (
    <MainLayout>
      <CreateLinkModal />
      <UpdateLinkModal />
      <ConfirmDeleteModal />
      <QrCodeModal />
      <div className="mx-auto my-3 w-max">
        <button
          onClick={handleCreateLinkOpen}
          className="rounded-lg border-2 border-pink-600 bg-pink-600 px-5 py-2 text-center text-lg font-semibold uppercase text-pink-100 transition duration-300 ease-out hover:bg-zinc-1000"
        >
          create new link
        </button>
      </div>
      {queryData && (
        <ul className="space-y-3">
          {queryData.map((shortLink) => (
            <ShortLinkItem key={shortLink.id} shortLink={shortLink} />
          ))}
        </ul>
      )}
    </MainLayout>
  );
};

export default UserDashboardPage;
