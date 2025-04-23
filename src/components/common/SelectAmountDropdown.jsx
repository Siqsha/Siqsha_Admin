import React, { useEffect, useState } from "react";

const SelectAmountDropdown = ({ onAmountChange, selectedAmount }) => {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleApply = () => {
    onAmountChange({
      minAmount: minAmount !== "" ? Number(minAmount) : null,
      maxAmount: maxAmount !== "" ? Number(maxAmount) : null,
    });
  };

  useEffect(() => {
    if (selectedAmount === null) {
      setMinAmount("");
      setMaxAmount("");
    }
  }, [selectedAmount]);

  return (
    <div className="flex flex-wrap items-center gap-4">
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
