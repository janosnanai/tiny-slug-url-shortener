import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";

import {
  deleteLinkGetterAtom,
  deleteLinkSetterAtom,
} from "../../utils/atoms/delete-link.atom";
import { trpc } from "../../utils/trpc";
import { toast } from "react-hot-toast";

function ConfirmDeleteModal() {
  const [modalState] = useAtom(deleteLinkGetterAtom);
  const [, setModalState] = useAtom(deleteLinkSetterAtom);
  const { isOpen, linkId } = modalState;

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.link.delete.useMutation({
    onSuccess() {
      onClose();
      utils.link.getAll.invalidate();
    },
  });

  function onClose() {
    setModalState({ isOpen: false });
  }

  function onSubmit() {
    if (!linkId) return;
    const mutationPromise = mutateAsync({ id: linkId });
    toast.promise(mutationPromise, {
      loading: "Deleting link...",
      success: "Link deleted!",
      error: (err) => {
        return err.toString();
      },
    });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} as="div" className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <Dialog.Panel className="w-full max-w-md overflow-y-auto rounded-lg bg-zinc-900 p-4 shadow-lg">
          <div className="mb-5 flex justify-between">
            <Dialog.Title className="text-2xl uppercase text-zinc-100">
              confirm delete
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-zinc-600 transition hover:text-zinc-300"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>
          <div className="mb-3 text-lg text-zinc-200">
            <p>You are going to permanently remove this shortlink.</p>
            <p>Please confirm:</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={onSubmit}
              className="w-full rounded-lg border-2 border-red-600 bg-black/25 px-5 py-2 text-center text-lg font-semibold uppercase text-red-200 transition duration-300 ease-out hover:bg-red-600 hover:text-red-50"
            >
              delete
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-lg border-2 border-pink-600 bg-pink-600 px-5 py-2 text-center text-lg font-semibold uppercase text-pink-200 transition duration-300 ease-out hover:bg-black/25 hover:text-pink-50"
            >
              cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
