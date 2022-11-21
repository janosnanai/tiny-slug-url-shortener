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
      className="text-zinc-100"
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
