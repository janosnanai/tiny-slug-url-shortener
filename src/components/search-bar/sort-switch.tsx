import { useAtom } from "jotai";
import { Switch } from "@headlessui/react";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";

import { SortOrderOptions } from "../../utils/atoms/sort-select.atom";
import {
  sortOrderGetterAtom,
  sortOrderTogglerAtom,
} from "../../utils/atoms/sort-select.atom";

function SortSwitch() {
  const [sortOrder] = useAtom(sortOrderGetterAtom);
  const [, toggleSortOrder] = useAtom(sortOrderTogglerAtom);

  return (
    <Switch
      checked={sortOrder === SortOrderOptions.ASC}
      onChange={toggleSortOrder}
      className="-mb-1 rounded-full p-1 text-teal-400 transition-colors hover:bg-white/10 sm:-mr-1"
    >
      {sortOrder === SortOrderOptions.ASC && (
        <BarsArrowUpIcon className="h-6 w-6" />
      )}
      {sortOrder === SortOrderOptions.DESC && (
        <BarsArrowDownIcon className="h-6 w-6" />
      )}
    </Switch>
  );
}

export default SortSwitch;
