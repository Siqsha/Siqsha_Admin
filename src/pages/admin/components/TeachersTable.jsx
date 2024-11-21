import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/apis/userApi";
import { Link } from "react-router-dom";
import InactiveAccountModal from "./InactiveAccountModal";

function TeachersTable() {
  const [teacherData, setTeacherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 10; // Set the number of items per page

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUsers("teacher");
        setTeacherData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when status filter changes
  };

  // Handle action dropdown change
  const handleActionChange = (e, userIndex) => {
    const action = e.target.value;
    const updatedUsers = [...teacherData];

    if (action === "Activate User") {
      updatedUsers[userIndex].isOnline = true;
    } else if (action === "Inactivate User") {
      updatedUsers[userIndex].isOnline = false;
    } else if (action === "Delete User") {
      updatedUsers.splice(userIndex, 1);
    }

    setTeacherData(updatedUsers);
  };

  const handleModalOpen = (userId, status) => {
    setSelectedUserId({ userId, status });
    setIsOpen(!isOpen);
  };

  const handleModalClose = () => {
    setSelectedUserId(null);
    setIsOpen(false);
  };

  // Filter the users based on search, status, and date
  const filteredUsers = teacherData?.filter((user) => {
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

  // Calculate total pages and current users
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const currentUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 h-[calc(100%-300px)]">
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-1/6">
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
        <div className="w-1/6">
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
            {currentUsers?.map((user, index) => (
              <tr
                key={index}
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
                      user.isOnline ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.isOnline ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{user.createdAt}</td>
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
                    onChange={(e) => handleActionChange(e, index)}
                    style={{ WebkitAppearance: "none" }}
                  >
                    <option value="" selected>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          className={`mx-2 px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="mx-2 text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          className={`mx-2 px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
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
}

export default TeachersTable;
