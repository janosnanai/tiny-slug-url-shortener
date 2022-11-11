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
        <Dialog.Panel className="w-full max-w-xl overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-lg">
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

          <p>You are going to permanently remove this shortlink.</p>
          <button onClick={onSubmit}>delete</button>
          <button onClick={onClose}>cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
