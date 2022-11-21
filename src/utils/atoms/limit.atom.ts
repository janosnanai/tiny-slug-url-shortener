import { atom } from "jotai";

const limitBaseAtom = atom(5);

export const limitGetterAtom = atom((get) => get(limitBaseAtom));

export const limitSetterAtom = atom(null, (_get, set, update: number) => {
  set(limitBaseAtom, update);
});
