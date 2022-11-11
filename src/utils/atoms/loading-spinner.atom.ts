import { atom } from "jotai";

const loadingSpinnerBaseAtom = atom({ isLoading: false });

export const loadingSpinnerGetterAtom = atom((get) =>
  get(loadingSpinnerBaseAtom)
);

export const loadingSpinnerSetterAtom = atom(
  null,
  (_get, set, update: { isLoading: boolean }) => {
    set(loadingSpinnerBaseAtom, update);
  }
);
