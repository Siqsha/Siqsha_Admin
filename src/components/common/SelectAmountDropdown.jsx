import React, { useEffect, useState } from "react";
import { getCountry } from "../../pages/services/apis/userApi";

const SelectAmountDropdown = ({
  onAmountChange,
  selectedAmount,
  hideCurrency = false,
}) => {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleApply = () => {
    const payload = {
      minAmount: minAmount !== "" ? Number(minAmount) : null,
      maxAmount: maxAmount !== "" ? Number(maxAmount) : null,
    };
    if (!hideCurrency) {
      payload.symbolNative = selectedSymbol || null;
    }
    onAmountChange(payload);
  };

  useEffect(() => {
    if (selectedAmount === null) {
      setMinAmount("");
      setMaxAmount("");
      setCurrency("");
      setSelectedSymbol("");
      setSearch("");
    }
  }, [selectedAmount]);

  const fetchCountries = async () => {
    try {
      const res = await getCountry();
      const countries = res.countries || [];

      const mapByCode = new Map();
      const mapBySymbol = new Map();

      countries.forEach((c) => {
        const symbol = c?.symbolNative || c?.symbol || "";
        const code = c?.currency || c?.currencyCode || c?.currency_code || c?.code || "";
        const name = c?.currencyName || c?.currency_name || c?.name || "";

        if (code) {
          if (!mapByCode.has(code) && symbol) {
            mapByCode.set(code, { code, symbol, name });
          }
        } else if (symbol && !mapBySymbol.has(symbol)) {
          mapBySymbol.set(symbol, { code: "", symbol, name });
        }
      });

      const options = [
        ...Array.from(mapByCode.values()),
        ...Array.from(mapBySymbol.values()),
      ].sort((a, b) => (a.code || a.symbol).localeCompare(b.code || b.symbol));

      setCurrencyOptions(options);
    } catch (error) {
      console.error("Failed to fetch currency options", error);
    }
  };

  useEffect(() => {
    if (!hideCurrency) {
      fetchCountries();
    }
  }, [hideCurrency]);

  const handleSelect = (option) => {
    const label = option.code ? `${option.code} / ${option.symbol}` : option.symbol;
    setCurrency(label);
    setSelectedSymbol(option.symbol || "");
    setOpen(false);
    setSearch("");
  };

  const normalized = search.trim().toLowerCase();
  const filteredOptions = !normalized
    ? currencyOptions
    : currencyOptions.filter((o) => {
        const code = o.code || "";
        const name = o.name || "";
        const symbol = o.symbol || "";
        return (
          (code && code.toLowerCase().startsWith(normalized)) ||
          (name && name.toLowerCase().startsWith(normalized)) ||
          (symbol && symbol.toLowerCase().startsWith(normalized))
        );
      });

  return (
    <div className="flex flex-wrap items-center gap-4">
      {!hideCurrency && (
        <div className="relative w-[209px]">
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
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="p-2 border-b">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search currency"
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {filteredOptions.map((opt) => (
                  <li
                    key={(opt.code || "no-code") + opt.symbol}
                    onClick={() => handleSelect(opt)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {opt.code ? `${opt.code} / ${opt.symbol}` : opt.symbol}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

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
