import { Menu } from "@headlessui/react";

interface MenuItemButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

function MenuItemButton({ onClick, children }: MenuItemButtonProps) {
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

export default MenuItemButton;
