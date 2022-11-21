import { useAtom } from "jotai";
import { Listbox } from "@headlessui/react";

import { SortByOptions } from "../../utils/atoms/sort-select.atom";
import {
  sortByGetterAtom,
  sortBySetterAtom,
} from "../../utils/atoms/sort-select.atom";

function SortSelect() {
  const [sortBy] = useAtom(sortByGetterAtom);
  const [, setSortBy] = useAtom(sortBySetterAtom);

  return (
    <Listbox value={sortBy} onChange={setSortBy}>
      <Listbox.Button className="text-zinc-100">{sortBy}</Listbox.Button>
      <Listbox.Options className="text-zinc-100">
        {Object.values(SortByOptions).map((option) => (
          <Listbox.Option key={"sort-option-" + option} value={option}>
            {option}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default SortSelect;
