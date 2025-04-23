import React, { useState, useEffect } from "react";
import CommonLayout from "../../../../components/common/CommonLayout";
import TabGroupButton from "../../../../components/common/TabGroupButton";
import ApprovalTrialTable from "../../../../components/users/ApprovalTrialTable";
import {
  getCredibiltyTeachers,
  respondCredibility,
  pendingTrialRequest,
  updateTrial,
} from "../../../services/apis/userApi";
import TeacherTableSkeleton from "../../../../components/skeleton/TeacherTableSkeleton";

const TABS = ["Credibility Requests", "FreeTrial Requests"];

const ApprovalTrialPage = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "Credibility Requests") {
        const res = await getCredibiltyTeachers();
        setUsers(res?.teachers || []);
      } else if (activeTab === "FreeTrial Requests") {
        const res = await pendingTrialRequest();
        setUsers(Array.isArray(res.data) ? res.data : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleAction = async (userId, action) => {
    try {
      if (activeTab === "Credibility Requests") {
        await respondCredibility({
          teacherId: userId,
          action,
          isCredible: action === "approve",
        });
      } else {
        const res = await updateTrial({ teacherId: userId, action });
       
      }
      fetchData(); // Refresh after action
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  return (
    <CommonLayout title="Teachers">
      <div className="bg-white">
        <TabGroupButton
          tabTypes={TABS}
          active={activeTab}
          setActive={(tab) => setActiveTab(tab)}
        />
        {isLoading ? (
          <TeacherTableSkeleton />
        ) : (
          <ApprovalTrialTable
            users={users}
            tab={activeTab}
            onAction={handleAction}
          />
        )}
      </div>
    </CommonLayout>
  );
};

export default ApprovalTrialPage;
