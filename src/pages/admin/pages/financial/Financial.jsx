import React, { useCallback, useEffect, useState } from "react";
import CommonLayout from "../../../../components/common/CommonLayout";
import TabGroupButton from "../../../../components/common/TabGroupButton";
import { UserTab } from "../../../../constant/dataConstant";
import FinancialTable from "../../../../components/users/FinancialTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredSubscriptions,
  getSubscriptionsByRole,
} from "../../../services/apis/userApi";
import SelectDateDropdown from "../../../../components/common/SelectDateDropdown";
import SelectAmountDropdown from "../../../../components/common/SelectAmountDropdown";

function Financial() {
  const [activeTab, setActiveTab] = useState(UserTab[0]);
  const [prevActiveTab, setPrevActiveTab] = useState(activeTab);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDates, setSelectedDates] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const {
    transactions,
    loading: unfilteredLoading,
    pagination: unfilteredPagination,
  } = useSelector((state) => state.transactions);
  const {
    filters: filteredData,
    loading: filteredLoading,
    pagination: filteredPagination,
  } = useSelector((state) => state.filters);

  const isFiltering = Object.keys(filters).length > 0;
  const subscriptions = isFiltering ? filteredData : transactions;
  const loading = isFiltering ? filteredLoading : unfilteredLoading;
  const pagination = isFiltering ? filteredPagination : unfilteredPagination;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const tabName = activeTab.slice(0, -1).toLowerCase();
    if (isFiltering) {
      dispatch(getFilteredSubscriptions(tabName, filters, currentPage));
    } else {
      dispatch(getSubscriptionsByRole(tabName, true, currentPage));
    }

    setPrevActiveTab(activeTab);
  }, [activeTab, currentPage]);

  const handleDateChange = ({ startDate, endDate }) => {
    const tabName = activeTab.slice(0, -1).toLowerCase();
    const dateFilters = {
      ...filters,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    setFilters(dateFilters);
    setSelectedDates({ startDate, endDate });
    setCurrentPage(1);
    dispatch(getFilteredSubscriptions(tabName, dateFilters, 1));
  };

  const handleAmountChange = ({ minAmount, maxAmount }) => {
    const tabName = activeTab.slice(0, -1).toLowerCase();
    const updatedFilters = {
      ...filters,
      minAmount,
      maxAmount,
    };
    setFilters(updatedFilters);
    setSelectedAmount({ minAmount, maxAmount });
    setCurrentPage(1);
    dispatch(getFilteredSubscriptions(tabName, updatedFilters, 1));
  };

  return (
    <CommonLayout title={"Financial"}>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4 mt-5">
        <SelectDateDropdown
          onDateChange={handleDateChange}
          selectedDates={selectedDates}
        />
      </div>
      <div className="flex justify-between  items-center mb-4 flex-wrap gap-4">
        <SelectAmountDropdown
          onAmountChange={handleAmountChange}
          selectedAmount={selectedAmount}
          hideCurrency={true}
        />
        <button
          onClick={() => {
            const tabName = activeTab.slice(0, -1).toLowerCase();
            setFilters({});
            setSelectedDates(null);
            setSelectedAmount(null);
            setCurrentPage(1);
            dispatch(getSubscriptionsByRole(tabName, true, 1));
          }}
          className="bg-primary text-white py-2 px-4 rounded-[6px]"
        >
          Clear Filters
        </button>
      </div>

      <div className="bg-white">
        <TabGroupButton
          tabTypes={UserTab}
          active={activeTab}
          setActive={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1);
          }}
        />
        <div>
          {activeTab === "Teachers" && (
            <div>
              <FinancialTable
                subscriptions={subscriptions}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {activeTab === "Students" && (
            <div>
              <FinancialTable
                subscriptions={subscriptions}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}

export default Financial;
