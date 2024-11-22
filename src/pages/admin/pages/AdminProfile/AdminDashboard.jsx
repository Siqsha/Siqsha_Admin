import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {
  return (
    <>
      <div className="!flex justify-end">
        <AdminSidebar page="dashboard" />
        <div className="lg:!w-[calc(100%-300px)] w-full">
          <AdminNavbar page="Dashboard" />
          <div className="sm:pl-[30px] pl-[12px]">
            <div className="text-2xl py-3 font-medium text-nevyblue">
              Dashboard
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
