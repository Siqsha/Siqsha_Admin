import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import TeachersTable from "../../components/TeachersTable";

function TeacherDetails() {
  return (
    <>
      <div className="!flex bg-gray1 justify-end">
        <AdminSidebar page="teachers" />
        <div className="w-[calc(100%-300px)] h-screen">
          <AdminNavbar page="Teachers" />
          <TeachersTable />
        </div>
      </div>
    </>
  );
}

export default TeacherDetails;
