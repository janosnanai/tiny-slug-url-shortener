import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { toast } from "react-hot-toast";

import ButtonPrimary from "../ui/button-primary";
import ButtonDanger from "../ui/button-danger";
import {
  deleteLinkGetterAtom,
  deleteLinkSetterAtom,
} from "../../utils/atoms/delete-link.atom";
import { trpc } from "../../utils/trpc";

function ConfirmDeleteModal() {
  const [modalState] = useAtom(deleteLinkGetterAtom);
  const [, setModalState] = useAtom(deleteLinkSetterAtom);
  const { isOpen, linkId } = modalState;
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        return err.message || "unknown error";
      },
    });
    setIsSubmitting(true);
    mutationPromise
      .catch((e) => {
        console.log(e);
      })
      .then(() => setIsSubmitting(false));
  }

  return (
    <Dialog open={isOpen} onClose={onClose} as="div" className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-2 backdrop-blur-sm mobile-lg:p-4">
        <Dialog.Panel className="w-full max-w-sm overflow-y-auto rounded-lg bg-zinc-900 p-3 shadow-lg mobile-lg:p-4">
          <div className="mb-5 flex justify-between">
            <Dialog.Title className="text-xl uppercase text-zinc-100 mobile-lg:text-2xl">
              confirm delete
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-zinc-600 transition hover:text-zinc-300"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>
          <div className="mb-3 text-base text-zinc-200 mobile-lg:text-lg">
            <p>You are going to permanently remove this shortlink.</p>
            <p>Please confirm:</p>
          </div>
          <div className="flex flex-col gap-2">
            <ButtonDanger onClick={onSubmit} disabled={isSubmitting}>
              delete
            </ButtonDanger>
            <ButtonPrimary onClick={onClose} disabled={isSubmitting}>
              cancel
            </ButtonPrimary>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
