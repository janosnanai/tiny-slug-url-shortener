import { useAtom } from "jotai";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react-dom";

import { SortByOptions } from "../../utils/atoms/sort-select.atom";
import {
  sortByGetterAtom,
  sortBySetterAtom,
} from "../../utils/atoms/sort-select.atom";

function SortSelect() {
  const [sortBy] = useAtom(sortByGetterAtom);
  const [, setSortBy] = useAtom(sortBySetterAtom);

  const { x, y, reference, floating, strategy } = useFloating({
    placement: "bottom",
    strategy: "absolute",
    whileElementsMounted: autoUpdate,
    middleware: [offset(7), flip(), shift()],
  });

  return (
    <Listbox value={sortBy} onChange={setSortBy}>
      {({ open }) => (
        <>
          <div className="flex items-center gap-2 text-sm">
            <span className="select-none uppercase text-violet-500">
              sort by:
            </span>
            <Listbox.Button
              ref={reference}
              className="group flex w-28 cursor-default items-center justify-between rounded-lg pl-1 transition-colors hover:bg-white/10"
            >
              <span className="font-semibold text-teal-400">{sortBy}</span>
              <ChevronUpDownIcon
                className={`h-5 w-5 ${
                  open
                    ? "text-teal-300"
                    : "text-zinc-400 group-hover:text-zinc-100"
                }`}
              />
            </Listbox.Button>
          </div>
          <Listbox.Options
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="z-10 flex w-24 flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-800 p-1 shadow-lg"
          >
            {Object.values(SortByOptions).map((option) => (
              <Listbox.Option key={"sort-option-" + option} value={option}>
                {({ active }) => (
                  <span
                    className={`inline-block w-full cursor-default rounded-md p-1 text-left text-sm font-semibold ${
                      active ? "bg-white/10 text-zinc-50" : "text-zinc-300"
                    }`}
                  >
                    {option}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
}

export default SortSelect;
