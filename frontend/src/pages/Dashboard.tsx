import React from "react";
import { useAuth } from "../context/AuthContext.tsx";
import AdminDashboard from "../components/AdminDashboard.tsx";
import StudentDashboard from "../components/StudentDashboard.tsx";

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === "Admin" || user?.role === "SuperAdmin") {
    return <AdminDashboard />;
  }
  return <StudentDashboard />;
}
