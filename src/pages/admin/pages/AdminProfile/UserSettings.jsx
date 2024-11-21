import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";

function UserSettings() {
  return (
    <>
      <div className="flex bg-gray1">
        <AdminSidebar page="usersetting" />
        <div className="w-full">
          <AdminNavbar page="User Settings" />
          <div>User Settings</div>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
