import React from "react";
import UserImage from "../../assets/Images/UserImage.png";
import {
  pendingTrialRequest,
  updateTrial,
} from "../../pages/services/apis/userApi";
import { useState } from "react";
import { useConfirmationModal } from "../../contexts/ConfirmationModalContext";
import { useMessageModal } from "../../contexts/MessageModalContext";
import { useEffect } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import TeacherTableSkeleton from "../../components/skeleton/TeacherTableSkeleton";

function TeacherList() {
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showMessageModal } = useMessageModal();
  const { showConfirmationModal } = useConfirmationModal();

  const fetchTeacherList = async () => {
    setLoading(true);
    try {
      const response = await pendingTrialRequest();
      if (Array.isArray(response.data)) {
        setTeachers(response.data);
      } else {
        console.error("Unexpected API response format:", response);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchTeacherList();
  }, []);

  const handleTrialUpdate = async (teacherId, action) => {
    try {
      const response = await updateTrial({ teacherId, action });

      if (response.success) {
        showMessageModal(response);
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher._id === teacherId ? { ...teacher, status: action } : teacher
          )
        );
      } else {
        showMessageModal(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [teacherId]: false }));
    }
  };

  return (
    <CommonLayout title={"Trial Period Teacher"}>
      <div className="px-4 sm:px-6 lg:px-8">
        {loading && <TeacherTableSkeleton />}
        {!loading && (
          <div className="bg-white">
            <div className="mt-8 flow-root">
              <div className="overflow-x-auto ">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="py-5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap">
                          Name
                        </th>
                        <th className="py-5 pl-4 pr-3  text-center text-sm font-semibold text-gray-900 whitespace-nowrap">
                          Email
                        </th>
                        <th className="py-5 pl-4 pr-3  text-center text-sm font-semibold text-gray-900 whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {teachers?.map((teacher) => (
                        <tr key={teacher.email}>
                          <td className="whitespace-nowrap  py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center justify-center">
                              <div className="size-11 shrink-0">
                                <img
                                  alt="profile"
                                  src={teacher.profileImageUrl || UserImage}
                                  className="size-11 rounded-full"
                                  onError={(e) => (e.target.src = UserImage)}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900 capitalize">
                                  {teacher.firstName + " " + teacher.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900">{teacher.email}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                            {teacher.status === "approve" ? (
                              <span className="px-3 py-1.5 text-white bg-green-500 rounded-md text-sm">
                                Approved
                              </span>
                            ) : teacher.status === "reject" ? (
                              <span className="px-3 py-1.5 text-white bg-red rounded-md text-sm">
                                Rejected
                              </span>
                            ) : (
                              <>
                                <button
                                  className="px-3 py-1.5 text-white bg-green-600 hover:bg-green-700 rounded-md text-sm mx-1"
                                  disabled={updatingStatus[teacher._id]}
                                  onClick={() =>
                                    showConfirmationModal(
                                      `Are you sure you want to approve the trial for ${teacher.firstName} ${teacher.lastName}?`,
                                      () =>
                                        handleTrialUpdate(
                                          teacher._id,
                                          "approve"
                                        )
                                    )
                                  }
                                >
                                  Approve
                                </button>

                                <button
                                  className="px-3 py-1.5 text-white bg-red hover:bg-red-700 rounded-md text-sm mx-1"
                                  disabled={updatingStatus[teacher._id]}
                                  onClick={() =>
                                    showConfirmationModal(
                                      `Are you sure you want to reject the trial for ${teacher.firstName} ${teacher.lastName}?`,
                                      () =>
                                        handleTrialUpdate(teacher._id, "reject")
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                      {teachers?.length === 0 && (
                        <tr>
                          <td
                            colSpan="3"
                            className="py-5 text-center text-gray-500 text-lg"
                          >
                            No pending trial requested Teachers Found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CommonLayout>
  );
}

export default TeacherList;
