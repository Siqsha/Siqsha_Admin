import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute, { isAuthenticated } from "./ProtectedRoute";
import NotFound from "../notFound/NotFound";
import Loader from "../../components/Loader";

const Login = lazy(() => import("../auth/login/Login"));
const StudentDetails = lazy(() =>
  import("../admin/pages/AdminProfile/StudentDetails")
);
const TeacherDetails = lazy(() =>
  import("../admin/pages/AdminProfile/TeacherDetails")
);
const Dashboard = lazy(() => import("../admin/pages/dashboard/Dashboard"));
const Users = lazy(() => import("../admin/pages/users/Users"));

function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ================================ AUTHENTICATION ROUTES =================================== */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/*" element={<NotFound />} />

        {/* ================================== ADMIN ROUTES ====================================== */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute element={<Users />} />}
        />
        <Route
          path="/admin/students"
          element={<ProtectedRoute element={<StudentDetails />} />}
        />
        <Route
          path="/admin/teachers"
          element={<ProtectedRoute element={<TeacherDetails />} />}
        />
      </Routes>
    </Suspense>
  );
}

export default Router;
