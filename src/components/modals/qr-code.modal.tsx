import { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";

import {
  qrCodeModalGetterAtom,
  qrCodeModalSetterAtom,
} from "../../utils/atoms/qr-code-modal.atom";

function QrCodeModal() {
  const [modalState] = useAtom(qrCodeModalGetterAtom);
  const [, setModalState] = useAtom(qrCodeModalSetterAtom);
  const { isOpen, shortURL, originalURL } = modalState;
  const canvasRef = useRef<HTMLDivElement>(null);

  function onClose() {
    setModalState({ isOpen: false });
  }

  // hacky downloadhandler
  function handleDownload() {
    const canvas = canvasRef.current?.children[0] as HTMLCanvasElement;
    const downloadURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `tiny-slug-qr-${modalState.id}`;
    downloadLink.href = downloadURL;
    downloadLink.click();
  }

  function handleCopy() {
    if (!shortURL) return;
    const clipboardPromise = navigator.clipboard.writeText(shortURL);
    toast.promise(clipboardPromise, {
      loading: "Copying URL to clipboard...",
      success: "URL copied to clipboard!",
      error: (err) => {
        return err.toString();
      },
    });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} as="div" className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <Dialog.Panel className="w-full max-w-xl overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-lg">
          <div className="mb-5 flex justify-between">
            <Dialog.Title className="text-2xl uppercase text-zinc-100">
              QR code
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-zinc-600 transition hover:text-zinc-300"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>
          {shortURL && originalURL ? (
            <div className="flex gap-5">
              <div>
                <div ref={canvasRef}>
                  <QRCodeCanvas
                    id="qr-code"
                    value={shortURL}
                    height={256}
                    width={256}
                    className="rounded-lg bg-white p-3"
                  />
                </div>
                <button
                  onClick={handleDownload}
                  className="mt-3 w-full rounded-lg border-2 border-violet-500 p-2 text-center text-sm font-semibold uppercase text-violet-500"
                >
                  <div className="flex justify-between">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    <span>download</span>
                  </div>
                </button>
              </div>
              <div className="flex grow flex-col gap-2">
                <div className="grow rounded-lg border border-zinc-700 bg-zinc-1000 p-2 pt-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">short url</span>
                    <button
                      onClick={handleCopy}
                      className="h-5 w-5 text-zinc-500 transition hover:text-zinc-200"
                    >
                      <ClipboardDocumentIcon />
                    </button>
                  </div>
                  <p className="break-all text-zinc-100">{shortURL}</p>
                </div>
                <div className="grow p-2 pt-1">
                  <span className="text-zinc-500">original url</span>
                  <p className="break-all text-zinc-100">{originalURL}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="m-auto text-zinc-100">missing data</p>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default QrCodeModal;
