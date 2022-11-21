import { useAtom } from "jotai";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import ButtonSecondary from "../ui/button-secondary";
import PageButton from "./pagination-page-button";

import {
  currentPageNumGetterAtom,
  currentPageNumSetterAtom,
} from "../../utils/atoms/current-page-num.atom";

function Pagination({ maxPageNum }: { maxPageNum?: number }) {
  const [currentPageNum] = useAtom(currentPageNumGetterAtom);
  const [, setCurrentPageNum] = useAtom(currentPageNumSetterAtom);

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      <ButtonSecondary
        onClick={() => setCurrentPageNum(currentPageNum - 1)}
        disabled={!(currentPageNum > 1)}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </ButtonSecondary>
      {(() => {
        const pageButtons = [];
        if (!maxPageNum) return;
        for (let i = 1; i <= maxPageNum; i++) {
          if (
            i === 1 ||
            (i >= currentPageNum - 1 && i <= currentPageNum + 1) ||
            (currentPageNum >= 1 && currentPageNum <= 4 && i >= 1 && i <= 5) ||
            (currentPageNum <= maxPageNum &&
              currentPageNum >= maxPageNum - 3 &&
              i <= maxPageNum &&
              i >= maxPageNum - 4) ||
            i === maxPageNum
          ) {
            pageButtons.push(
              <PageButton
                key={"pb" + i}
                onClick={setCurrentPageNum}
                value={i}
                active={currentPageNum === i}
              />
            );
          } else if (i === 2 || i === maxPageNum - 1) {
            pageButtons.push(
              <span key={"pb" + i} className="px-2 py-1 text-zinc-400">
                ...
              </span>
            );
          }
        }
        return pageButtons;
      })()}
      <ButtonSecondary
        onClick={() => setCurrentPageNum(currentPageNum + 1)}
        disabled={!(maxPageNum && currentPageNum < maxPageNum)}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </ButtonSecondary>
    </div>
  );
}

export default Pagination;
