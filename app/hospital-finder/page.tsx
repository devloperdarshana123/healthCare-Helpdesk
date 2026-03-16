// import HospitalFinder from "../components/HospitalFinder";
// export default HospitalFinder;

"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import HospitalFinder from "../components/HospitalFinder";

export default function HospitalPage() {
  return (
    <ProtectedRoute>
      <HospitalFinder />
    </ProtectedRoute>
  );
}