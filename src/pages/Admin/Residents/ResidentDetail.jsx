// src/pages/Admin/Residents/ResidentDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Home,
  Zap,
  Calendar,
  Mail,
  Edit,
  BarChart3,
} from "lucide-react";
import Layout from "../../../components/Layout";

export default function ResidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data – in real app: fetch from API using id
  const resident = {
    id: Number(id),
    name: "Venerable Sokha",
    avatar: "https://via.placeholder.com/300?text=Venerable+Sokha", // Replace with real URL
    role: "Resident Monk",
    kuti: "Kuti A",
    kutiNumber: "A-01",
    meter: "DDS1531-023",
    phone: "012 345 678",
    email: "sokha@monastery.org",
    joinedDate: "May 15, 2023",
    lastReading: "45.2 kWh (December 2025)",
    totalUsage: "1,230.5 kWh",
    status: "Active",
  };

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Back & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/residents")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft
                size={24}
                className="text-gray-700 dark:text-gray-300"
              />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Resident Details
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
                {resident.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              // Future: open ResidentFormModal with initialData = resident
              console.log("Edit resident:", resident);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl shadow-sm transition-all"
          >
            <Edit size={18} />
            Edit Profile
          </button>
        </div>

        {/* Profile & Form-like Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {resident.avatar ? (
                    <img
                      src={resident.avatar}
                      alt={resident.name}
                      className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover border-4 border-orange-500 shadow-xl"
                    />
                  ) : (
                    <div className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center border-4 border-orange-500 shadow-xl">
                      <User size={100} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Fields */}
                <div className="flex-1 w-full space-y-6">
                  <FormField label="Full Name" value={resident.name} />
                  <FormField label="Role / Position" value={resident.role} />
                  <FormField
                    label="Assigned Kuti"
                    value={`${resident.kuti} (${resident.kutiNumber})`}
                  />
                  <FormField label="Meter ID" value={resident.meter} accent />
                  <FormField label="Phone Number" value={resident.phone} />
                  <FormField label="Email Address" value={resident.email} />
                  <FormField label="Joined Date" value={resident.joinedDate} />
                  <FormField label="Status" value={resident.status} accent />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-8 space-y-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Meter Summary
            </h3>

            <div className="space-y-6">
              <StatItem
                label="Last Reading"
                value={resident.lastReading}
                accent
              />
              <StatItem
                label="Total Usage"
                value={resident.totalUsage}
                accent
              />
            </div>

            <div className="pt-4">
              <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition">
                View Full History
              </button>
            </div>
          </div>
        </div>

        {/* Usage History Section */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Meter Usage History
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Recent readings, costs, and trends
            </p>
          </div>

          <div className="p-8 text-center text-gray-500 dark:text-gray-400 min-h-[300px] flex items-center justify-center">
            <div className="space-y-4">
              <p>Usage chart and detailed table coming soon...</p>
              <p className="text-sm">
                Future: line chart with monthly kWh and cost
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* Reusable Form Field (read-only) */
function FormField({ label, value, accent = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
        {label}
      </label>
      <div
        className={`w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 font-medium text-base ${
          accent
            ? "text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* Reusable Stat Item */
function StatItem({ label, value, accent = false }) {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p
        className={`text-2xl font-bold ${
          accent
            ? "text-orange-600 dark:text-orange-400"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
