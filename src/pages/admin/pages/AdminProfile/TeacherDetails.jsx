import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import TeachersTable from "../../components/TeachersTable";

function TeacherDetails() {
  return (
    <>
      <div className="!flex justify-end">
        <AdminSidebar page="teachers" />
        <div className="lg:w-[calc(100%-300px)] w-full h-screen">
          <AdminNavbar page="Teachers" />
          <TeachersTable />
        </div>
      </div>
    </>
  );
}

export default TeacherDetails;
