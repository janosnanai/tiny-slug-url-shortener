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

interface ShortLinkPopoverProps {
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
}: ShortLinkPopoverProps) {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "bottom",
    strategy: "absolute",
    whileElementsMounted: autoUpdate,
    middleware: [offset(7), flip(), shift()],
  });

  return (
    <Menu>
      <Menu.Button
        ref={reference}
        className="group rounded-full p-1 transition-colors hover:bg-white/10"
      >
        <EllipsisVerticalIcon className="h-6 w-6 text-zinc-400 group-hover:text-zinc-100" />
      </Menu.Button>
      <Menu.Items
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        className="z-10 flex w-36 flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-800 p-1 shadow-lg"
      >
        <MenuButton onClick={onCopy}>
          <div className="flex gap-2">
            <ClipboardDocumentIcon className="h-5 w-5" />
            <span>copy url</span>
          </div>
        </MenuButton>
        <MenuButton onClick={onQrCode}>
          <div className="flex gap-2">
            <QrCodeIcon className="h-5 w-5" />
            <span>QR code</span>
          </div>
        </MenuButton>
        <MenuButton onClick={onUpdate}>
          <div className="flex gap-2">
            <PencilSquareIcon className="h-5 w-5" />
            <span>update</span>
          </div>
        </MenuButton>
        <MenuButton onClick={onDelete}>
          <div className="flex gap-2">
            <TrashIcon className="h-5 w-5" />
            <span>delete</span>
          </div>
        </MenuButton>
      </Menu.Items>
    </Menu>
  );
}

export default ShortLinkMenu;

interface MenuButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

function MenuButton({ onClick, children }: MenuButtonProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`rounded-md p-1 text-left text-sm uppercase ${
            active ? "bg-white/10 text-zinc-50" : "text-zinc-300"
          }`}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}
