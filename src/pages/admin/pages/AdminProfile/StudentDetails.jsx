import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import StudentsTable from "../../components/StudentsTable";

function StudentDetails() {
  return (
    <>
      <div className="!flex bg-gray1 justify-end">
        <AdminSidebar page="students" />
        <div className="w-[calc(100%-300px)]">
          <AdminNavbar page="Students" />
          <StudentsTable />
        </div>
      </div>
    </>
  );
}

export default StudentDetails;
