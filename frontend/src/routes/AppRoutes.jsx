import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MentorDashboard from "../pages/mentor/MentorDashboard";
import MenteeDashboard from "../pages/mentee/MenteeDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import MentorProfilePage from "../pages/mentor/MentorProfilePage";
import MenteeProfilePage from "../pages/mentee/MenteeProfilePage";
import MentorListingPage from "../pages/mentee/MentorListingPage";
import MentorDetailsPage from "../pages/mentee/MentorDetailsPage";
import MyMenteeRequestsPage from "../pages/mentee/MyMenteeRequestsPage";
import MyMentorRequestsPage from "../pages/mentor/MyMentorRequestsPage";
import MyMenteeSessionsPage from "../pages/mentee/MyMenteeSessionsPage";
import MyMentorSessionsPage from "../pages/mentor/MyMentorSessionsPage";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/mentor-dashboard"
        element={
          <PrivateRoute allowedRoles={["mentor"]}>
            <MentorDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/mentee-dashboard"
        element={
          <PrivateRoute allowedRoles={["mentee"]}>
            <MenteeDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/mentor-profile"
        element={
          <PrivateRoute allowedRoles={["mentor"]}>
            <MentorProfilePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/mentee-profile"
        element={
          <PrivateRoute allowedRoles={["mentee"]}>
            <MenteeProfilePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/mentors"
        element={
          <PrivateRoute allowedRoles={["mentee"]}>
            <MentorListingPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/mentor-details/:id"
        element={
          <PrivateRoute allowedRoles={["mentee"]}>
            <MentorDetailsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/my-requests"
        element={
          <PrivateRoute allowedRoles={["mentee"]}>
            <MyMenteeRequestsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/mentor-requests"
        element={
          <PrivateRoute allowedRoles={["mentor"]}>
            <MyMentorRequestsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/my-sessions"
        element={
          <PrivateRoute allowedRoles={["mentee"]}>
            <MyMenteeSessionsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/mentor-sessions"
        element={
          <PrivateRoute allowedRoles={["mentor"]}>
            <MyMentorSessionsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;