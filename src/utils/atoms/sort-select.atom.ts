import { atom } from "jotai";

export enum SortOrderOptions {
  ASC = "asc",
  DESC = "desc",
}

export enum SortByOptions {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

const sortOrderBaseAtom = atom(SortOrderOptions.ASC);

export const sortOrderGetterAtom = atom((get) => get(sortOrderBaseAtom));

export const sortOrderTogglerAtom = atom(null, (get, set) => {
  const current = get(sortOrderBaseAtom);
  if (current === SortOrderOptions.ASC)
    set(sortOrderBaseAtom, SortOrderOptions.DESC);
  if (current === SortOrderOptions.DESC)
    set(sortOrderBaseAtom, SortOrderOptions.ASC);
});

const sortByBaseAtom = atom(SortByOptions.UPDATED_AT);

export const sortByGetterAtom = atom((get) => get(sortByBaseAtom));

export const sortBySetterAtom = atom(
  null,
  (_get, set, update: SortByOptions) => {
    set(sortByBaseAtom, update);
  }
);

export const sortCompositeGetterAtom = atom((get) => ({
  [get(sortByBaseAtom)]: get(sortOrderBaseAtom),
}));
