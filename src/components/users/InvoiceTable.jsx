import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import UserImage from "../../assets/Images/UserImage.png";
import {
  getFilteredTeacherInvoices,
  getInvoiceList,
  handleCalculateCommission,
} from "../../pages/services/apis/userApi";
import { useMessageModal } from "../../contexts/MessageModalContext";
import InvoiceSkeleton from "../skeleton/invoiceSkeleton";
import { useDispatch } from "react-redux";

function InvoiceTable({
  invoices,
  loading,
  filters,
  pagination,
  onPageChange,
}) {
  const [commissionAdded, setCommissionAdded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { showMessageModal } = useMessageModal();

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleCommission = async (teacherId, amount, invoiceId) => {
    try {
      const response = await handleCalculateCommission({
        teacherId,
        amount,
        invoiceId,
      });
      if (response.success) {
        setCommissionAdded((prev) => ({
          ...prev,
          [invoiceId]: true,
        }));
        showMessageModal(response);
      }

      if (Object.keys(filters).length > 0) {
        dispatch(getFilteredTeacherInvoices(filters, currentPage));
      } else {
        dispatch(getInvoiceList(true, currentPage));
      }

      // dispatch(getInvoiceList(true, currentPage));
    } catch (error) {
      console.error("Failed to fetch commission:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {loading && <InvoiceSkeleton />}
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
                        Commission
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-center">
                    {invoices && invoices.length > 0 ? (
                      invoices?.map((invoice, index) => (
                        <tr key={invoice._id || index}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                              <div className="size-11 shrink-0">
                                <img
                                  alt="profile"
                                  src={invoice?.profileImageUrl || UserImage}
                                  className="size-11 rounded-full"
                                  onError={(e) => (e.target.src = UserImage)}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900 capitalize">
                                  {invoice.firstName} {invoice.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                            <div className="text-gray-900">{invoice.email}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 capitalize">
                            {invoice.className}
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                            <div className="text-gray-900">
                              {invoice?.symbolNative} {invoice.amount}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 capitalize">
                            {dayjs(invoice.invoiceDate).format("DD MMM YYYY")}
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                            {invoice.isAdded || commissionAdded[invoice._id] ? (
                              <button
                                disabled
                                className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white cursor-not-allowed opacity-[0.8]"
                              >
                                Commission Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleCommission(
                                    invoice.teacherId,
                                    invoice.amount,
                                    invoice._id
                                  )
                                }
                                className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white "
                              >
                                Add Commission
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-10 text-gray-700 text-center text-lg"
                        >
                          No data found.
                        </td>
                      </tr>
                    )}
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
