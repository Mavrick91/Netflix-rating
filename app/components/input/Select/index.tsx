import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import type { FC } from "react";
import {
  useEffect,
  useMemo,
  Fragment,
  useCallback,
  useState,
  useRef,
} from "react";

import styles from "~/styles/select.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export type Item = {
  value: string | number;
  label: string;
  isDefault?: boolean;
};

type Props = Omit<
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
  "value" | "onChange"
> & {
  items: Item[];
  max?: number;
  label: string;
  value?: Item[];
  onChange?: (value: Item[]) => void;
};

const findItem = (items: Item[], value: string | number) =>
  items.find((item) => item.value === value);

const Select: FC<Props> = ({ max, label, items, name, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevValue, setPrevValue] = useState<Item[]>();
  const [arrSelected, setArrSelected] = useState<Item[]>(
    value ? value : [items[0]]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Attach a mousedown event listener to detect clicks outside the dropdown
  // and close it.
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      prevValue?.[0].value === value?.[0].value &&
      prevValue?.length === value?.length
    )
      return;
    setArrSelected(value ? value : [items[0]]);
    setPrevValue(value);
  }, [items, prevValue, value]);

  const activeOptionClass = "listbox-option-active";

  const handleOnChange = useCallback(
    (selectedItem: string | number) => {
      let newArr: Item[] = [];

      if (max && max >= 2) {
        // if we click an item that is already selected, we remove it
        if (arrSelected.some((item) => item.value === selectedItem)) {
          newArr = arrSelected.filter((item) => item.value !== selectedItem);
          if (newArr.length === 0) newArr.push(items[0]);
        }
        // if we click an item that is not selected, we add it
        else {
          if (arrSelected.length === max) return;

          const itemFound = findItem(items, selectedItem)!;
          newArr = [...arrSelected, itemFound];

          // if the selected item is the default, we just remove everything else
          if (!selectedItem) newArr = [items[0]];
          // if the selected item is not the default, we remove the default
          else if (selectedItem && newArr.some((item) => !item.value))
            newArr = newArr.filter((item) => item.value);
        }
      }
      // if max is 1, we replace the selected item
      else if (!max || max === 1) {
        const itemFound = findItem(items, selectedItem)!;
        newArr = [itemFound];
      }

      if (!max || max === 1 || !selectedItem) {
        setIsOpen(false);
      }

      onChange && onChange(newArr);
      setArrSelected(newArr);
    },
    [arrSelected, items, max, onChange]
  );

  const displayList = useMemo(() => {
    return arrSelected.map((item) => item.label).join(" / ");
  }, [arrSelected]);

  return (
    <div>
      <Listbox onChange={(value) => handleOnChange(value)} ref={dropdownRef}>
        {() => (
          <div className="listbox">
            <Listbox.Label className="listbox-label">{label}</Listbox.Label>
            <div className="listbox-wrapper">
              <Listbox.Button
                className="listbox-button"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{displayList}</span>
                <ChevronUpDownIcon
                  className="listbox-icon"
                  aria-hidden="true"
                />
              </Listbox.Button>
              <Transition
                show={isOpen}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options" onClick={() => {}}>
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
                        onClick={() => {}}
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
