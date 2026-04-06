import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import DoctorDashboard from "../components/Dashboard/DoctorDashboard";
import PatientDashboard from "../components/Dashboard/PatientDashboard";
import Profile from "../components/Dashboard/Profile";
import RoleRoute from "../components/RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={
        <RoleRoute requiredRole="ADMIN"><AdminDashboard /></RoleRoute>
      } />
      <Route path="/doctor/dashboard" element={
        <RoleRoute requiredRole="DOCTOR"><DoctorDashboard /></RoleRoute>
      } />
      <Route path="/patient/dashboard" element={
        <RoleRoute requiredRole="PATIENT"><PatientDashboard /></RoleRoute>
      } />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
}