import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react-dom";

import MenuItemButton from "../common/menu-item-button";
import MenuItemLink from "../common/menu-item-link";

function NavbarMenu() {
  const { data: sessionData } = useSession();
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
            className="group relative rounded-full p-1 transition-colors hover:bg-white/10"
          >
            <div
              className={`rounded-full outline outline-2 outline-offset-2 transition-colors ${
                open ? "outline-teal-300/50" : "outline-transparent"
              }`}
            >
              {sessionData && (
                <Image
                  src={sessionData?.user?.image || ""}
                  width={24}
                  height={24}
                  alt="user avatar"
                  className="rounded-full"
                />
              )}
              {!sessionData && <UserIcon className="h-6 w-6 text-zinc-200" />}
              <ChevronDownIcon
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full bg-zinc-900 transition-colors ${
                  open
                    ? "text-teal-300"
                    : "text-zinc-200 group-hover:text-zinc-50"
                }`}
              />
            </div>
          </Menu.Button>
          <Menu.Items
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="z-10 flex w-max flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-800 p-1 shadow-lg"
          >
            <p className="p-1 text-zinc-50">
              {sessionData?.user?.name || "not logged in"}
            </p>
            {sessionData && (
              <>
                <MenuItemLink href="/user-dashboard">
                  <div className="flex gap-2">
                    <TableCellsIcon className="h-5 w-5" />
                    <span>my links</span>
                  </div>
                </MenuItemLink>
                <div className="h-0.5 rounded-full bg-white/30" />
                <MenuItemButton onClick={signOut}>
                  <div className="flex gap-2">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>sign out</span>
                  </div>
                </MenuItemButton>
              </>
            )}
            {!sessionData && (
              <MenuItemButton onClick={signIn}>
                <div className="flex gap-2">
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  <span>sign in</span>
                </div>
              </MenuItemButton>
            )}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export default NavbarMenu;
