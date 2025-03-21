import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import UserImage from "../../assets/Images/UserImage.png";
import {
  getCredibiltyTeachers,
  respondCredibility,
} from "../services/apis/userApi";
import MyApprovalSkeleton from "../../components/skeleton/MyApprovalSkeleton";
import { useMessageModal } from "../../contexts/MessageModalContext";

const MyApproval = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState({});
  const { showMessageModal } = useMessageModal();

  const fetchAllTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await getCredibiltyTeachers();
      setUsers(response?.teachers || []);
    } catch (error) {
      console.error("Error fetching credibility teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  const handleToggleAction = async (userId, action) => {
    setUpdatingStatus((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [action]: true,
      },
    }));
    const isCredible = action === "approve";
    // setUpdatingStatus((prev) => ({ ...prev, [userId]: true }));

    try {
      const response = await respondCredibility({
        teacherId: userId,
        action,
        isCredible,
      });
      showMessageModal(response);
      await fetchAllTeachers(); // Refresh list
    } catch (error) {
      console.error("Error responding to credibility request:", error);
    }
  };

  return (
    <CommonLayout title={"Requests"}>
      <div className="px-4 sm:px-6 lg:px-4">
        {isLoading ? (
          <MyApprovalSkeleton />
        ) : users.length === 0 ? (
          <>No Teachers Found</>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300 bg-white">
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
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-center">
                    {users?.map((user) => (
                      <tr key={user.email}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center justify-center">
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

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize flex gap-3 items-center justify-center">
                          <button
                            onClick={() =>
                              handleToggleAction(user._id, "approve")
                            }
                            disabled={updatingStatus[user._id]?.approve}
                            className={`px-4 py-2 rounded text-sm font-semibold ${
                              updatingStatus[user._id]?.approve
                                ? "bg-green-400 cursor-not-allowed opacity-60"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                          >
                            {updatingStatus[user._id]?.approve
                              ? "Approving..."
                              : "Approve"}
                          </button>

                          <button
                            onClick={() =>
                              handleToggleAction(user._id, "reject")
                            }
                            disabled={updatingStatus[user._id]?.reject}
                            className={`px-4 py-2 rounded text-sm font-semibold ${
                              updatingStatus[user._id]?.reject
                                ? "bg-red cursor-not-allowed opacity-60"
                                : "bg-red hover:bg-red-700"
                            } text-white`}
                          >
                            {updatingStatus[user._id]?.reject
                              ? "Rejecting..."
                              : "Reject"}
                          </button>
                          {/* <button
                            onClick={() =>
                              handleToggleAction(user._id, "approve")
                            }
                            disabled={updatingStatus[user._id]?.approve}
                            className={`px-4 py-2 rounded text-sm font-semibold ${
                              updatingStatus[user._id]?.approve
                                ? "bg-green-400 cursor-not-allowed opacity-60"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleToggleAction(user._id, "reject")
                            }
                            disabled={updatingStatus[user._id]?.reject}
                            className={`px-4 py-2 rounded text-sm font-semibold ${
                              updatingStatus[user._id]?.reject
                                ? "bg-red cursor-not-allowed opacity-60"
                                : "bg-red hover:bg-red-700"
                            } text-white`}
                          >
                            Reject
                          </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default MyApproval;
