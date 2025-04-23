import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../components/common/CommonLayout";
import InvoiceTable from "../../../../components/users/InvoiceTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredTeacherInvoices,
  getInvoiceList,
} from "../../../services/apis/userApi";
import SelectDateDropdown from "../../../../components/common/SelectDateDropdown";
import SelectAmountDropdown from "../../../../components/common/SelectAmountDropdown";

function Invoice() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDates, setSelectedDates] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();

  // Unfiltered invoice data
  const {
    invoices: unfilteredInvoices,
    loading: unfilteredLoading,
    pagination: unfilteredPagination,
  } = useSelector((state) => state.invoices);

  // Filtered data from shared filter reducer
  const {
    invoicefilters = { invoices: [], pagination: {} },
    loading: filteredLoading,
  } = useSelector((state) => state.invoicefilters || {});

  const filteredInvoices = invoicefilters.invoices;
  const filteredPagination = invoicefilters.pagination;

  const isFiltering = Object.keys(filters).length > 0;
  // const tabKey = "teacher"; // Fixed since you're only targeting teacher invoices

  const invoices = isFiltering ? filteredInvoices : unfilteredInvoices;
  const loading = isFiltering ? filteredLoading : unfilteredLoading;
  const pagination = isFiltering ? filteredPagination : unfilteredPagination;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (isFiltering) {
      dispatch(getFilteredTeacherInvoices(filters, currentPage));
    } else {
      dispatch(getInvoiceList(true, currentPage));
    }
  }, [currentPage, filters]);

  const handleDateChange = ({ startDate, endDate }) => {
    const newFilters = {
      ...filters,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    setFilters(newFilters);
    setSelectedDates({ startDate, endDate });
    setCurrentPage(1);
  };

  const handleAmountChange = ({ minAmount, maxAmount }) => {
    const newFilters = {
      ...filters,
      minAmount,
      maxAmount,
    };
    setFilters(newFilters);
    setSelectedAmount({ minAmount, maxAmount });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedDates(null);
    setSelectedAmount(null);
    setCurrentPage(1);
    dispatch(getInvoiceList(true, 1));
  };

  return (
    <CommonLayout title={"Invoice"}>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4 mt-5">
        <SelectDateDropdown
          onDateChange={handleDateChange}
          selectedDates={selectedDates}
        />
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <SelectAmountDropdown
          onAmountChange={handleAmountChange}
          selectedAmount={selectedAmount}
        />
        <button
          onClick={clearFilters}
          className="bg-primary text-white py-2 px-4 rounded-xl"
        >
          Clear Filters
        </button>
      </div>

      <div className="bg-white">
        <InvoiceTable
          invoices={invoices}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </CommonLayout>
  );
}

export default Invoice;
