import type { ChangeEvent, FormEvent } from "react";

import { useState } from "react";
import { useAtom } from "jotai";

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
      <input
        onChange={handleChange}
        value={searchInput}
        type="text"
        className="border bg-zinc-800 font-semibold text-zinc-50"
      />
    </form>
  );
}

export default SearchBar;
