import type { ShortLink } from "@prisma/client";

import { useAtom } from "jotai";

import ShortLinkMenu from "./short-link-menu";
import { qrCodeModalSetterAtom } from "../../utils/atoms/qr-code-modal.atom";
import { updateLinkSetterAtom } from "../../utils/atoms/update-link.atom";
import { deleteLinkSetterAtom } from "../../utils/atoms/delete-link.atom";
import { env } from "../../env/client.mjs";
import { toast } from "react-hot-toast";

function ShortLinkItem({ shortLink }: { shortLink: ShortLink }) {
  const shortLinkFull = `${
    process.env.NODE_ENV === "development" ? "http://" : "https://"
  }${env.NEXT_PUBLIC_VERCEL_URL}/s/${shortLink.slug}`;

  const [, setQrCodeModalState] = useAtom(qrCodeModalSetterAtom);
  const [, setUpdateModalState] = useAtom(updateLinkSetterAtom);
  const [, setDeleteModalState] = useAtom(deleteLinkSetterAtom);

  function handleCopy() {
    const clipboardPromise = navigator.clipboard.writeText(shortLinkFull);
    toast.promise(clipboardPromise, {
      loading: "Copying URL to clipboard...",
      success: "URL copied to clipboard!",
      error: (err) => {
        return err.toString();
      },
    });
  }

  function handleQrCode() {
    setQrCodeModalState({
      isOpen: true,
      id: shortLink.id,
      shortURL: shortLinkFull,
      originalURL: shortLink.url,
    });
  }

  function handleUpdate() {
    setUpdateModalState({
      isOpen: true,
      linkId: shortLink.id,
      defaultValues: {
        slug: shortLink.slug,
        url: shortLink.url,
        description: shortLink.description,
      },
    });
  }

  function handleDelete() {
    setDeleteModalState({ isOpen: true, linkId: shortLink.id });
  }

  return (
    <li className="container mx-auto rounded-lg bg-zinc-900 p-3">
      <div className="flex justify-between gap-3">
        <p className="grow text-xl font-semibold text-zinc-100">
          {shortLinkFull}
        </p>
        <ShortLinkMenu
          onCopy={handleCopy}
          onQrCode={handleQrCode}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
      <p className="text-zinc-400">{shortLink.url}</p>
      {shortLink.description && (
        <p className="text-zinc-400">{shortLink.description}</p>
      )}
      {!shortLink.description && (
        <p className="text-zinc-600">no description</p>
      )}
    </li>
  );
}

export default ShortLinkItem;
