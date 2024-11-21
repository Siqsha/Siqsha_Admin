import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import ProfilePage from "../../components/ProfilePage";

function Profile() {
  return (
    <>
      <div className="flex bg-gray1">
        <AdminSidebar page="students" />
        <div className="w-full">
          <AdminNavbar page="Profile" />
          <ProfilePage />
        </div>
      </div>
    </>
  );
}

export default Profile;
