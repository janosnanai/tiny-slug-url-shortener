import { Popover } from "@headlessui/react";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react-dom";

import LimitSelect from "./limit-select";
import SortSelect from "./sort-select";
import SortSwitch from "./sort-switch";

function SearchBarMenu() {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "bottom",
    strategy: "absolute",
    whileElementsMounted: autoUpdate,
    middleware: [offset(7), flip(), shift()],
  });

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            ref={reference}
            className="group rounded-full p-1 transition-colors hover:bg-white/10"
          >
            <Cog6ToothIcon
              className={`h-6 w-6 ${
                open
                  ? "text-teal-300"
                  : "text-zinc-400 group-hover:text-zinc-100"
              }`}
            />
          </Popover.Button>
          <Popover.Panel
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="z-10 flex w-52 flex-col items-start justify-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 p-2 shadow-lg sm:w-[27rem] sm:flex-row sm:items-center"
          >
            <SortSwitch />
            <div className="h-0.5 w-full rounded-full bg-white/30 sm:h-7 sm:w-0.5" />
            <SortSelect />
            <div className="h-0.5 w-full rounded-full bg-white/30 sm:h-7 sm:w-0.5" />
            <LimitSelect />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

export default SearchBarMenu;
