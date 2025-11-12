import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ErrorMessage } from "formik";

const SelectList = ({
  label,
  options = [],
  value,
  onChange,
  name,
  placeholder = "Select an option",
  error,
  isRequired,
  isReadOnly,
}) => {
  const isPlaceholder = !value;
  return (
    <div>
      <label className="w-full text-[16px] text-black whitespace-nowrap">
        {label}
        {isRequired && (
          <span className="text-red text-[18px] pl-1">*</span>
        )}{" "}
      </label>
      <Listbox
        value={
          options.length !== 0 &&
          options?.find((option) => option.value === value)
        }
        onChange={onChange}
        disabled={isReadOnly}
      >
        <div className="relative mt-1">
          <ListboxButton className="relative w-full rounded-md border border-[#abaaaa] bg-white py-[10px] pl-3 pr-10 text-left text-gray-900 shadow-sm sm:leading-6 text-[16px]">
            <span className="flex items-center">
              <span
                className={`ml-1 block truncate ${
                  isPlaceholder ? "text-gray-400" : ""
                }`}
              >
                {isPlaceholder
                  ? placeholder
                  : options.find((option) => option.value === value)?.name}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2 right-[10px]">
              <IoIosArrowDown />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options?.map((option) => (
              <ListboxOption
                key={option.id}
                value={option.value}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
              >
                {({ selected }) => (
                  <>
                    <div className="flex items-center capitalize">
                      <span
                        className={`ml-3 block truncate font-normal ${
                          selected ? "font-semibold" : ""
                        }`}
                      >
                        {option.name}
                      </span>
                    </div>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {error && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-red text-sm"
        />
      )}
    </div>
  );
};

export default SelectList;
