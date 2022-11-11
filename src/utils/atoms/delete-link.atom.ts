import { atom } from "jotai";

const deleteLinkBaseAtom = atom<{ isOpen: boolean; linkId?: string }>({
  isOpen: false,
});

export const deleteLinkGetterAtom = atom((get) => get(deleteLinkBaseAtom));

export const deleteLinkSetterAtom = atom(
  null,
  (_get, set, update: { isOpen: boolean; linkId?: string }) =>
    set(deleteLinkBaseAtom, update)
);
