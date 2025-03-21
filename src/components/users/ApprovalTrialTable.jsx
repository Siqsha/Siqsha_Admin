import React from "react";
import UserImage from "../../assets/Images/UserImage.png";

const ApprovalTrialTable = ({ users, tab, onAction }) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300 bg-white">
        <thead>
          <tr>
            <th className="py-3 px-4 text-sm font-semibold text-center">
              Name
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-center">
              Email
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center">
          {users?.map((user) => (
            <tr key={user._id}>
              <td className="py-3 px-4 flex justify-center items-center gap-3">
                <img
                  src={user.profileImageUrl || UserImage}
                  onError={(e) => (e.target.src = UserImage)}
                  className="w-10 h-10 rounded-full"
                  alt="Profile"
                />
                <span className="capitalize font-medium">
                  {user.firstName + " " + user.lastName}
                </span>
              </td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">
                {tab === "Trial Teachers" && user.status !== "pending" ? (
                  <span
                    className={`px-3 py-1 rounded-md text-white text-sm ${
                      user.status === "approve" ? "bg-green-500" : "bg-red"
                    }`}
                  >
                    {user.status === "approve" ? "Approved" : "Rejected"}
                  </span>
                ) : (
                  <>
                    <button
                      className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md mx-1"
                      onClick={() => onAction(user._id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-3 py-1.5 text-sm bg-red hover:bg-red-700 text-white rounded-md mx-1"
                      onClick={() => onAction(user._id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {users?.length === 0 && (
            <tr>
              <td colSpan="3" className="py-5 text-gray-500">
                No Records Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalTrialTable;
