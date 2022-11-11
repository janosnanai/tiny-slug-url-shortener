import { atom } from "jotai";

export interface QrCodeModalProps {
  isOpen: boolean;
  id?: string;
  shortURL?: string;
  originalURL?: string;
}

const qrCodeModalBaseAtom = atom<QrCodeModalProps>({ isOpen: false });

export const qrCodeModalGetterAtom = atom((get) => get(qrCodeModalBaseAtom));

export const qrCodeModalSetterAtom = atom(
  null,
  (_get, set, update: QrCodeModalProps) => {
    set(qrCodeModalBaseAtom, update);
  }
);
