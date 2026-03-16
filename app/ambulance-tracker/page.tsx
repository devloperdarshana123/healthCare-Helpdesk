"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import AmbulanceTracker from "../components/AmbulanceTracker";

export default function AmbulancePage() {
  return (
    <ProtectedRoute>
      <AmbulanceTracker />
    </ProtectedRoute>
  );
}