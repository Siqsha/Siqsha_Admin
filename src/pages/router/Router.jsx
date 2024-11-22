import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../notFound/NotFound";
import Login from "../auth/login/Login";
import AdminDashboard from "../admin/pages/AdminProfile/AdminDashboard";
import UserSettings from "../admin/pages/AdminProfile/UserSettings";
import StudentDetails from "../admin/pages/AdminProfile/StudentDetails";
import Profile from "../admin/pages/AdminProfile/Profile";
import TeacherDetails from "../admin/pages/AdminProfile/TeacherDetails";
import ApprovalDetails from "../admin/pages/AdminProfile/ApprovalDetails";
import Categories from "../admin/pages/AdminProfile/Categories";

function Router() {
  return (
    <div>
      <Routes>
        {/* ================================ AUTHENTICATION ROUTES =================================== */}
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<NotFound />} />

        {/* ================================== ADMIN ROUTES ====================================== */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/admin/category"
          element={<ProtectedRoute element={<Categories />} />}
        />
        <Route
          path="/admin/user-settings"
          element={<ProtectedRoute element={<UserSettings />} />}
        />
        <Route
          path="/admin/students"
          element={<ProtectedRoute element={<StudentDetails />} />}
        />
        <Route
          path="/admin/profile/:id"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/admin/teachers"
          element={<ProtectedRoute element={<TeacherDetails />} />}
        />
        {/* <Route
          path="/admin/approval"
          element={<ProtectedRoute element={<ApprovalDetails />} />}
        /> */}
      </Routes>
    </div>
  );
}

export default Router;
