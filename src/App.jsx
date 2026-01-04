import { Routes, Route, Navigate } from "react-router-dom";

/* Pages */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManagersPage from "./pages/Admin/Manager/ManagersPage";
import ManagerDetail from "./pages/Admin/Manager/ManagerDetail";
import ResidentsPage from "./pages/Admin/Residents/ResidentsPage";
import ResidentDetail from "./pages/Admin/Residents/ResidentDetail";
import MetersPage from "./pages/Admin/Meters/MetersPage";
import ReportsPage from "./pages/Admin/ReportsPage";
import PaymentsPage from "./pages/Admin/PaymentsPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import AttendancePage from "./pages/Admin/AttendancePage";

/* Placeholder pages (create later) */
const ManagerDashboard = () => (
  <div className="p-10 text-xl font-bold">Manager Dashboard</div>
);
const ResidentDashboard = () => (
  <div className="p-10 text-xl font-bold">Resident Dashboard</div>
);

export default function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* ================= Admin ================= */}
      <Route path="/admin" element={<AdminDashboard />} />
      {/* Reports & Invoices */}
      <Route path="/admin/reports" element={<ReportsPage />} />
      <Route path="/admin/payments" element={<PaymentsPage />} />
      <Route path="/admin/managers" element={<ManagersPage />} />
      <Route path="/admin/managers/:id" element={<ManagerDetail />} />

      {/* ================= Manager ================= */}
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/admin/attendance" element={<AttendancePage />} />
      {/* ================= Resident ================= */}
      <Route path="/admin/residents" element={<ResidentsPage />} />
      <Route path="/admin/residents/:id" element={<ResidentDetail />} />
      <Route path="/admin/meters" element={<MetersPage />} />

      <Route path="/admin/settings" element={<SettingsPage />} />

      {/* ================= 404 ================= */}
      <Route
        path="*"
        element={
          <div className="h-screen flex items-center justify-center text-gray-500">
            404 | Page Not Found
          </div>
        }
      />
    </Routes>
  );
}
