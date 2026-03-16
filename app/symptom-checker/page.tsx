// import SymptomChecker from "../components/SymptomChecker";
// export default SymptomChecker;


"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import SymptomChecker from "../components/SymptomChecker";

export default function SymptomPage() {
  return (
    <ProtectedRoute>
      <SymptomChecker />
    </ProtectedRoute>
  );
}