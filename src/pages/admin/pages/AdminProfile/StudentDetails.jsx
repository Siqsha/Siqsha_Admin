import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import StudentsTable from "../../components/StudentsTable";

function StudentDetails() {
  return (
    <>
      <div className="!flex justify-end">
        <AdminSidebar page="students" />
        <div className="lg:w-[calc(100%-300px)] w-full">
          <AdminNavbar page="Students" />
          <StudentsTable />
        </div>
      </div>
    </>
  );
}

export default StudentDetails;
