import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/apis/userApi";
import InactiveAccountModal from "./InactiveAccountModal";
import { Link } from "react-router-dom";

const StudentsTable = () => {
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [remarks, setRemarks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUsers("student");
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleActionChange = (e, userIndex) => {
    const action = e.target.value;
    const updatedUsers = [...studentData];

    if (action === "Activate User") {
      updatedUsers[userIndex].isOnline = true;
    } else if (action === "Inactivate User") {
      updatedUsers[userIndex].isOnline = false;
    } else if (action === "Delete User") {
      updatedUsers.splice(userIndex, 1);
    }

    setStudentData(updatedUsers);
  };

  const handleModalOpen = (userId, status) => {
    setSelectedUserId({ userId, status });
    setIsOpen(!isOpen);
  };

  const handleModalClose = () => {
    setSelectedUserId(null);
    setIsOpen(false);
  };

  const filteredUsers = studentData?.filter((user) => {
    const matchesSearch = user.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? statusFilter === "Active"
        ? user.isOnline
        : !user.isOnline
      : true;
    const matchesDate = dateFilter
      ? user.createdAt.startsWith(dateFilter)
      : true;
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="container mx-auto p-4 h-[calc(100%-300px)]">
      <div className="flex justify-between items-center mb-4 xl:gap-[200px] lg:gap-[150px] md:gap-[100px] gap-[10px] sm:flex-nowrap flex-wrap">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full">
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="w-full">
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">USERNAME</th>
              <th className="py-3 px-6 text-left">MAIL ID</th>
              <th className="py-3 px-6 text-left">ROLE</th>
              <th className="py-3 px-6 text-left">STATUS</th>
              <th className="py-3 px-6 text-left">MEMBER SINCE</th>
              <th className="py-3 px-6 text-left">REMARKS</th>
              <th className="py-3 px-6 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredUsers?.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <Link
                  to={`/admin/profile/${user._id}`}
                  className="py-3 px-6 text-left font-bold"
                >
                  {user.firstName}
                </Link>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.role}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`${
                      user.isOnline ? "text-green-500" : "text-red"
                    }`}
                  >
                    {user.isOnline === true ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td
                  className="py-3 px-6 text-left text-wrap cursor-pointer"
                  onClick={() => handleModalOpen(user._id, user.isOnline)}
                >
                  {remarks.find((remark) => remark.id === user._id)?.remark ||
                    "--"}
                </td>
                <td className="py-3 px-6 text-left cursor-pointer">
                  <select
                    className="bg-transparent"
                    onChange={(e) => handleActionChange(e, user._id)}
                    defaultValue=""
                    style={{ WebkitAppearance: "none" }}
                  >
                    <option value="" disabled>
                      ...
                    </option>
                    <option value="Activate User">Activate User</option>
                    <option value="Inactivate User">Inactivate User</option>
                    <option value="Delete User">Delete User</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <InactiveAccountModal
          open={isOpen}
          onClose={handleModalClose}
          userId={selectedUserId}
          setRemarks={setRemarks}
        />
      )}
    </div>
  );
};

export default StudentsTable;
