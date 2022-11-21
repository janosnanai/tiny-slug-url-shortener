import { useAtom } from "jotai";
import { Listbox } from "@headlessui/react";

import { limitGetterAtom, limitSetterAtom } from "../../utils/atoms/limit.atom";

function LimitSelect() {
  const [limit] = useAtom(limitGetterAtom);
  const [, setLimit] = useAtom(limitSetterAtom);

  const limitOptions = [5, 10, 15, 20];

  return (
    <Listbox value={limit} onChange={setLimit}>
      <Listbox.Button className="text-zinc-100">{limit}</Listbox.Button>
      <Listbox.Options className="text-zinc-100">
        {limitOptions.map((option) => (
          <Listbox.Option key={"limit-option-" + option} value={option}>
            {option}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default LimitSelect;
