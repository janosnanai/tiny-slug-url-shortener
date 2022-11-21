import { atom } from "jotai";

const currentPageNumBaseAtom = atom(1);

export const currentPageNumGetterAtom = atom((get) =>
  get(currentPageNumBaseAtom)
);

export const currentPageNumSetterAtom = atom(
  null,
  (_get, set, update: number) => {
    set(currentPageNumBaseAtom, update);
  }
);
