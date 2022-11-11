import { atom } from "jotai";

const updateLinkBaseAtom = atom<{
  isOpen: boolean;
  linkId?: string;
  defaultValues?: { slug: string; url: string; description: string };
}>({
  isOpen: false,
});

export const updateLinkGetterAtom = atom((get) => get(updateLinkBaseAtom));

export const updateLinkSetterAtom = atom(
  null,
  (
    _get,
    set,
    update: {
      isOpen: boolean;
      linkId?: string;
      defaultValues?: { slug: string; url: string; description: string };
    }
  ) => set(updateLinkBaseAtom, update)
);
