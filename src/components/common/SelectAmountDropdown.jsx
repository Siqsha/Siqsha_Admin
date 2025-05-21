import React, { useEffect, useState } from "react";
import { getCountry } from "../../pages/services/apis/userApi";

const SelectAmountDropdown = ({ onAmountChange, selectedAmount }) => {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const handleApply = () => {
    onAmountChange({
      minAmount: minAmount !== "" ? Number(minAmount) : null,
      maxAmount: maxAmount !== "" ? Number(maxAmount) : null,
      symbolNative: currency || null,
    });
  };

  useEffect(() => {
    if (selectedAmount === null) {
      setMinAmount("");
      setMaxAmount("");
      setCurrency("");
    }
  }, [selectedAmount]);

  const fetchCountries = async () => {
    try {
      const res = await getCountry();
      const countries = res.countries;

      // Get unique symbolNative values
      const uniqueSymbols = Array.from(
        new Set(countries.map((c) => c.symbolNative).filter(Boolean))
      );

      setCurrencyOptions(uniqueSymbols);
    } catch (error) {
      console.error("Failed to fetch currency options", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const [open, setOpen] = useState(false);

  const handleSelect = (symbol) => {
    setCurrency(symbol);
    setOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative  w-[209px]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center shadow-sm hover:shadow-md transition"
        >
          <span>{currency || "Select Currency"}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            {currencyOptions.map((symbol) => (
              <li
                key={symbol}
                onClick={() => handleSelect(symbol)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {symbol}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="number"
        placeholder="Min Amount"
        value={minAmount}
        onChange={(e) => setMinAmount(e.target.value)}
        className="relative inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 cursor-pointer shadow-sm hover:shadow-md transition focus:outline-none"
      />
      <input
        type="number"
        placeholder="Max Amount"
        value={maxAmount}
        onChange={(e) => setMaxAmount(e.target.value)}
        className="relative inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 cursor-pointer shadow-sm hover:shadow-md transition focus:outline-none"
      />

      <button
        onClick={handleApply}
        className="bg-primary text-white py-2 px-4 rounded-[6px]"
      >
        Apply
      </button>
    </div>
  );
};

export default SelectAmountDropdown;
