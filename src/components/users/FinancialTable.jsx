import React from "react";
import dayjs from "dayjs";
import UserImage from "../../assets/Images/UserImage.png";
import InvoiceSkeleton from "../skeleton/invoiceSkeleton";

function FinancialTable({ subscriptions, loading, pagination, onPageChange }) {
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {loading ? (
        <InvoiceSkeleton />
      ) : (
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
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        StartDate
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        EndDate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-center">
                    {subscriptions?.map((sub, index) => (
                      <tr key={sub._id || index}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="size-11 shrink-0">
                              <img
                                alt="profile"
                                src={sub.userId?.profileImageUrl || UserImage}
                                className="size-11 rounded-full"
                                onError={(e) => (e.target.src = UserImage)}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900 capitalize">
                                {sub.userId?.firstName} {sub.userId?.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {sub.userId?.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">${sub.amount}</div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                          {dayjs(sub.startDate).format("DD MMM YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {dayjs(sub.endDate).format("DD MMM YYYY")}
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

export default FinancialTable;
