import SearchBarInput from "./search-bar-input";
import SearchBarMenu from "./search-bar-menu";

function SearchBar() {
  return (
    <div className="flex items-center gap-2">
      <SearchBarInput />
      <SearchBarMenu />
    </div>
  );
}

export default SearchBar;
