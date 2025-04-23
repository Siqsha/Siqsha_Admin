import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

const SelectDateDropdown = ({ onDateChange, selectedDates }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // const [dateRange, setDateRange] = useState({
  //   startDate: null,
  //   endDate: null,
  // });
  useEffect(() => {
    if (selectedDates === null) {
      setDateRange([null, null]); // Reset to no selection
    }
  }, [selectedDates]);

  const handleChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      onDateChange({
        startDate: update[0],
        endDate: update[1],
      });
    }
  };

  return (
    <div className="relative inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 cursor-pointer shadow-sm hover:shadow-md transition w-full max-w-[272px]">
      <CalendarDays className="text-gray-500" size={20} />
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        placeholderText="Select date range"
        isClearable
        className="outline-none bg-transparent cursor-pointer"
        calendarClassName="rounded-lg shadow-md"
        dateFormat="dd-MM-yyyy"
      />
    </div>
  );
};

export default SelectDateDropdown;
