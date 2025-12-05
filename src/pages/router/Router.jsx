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
const Adminsetting = lazy(() => import("../admin/pages/setting/Adminsetting"));
const LegalTerms = lazy(() => import("../admin/pages/setting/LegalTerms"));
const Commission = lazy(() => import("../Commission/Commission"));
const TeacherList = lazy(() => import("../Teachers/teacherList"));
const Dashboard = lazy(() => import("../admin/pages/dashboard/Dashboard"));
const Users = lazy(() => import("../admin/pages/users/Users"));
const Financial = lazy(() => import("../admin/pages/financial/Financial"));
const Invoice = lazy(() => import("../admin/pages/invoices/Invoices"));
const ApprovalTrialPage = lazy(() =>
  import("../admin/pages/approval/ApprovalTrialPage")
);
const Review = lazy(() => import("../Review/Review"));
const AdManagement = lazy(() => import("../AdManagement/AdManagement"));
const EditAd = lazy(() => import("../AdManagement/EditAd"));
const Coupon = lazy(() => import("../Coupon/Coupon"));
const MyApproval = lazy(() => import("../MyApproval/MyApproval"));

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
          path="/admin/setting"
          element={<ProtectedRoute element={<Adminsetting />} />}
        />
        <Route
          path="/admin/legal/terms"
          element={<ProtectedRoute element={<LegalTerms />} />}
        />
        <Route
          path="/admin/review"
          element={<ProtectedRoute element={<Review />} />}
        />
        <Route
          path="/admin/admanagement"
          element={<ProtectedRoute element={<AdManagement />} />}
        />
        <Route
          path="/admin/edit-ad/:id"
          element={<ProtectedRoute element={<EditAd />} />}
        />
        <Route
          path="/admin/commission"
          element={<ProtectedRoute element={<Commission />} />}
        />
        <Route
          path="/admin/coupon"
          element={<ProtectedRoute element={<Coupon />} />}
        />
        <Route
          path="/admin/teacherlist"
          element={<ProtectedRoute element={<TeacherList />} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute element={<Users />} />}
        />
        <Route
          path="/admin/request"
          element={<ProtectedRoute element={<ApprovalTrialPage />} />}
        />
        <Route
          path="/admin/students"
          element={<ProtectedRoute element={<StudentDetails />} />}
        />
        <Route
          path="/admin/teachers"
          element={<ProtectedRoute element={<TeacherDetails />} />}
        />
        <Route
          path="/admin/myapproval"
          element={<ProtectedRoute element={<MyApproval />} />}
        />
        <Route
          path="/admin/financial"
          element={<ProtectedRoute element={<Financial />} />}
        />
        <Route
          path="/admin/invoice"
          element={<ProtectedRoute element={<Invoice />} />}
        />
      </Routes>
    </Suspense>
  );
}

export default Router;
