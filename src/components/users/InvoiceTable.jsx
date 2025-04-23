import React, { useState } from "react";
import dayjs from "dayjs";
import UserImage from "../../assets/Images/UserImage.png";
import UserTableSkeleton from "../skeleton/UserTableSkeleton";
import { handleCalculateCommission } from "../../pages/services/apis/userApi";

function InvoiceTable({ invoices, loading, pagination, onPageChange }) {
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  // const [openCommissionInput, setOpenCommissionInput] = useState(null);
  // const [commissionInputs, setCommissionInputs] = useState({}); // Store input values by invoiceId
  // const [commissionResult, setCommissionResult] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleInputChange = (invoiceId, value) => {
  //   setCommissionInputs((prev) => ({
  //     ...prev,
  //     [invoiceId]: value,
  //   }));
  // };

  // const handleCommission = async (invoiceId) => {
  //   const amount = commissionInputs[invoiceId];

  //   if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
  //     alert("Please enter a valid amount.");
  //     return;
  //   }

  //   const teacherId = invoices.find((inv) => inv._id === invoiceId)?.teacherId
  //     ?._id;
  //   if (!teacherId) {
  //     alert("Teacher ID not found for this invoice.");
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
  //     const response = await handleCalculateCommission({
  //       amount: parseFloat(amount),
  //       teacherId,
  //     });

  //     setCommissionResult((prev) => ({
  //       ...prev,
  //       [invoiceId]: response.data,
  //     }));
  //   } catch (err) {
  //     console.error("Commission error:", err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleToggleInput = (invoiceId) => {
  //   setOpenCommissionInput(
  //     openCommissionInput === invoiceId ? null : invoiceId
  //   );
  // };

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
                        Class Name
                      </th>
                      {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        Subsciption
                      </th> */}
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
                        Invoice Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-center">
                    
                    {invoices?.map((invoice, index) => (
                      <tr key={invoice._id || index}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="size-11 shrink-0">
                              <img
                                alt="profile"
                                src={
                                  invoice.teacherId?.profileImageUrl ||
                                  UserImage
                                }
                                className="size-11 rounded-full"
                                onError={(e) => (e.target.src = UserImage)}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900 capitalize">
                                {invoice.teacherId?.firstName}{" "}
                                {invoice.teacherId?.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                          <div className="text-gray-900">
                            {invoice.teacherId?.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 capitalize">
                          {invoice.className}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                          {invoice.teacherSubscription?.planType || "N/A"}
                        </td> */}
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                          <div className="text-gray-900">${invoice.amount}</div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 capitalize">
                          {dayjs(invoice.updatedAt).format("DD MMM YYYY")}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <button
                            className="text-blue-500 underline"
                            onClick={() => handleToggleInput(invoice._id)}
                          >
                            {openCommissionInput === invoice._id
                              ? "Cancel"
                              : "Add Commission"}
                          </button>

                          {openCommissionInput === invoice._id && (
                            <div className="mt-2">
                              <input
                                type="number"
                                className="px-2 py-1 border border-gray-300 rounded text-sm w-32 mb-2"
                                placeholder="Enter amount"
                                value={commissionInputs[invoice._id] || ""}
                                onChange={(e) =>
                                  handleInputChange(invoice._id, e.target.value)
                                }
                              />
                              <button
                                onClick={() => handleCommission(invoice._id)}
                                className="ml-2 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Calculating..." : "Submit"}
                              </button>

                              {commissionResult[invoice._id] && (
                                <div className="mt-2 text-sm text-left">
                                  <div>
                                    Plan:{" "}
                                    {commissionResult[invoice._id].teacherPlan}
                                  </div>
                                  <div>
                                    Admin Fee: $
                                    {commissionResult[invoice._id].adminFee}
                                  </div>
                                  <div>
                                    Teacher Receives: $
                                    {
                                      commissionResult[invoice._id]
                                        .teacherReceives
                                    }
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </td> */}
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

export default InvoiceTable;
