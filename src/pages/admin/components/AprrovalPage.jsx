import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ApprovalPage() {
  const [selectedTab, setSelectedTab] = useState("open");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const tabs = [
    { name: "Open Request", value: "open" },
    { name: "Completed Request", value: "completed" },
  ];

  const openRequests = [
    {
      username: "Revanth",
      role: "Teacher",
      email: "revacivil15@gmail.com",
      request: "Change plan",
      status: "Open",
    },
    {
      username: "Riyas",
      role: "Student",
      email: "riyas@gmail.com",
      request: "Reactivate account",
      status: "Open",
    },
    {
      username: "Gowtham",
      role: "Teacher",
      email: "gowtham@gmail.com",
      request: "Change payment to weekly",
      status: "Open",
    },
  ];

  const completedRequests = [
    {
      username: "Revanth",
      role: "Teacher",
      email: "revacivil15@gmail.com",
      request: "Change plan",
      status: "Completed",
    },
    {
      username: "Riyas",
      role: "Student",
      email: "riyas@gmail.com",
      request: "Reactivate account",
      status: "Completed",
    },
    {
      username: "Gowtham",
      role: "Teacher",
      email: "gowtham@gmail.com",
      request: "Change payment to weekly",
      status: "Completed",
    },
  ];

  const filterData = (data) => {
    return data.filter((item) => {
      const searchMatch =
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = selectedStatus
        ? item.status === selectedStatus
        : true;

      const dateMatch = selectedDate
        ? item.date && item.date.toDateString() === selectedDate.toDateString() // Ensure date exists
        : true;

      return searchMatch && statusMatch && dateMatch;
    });
  };

  return (
    <div className="p-4">
      {/* Tab Header */}
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`px-4 py-2 text-gray-600 border-b-2 ${
              selectedTab === tab.value
                ? "border-blue-500 text-blue-500"
                : "border-transparent"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mt-4 space-x-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          className="border rounded px-4 py-2 flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Status Dropdown */}
        <select
          className="border rounded px-4 py-2 w-1/4"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Date Picker */}
        <div className="w-1/4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border rounded px-4 py-2 w-full"
            placeholderText="Select Date"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {selectedTab === "open" && (
          <Table
            data={filterData(openRequests)}
            headers={["USERNAME", "ROLE", "MAIL ID", "REQUEST", "STATUS"]}
          />
        )}
        {selectedTab === "completed" && (
          <Table
            data={filterData(completedRequests)}
            headers={["USERNAME", "ROLE", "MAIL ID", "REQUEST", "STATUS"]}
          />
        )}
      </div>
    </div>
  );
}

function Table({ data, headers }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="text-left text-gray-500">
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 border-b border-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-4">
                No data found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="border-t">
                {Object.entries(item).map(([key, value], i) => (
                  <td
                    key={i}
                    className={`px-4 py-2 border-b border-gray-300 ${
                      key === "status"
                        ? value === "Open"
                          ? "text-yellow"
                          : "text-green-500"
                        : ""
                    }`}
                  >
                    {value instanceof Date ? value.toDateString() : value}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovalPage;
