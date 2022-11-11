import { atom } from "jotai";

const createLinkBaseAtom = atom({ isOpen: false });

export const createLinkGetterAtom = atom((get) => get(createLinkBaseAtom));

export const createLinkSetterAtom = atom(
  null,
  (_get, set, update: { isOpen: boolean }) => set(createLinkBaseAtom, update)
);
