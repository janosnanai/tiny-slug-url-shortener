import type { ChangeEvent, FormEvent } from "react";

import { useState } from "react";
import { useAtom } from "jotai";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  filterGetterAtom,
  filterSetterAtom,
} from "../../utils/atoms/filter.atom";
import { useTimeout } from "../../utils/hooks/timeout.hook";

function SearchBar() {
  const [filter] = useAtom(filterGetterAtom);
  const [, setFilter] = useAtom(filterSetterAtom);
  const [searchInput, setSearchInput] = useState(filter);
  const { startTimeout } = useTimeout(() => setFilter(searchInput));

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    startTimeout();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFilter(searchInput);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-1">
        <label htmlFor="search-input">
          <MagnifyingGlassIcon className="h-6 w-6 text-violet-500" />
        </label>
        <input
          id="search-input"
          onChange={handleChange}
          value={searchInput}
          type="text"
          autoComplete="off"
          className="rounded-lg bg-zinc-900 px-2 py-1 font-semibold text-teal-400"
        />
      </div>
    </form>
  );
}

export default SearchBar;
