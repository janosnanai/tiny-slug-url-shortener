import type { NextPage } from "next";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";

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

const UserDashboardPage: NextPage = () => {
  const {
    data: queryData,
    isFetching,
    isLoading,
  } = trpc.link.getAll.useQuery();
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
        <ButtonPrimary onClick={handleCreateLinkOpen}>
          create new link
        </ButtonPrimary>
      </div>

      {!isLoading && queryData && (
        <ul className="space-y-3">
          {queryData.map((shortLink) => (
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
    </MainLayout>
  );
};

export default UserDashboardPage;
