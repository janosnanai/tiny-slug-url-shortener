import Link from "next/link";
import { Menu } from "@headlessui/react";

interface MenuItemLinkProps {
  href: string;
  children?: React.ReactNode;
}

function MenuItemLink({ href, children }: MenuItemLinkProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={`rounded-md p-1 text-left text-sm uppercase ${
            active ? "bg-white/10 text-zinc-50" : "text-zinc-300"
          }`}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
}

export default MenuItemLink;
