import { atom } from "jotai";

const filterBaseAtom = atom("");

export const filterGetterAtom = atom((get) => get(filterBaseAtom));

export const filterSetterAtom = atom(null, (_get, set, update: string) => {
  set(filterBaseAtom, update);
});
