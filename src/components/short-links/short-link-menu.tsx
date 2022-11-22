import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import {
  ClipboardDocumentIcon,
  PencilSquareIcon,
  QrCodeIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react-dom";

import MenuItemButton from "../common/menu-item-button";

interface ShortLinkMenuProps {
  onCopy: () => void;
  onQrCode: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

function ShortLinkMenu({
  onCopy,
  onQrCode,
  onUpdate,
  onDelete,
}: ShortLinkMenuProps) {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "bottom",
    strategy: "absolute",
    whileElementsMounted: autoUpdate,
    middleware: [offset(7), flip(), shift()],
  });

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={reference}
            className="group rounded-full p-1 transition-colors hover:bg-white/10"
          >
            <EllipsisVerticalIcon
              className={`h-6 w-6 ${
                open
                  ? "text-teal-300"
                  : "text-zinc-400 group-hover:text-zinc-100"
              }`}
            />
          </Menu.Button>
          <Menu.Items
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="z-10 flex w-32 flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-800 p-1 shadow-lg"
          >
            <MenuItemButton onClick={onCopy}>
              <div className="flex gap-2">
                <ClipboardDocumentIcon className="h-5 w-5" />
                <span>copy url</span>
              </div>
            </MenuItemButton>
            <MenuItemButton onClick={onQrCode}>
              <div className="flex gap-2">
                <QrCodeIcon className="h-5 w-5" />
                <span>QR code</span>
              </div>
            </MenuItemButton>
            <MenuItemButton onClick={onUpdate}>
              <div className="flex gap-2">
                <PencilSquareIcon className="h-5 w-5" />
                <span>update</span>
              </div>
            </MenuItemButton>
            <div className="h-0.5 rounded-full bg-white/30" />
            <MenuItemButton onClick={onDelete}>
              <div className="flex gap-2">
                <TrashIcon className="h-5 w-5" />
                <span>delete</span>
              </div>
            </MenuItemButton>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export default ShortLinkMenu;
