import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import ApprovalPage from "../../components/AprrovalPage";

function ApprovalDetails() {
  return (
    <>
      <div className="flex bg-gray1">
        <AdminSidebar page="approval" />
        <div className="w-full">
          <AdminNavbar page="Approval" />
          <ApprovalPage />
        </div>
      </div>
    </>
  );
}

export default ApprovalDetails;