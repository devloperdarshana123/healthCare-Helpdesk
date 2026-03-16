"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import DoctorsPage from "../components/DoctorsPage";

export default function Doctors() {
  return (
    <ProtectedRoute>
      <DoctorsPage />
    </ProtectedRoute>
  );
}