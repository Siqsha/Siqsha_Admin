import React from "react";
import dayjs from "dayjs";
import UserImage from "../../assets/Images/UserImage.png";
import UserTableSkeleton from "../skeleton/UserTableSkeleton";
import { changeStatus } from "../../pages/services/apis/userApi";
import { useState } from "react";
import {  useConfirmationModal } from "../../contexts/ConfirmationModalContext";
import { useMessageModal } from "../../contexts/MessageModalContext";

function UsersTable({
  users,
  loading,
  pagination,
  onPageChange,
  updateUserLocally,
}) {
  const [updatingStatus, setUpdatingStatus] = useState({});
  const { showMessageModal } = useMessageModal();
    const { showConfirmationModal } = useConfirmationModal();
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    showConfirmationModal(
      `Are you sure you want to ${currentStatus === "active" ? "deactivate" : "activate"} this account?`,
      async () => {
        setUpdatingStatus((prev) => ({ ...prev, [userId]: true }));
  
        try {
          const newStatus = currentStatus === "active" ? "deactive" : "active";
          const response = await changeStatus(userId, { accountStatus: newStatus });
  
          if (response.success) {
           
            showMessageModal({
              success: true,
              message: `Account successfully ${newStatus === "active" ? "activated" : "deactivated"}.`,
            });
  
            
            updateUserLocally(userId, newStatus);
          } else {
            showMessageModal({
              success: false,
              message: "Failed to update the account status.",
            });
          }
        } catch (error) {
          console.error("Error updating status:", error);
          showMessageModal({
            success: false,
            message: "An error occurred while updating the account status.",
          });
        } finally {
          setUpdatingStatus((prev) => ({ ...prev, [userId]: false }));
        }
      }
    );
  };
  

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {loading && <UserTableSkeleton />}
      {!loading && (
        <div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        Availability
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        Account Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        Member Since
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-center">
                    {users?.map((user) => (
                      <tr key={user.email}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="size-11 shrink-0">
                              <img
                                alt="profile"
                                src={user.profileImageUrl || UserImage}
                                className="size-11 rounded-full"
                                onError={(e) => (e.target.src = UserImage)}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900 capitalize">
                                {user.firstName + " " + user.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{user.email}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {user.availability}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                          <button
                            onClick={() =>
                              handleToggleStatus(user._id, user.accountStatus)
                            }
                            disabled={updatingStatus[user._id]}
                            className={`px-4 py-2 text-sm font-medium rounded ${
                              user.accountStatus === "active"
                                ? "bg-green-500 text-white"
                                : "bg-red text-white"
                            } ${
                              updatingStatus[user._id] &&
                              "opacity-50 cursor-pointer"
                            }`}
                          >
                            {updatingStatus[user._id]
                              ? "Updating..."
                              : user.accountStatus === "active"
                              ? "Active"
                              : "Inactive"}
                          </button>
                          {/* {user.accountStatus === "active"
                            ? user.accountStatus
                            : user.accountStatus === "deactive"
                            ? "inactive"
                            : "" || "active"} */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                          {dayjs(user.createdAt).format("DD MMM YYYY")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-6 mt-6 pb-3">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                pagination.currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                pagination.currentPage === pagination.totalPages &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersTable;
