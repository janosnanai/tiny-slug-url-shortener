import type { CreateLinkInput } from "../../schema/link.schema";

import { useAtom } from "jotai";

import FormModal from "./form.modal";
import {
  createLinkGetterAtom,
  createLinkSetterAtom,
} from "../../utils/atoms/create-link.atom";
import { trpc } from "../../utils/trpc";
import { toast } from "react-hot-toast";

function CreateLinkModal() {
  const [modalState] = useAtom(createLinkGetterAtom);
  const [, setModalState] = useAtom(createLinkSetterAtom);
  const { isOpen } = modalState;

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.link.create.useMutation({
    onSuccess() {
      onClose();
      utils.link.getAll.invalidate();
    },
  });

  function onClose() {
    setModalState({ isOpen: false });
  }

  async function onSubmit(values: CreateLinkInput) {
    const mutationPromise = mutateAsync(values);
    toast.promise(mutationPromise, {
      loading: "Creating link...",
      success: "Link created!",
      error: (err) => {
        return err.toString();
      },
    });
    try {
      await mutationPromise;
    } catch (e) {
      console.log(e);
    }
  }

  return <FormModal title="create link" {...{ isOpen, onClose, onSubmit }} />;
}

export default CreateLinkModal;
