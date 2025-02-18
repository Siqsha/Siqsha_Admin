import React, { useEffect, useState } from "react";
import CommonLayout from "../../../../components/common/CommonLayout";
import TabGroupButton from "../../../../components/common/TabGroupButton";
import { UserTab } from "../../../../constant/dataConstant";
import UsersTable from "../../../../components/users/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../services/apis/userApi";
import { updateUserStatus } from "../../../../redux/actionCreator/actionCreator";

function Users() {
  const [activeTab, setActiveTab] = useState(UserTab[0]);
  const [prevActiveTab, setPrevActiveTab] = useState(activeTab);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { users, loading, pagination } = useSelector((state) => state.users);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const updateUserLocally = (userId, newStatus) => {
    dispatch(updateUserStatus(userId, newStatus));
  };

  useEffect(() => {
    const tabName = activeTab.slice(0, -1).toLowerCase();
    const forceRefresh = activeTab !== prevActiveTab || currentPage;
    dispatch(getAllUsers(tabName, forceRefresh, currentPage));
    setPrevActiveTab(activeTab);
  }, [activeTab, dispatch, prevActiveTab, currentPage]);

  return (  
    <CommonLayout title={"Users"}>
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
              <UsersTable
                users={users}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
                updateUserLocally={updateUserLocally}
              />
            </div>
          )}

          {activeTab === "Students" && (
            <div>
              <UsersTable
                users={users}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
                updateUserLocally={updateUserLocally}
              />
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}

export default Users;
