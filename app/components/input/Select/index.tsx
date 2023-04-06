import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import type { FC } from "react";
import { useMemo } from "react";
import { Fragment, useCallback, useState } from "react";

import styles from "~/styles/select.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Item = Record<string, string | number>;

type Props = Omit<
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
  "value"
> & {
  items: Item[];
  max?: number;
  label: string;
  value?: Item[];
};

const findItem = (items: Item[], value: string) =>
  items.find((item) => item.value === value);

const Select: FC<Props> = ({ max, label, items, name, value }) => {
  const [arrSelected, setArrSelected] = useState<Item[]>(
    value ? value : [items[0]]
  );

  const activeOptionClass = "listbox-option-active";

  const handleOnChange = useCallback(
    (selectedItem: string) => {
      if (max && max >= 2) {
        if (arrSelected.some((item) => item.value === selectedItem)) {
          const newArr = arrSelected.filter(
            (item) => item.value !== selectedItem
          );
          setArrSelected(newArr);
          return;
        }

        if (arrSelected.length === max) return;

        const itemFound = findItem(items, selectedItem)!;
        setArrSelected((prev) => [...prev, itemFound]);
      } else if (!max || max === 1) {
        const itemFound = findItem(items, selectedItem)!;
        return setArrSelected([itemFound]);
      }
    },
    [arrSelected, items, max]
  );

  const displayList = useMemo(() => {
    return arrSelected.map((item) => item.label).join(" / ");
  }, [arrSelected]);

  return (
    <div>
      <Listbox onChange={(value) => handleOnChange(value)}>
        {({ open }) => (
          <div className="listbox">
            <Listbox.Label className="listbox-label">{label}</Listbox.Label>
            <div className="listbox-wrapper">
              <Listbox.Button className="listbox-button">
                <span className="listbox-button-text">{displayList}</span>
                <ChevronUpDownIcon
                  className="listbox-icon"
                  aria-hidden="true"
                />
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {items.map((item) => {
                    let isSelected = arrSelected.some(
                      (select) => select.value === item.value
                    );
                    return (
                      <Listbox.Option
                        key={item.value}
                        className={`listbox-option ${
                          isSelected ? activeOptionClass : ""
                        }`}
                        value={item.value}
                      >
                        {({ selected }) => (
                          <span
                            className={`listbox-option-name ${
                              selected ? activeOptionClass : ""
                            }`}
                          >
                            {item.label}
                          </span>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
      {arrSelected
        .filter((elem) => elem.value)
        .map((element) => (
          <input
            key={element.value}
            type="hidden"
            name={name}
            value={element.value}
          />
        ))}
    </div>
  );
};

export default Select;
