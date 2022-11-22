import type { CreateLinkInput } from "../../schema/link.schema";

import { useAtom } from "jotai";

import FormModal from "../common/form-modal";
import {
  updateLinkGetterAtom,
  updateLinkSetterAtom,
} from "../../utils/atoms/update-link.atom";
import { trpc } from "../../utils/trpc";
import { toast } from "react-hot-toast";

function UpdateLinkModal() {
  const [modalState] = useAtom(updateLinkGetterAtom);
  const [, setModalState] = useAtom(updateLinkSetterAtom);
  const { isOpen, linkId, defaultValues } = modalState;

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.link.update.useMutation({
    onSuccess() {
      onClose();
      utils.link.getInfinite.invalidate();
    },
  });

  function onClose() {
    setModalState({ isOpen: false });
  }

  async function onSubmit(values: CreateLinkInput) {
    if (!linkId) return;
    const mutationPromise = mutateAsync({ id: linkId, update: values });
    toast.promise(mutationPromise, {
      loading: "Updating link...",
      success: "Link updated!",
      error: (err) => {
        return err.message || "unknown error";
      },
    });
    try {
      await mutationPromise;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <FormModal
      title="update link"
      {...{ isOpen, onClose, onSubmit, defaultValues }}
    />
  );
}

export default UpdateLinkModal;
