// src/pages/Admin/Managers/ManagerDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, Home } from "lucide-react";
import Layout from "../../../components/Layout";

export default function ManagerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock – in real app fetch by id
  const manager = {
    id: Number(id),
    name: "Mr. Chan Dara",
    avatar: "C",
    phone: "012 345 678",
    email: "chan.dara@monastery.org",
    assignedKuti: { name: "Kuti A", number: "A-01" },
    residentCount: 8,
    residents: [
      { id: 1, name: "Venerable Sokha" },
      { id: 2, name: "Venerable Dara" },
      // ... more
    ],
  };

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Back & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/managers")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Manager Details
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {manager.name}
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-5xl shadow-md flex-shrink-0">
                {manager.avatar}
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {manager.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manager ID: #{manager.id}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Phone className="text-orange-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="font-medium">{manager.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="text-orange-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="font-medium">{manager.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Home className="text-orange-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Assigned Kuti / Home
                      </p>
                      <p className="font-medium">
                        {manager.assignedKuti.name} (
                        {manager.assignedKuti.number})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="text-orange-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Residents Managed
                      </p>
                      <p className="font-bold text-xl text-orange-600 dark:text-orange-400">
                        {manager.residentCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats / Actions */}
          <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-8 space-y-6">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition">
              Edit Manager
            </button>
            <button className="w-full py-3 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition">
              Remove Manager
            </button>
          </div>
        </div>

        {/* Residents List */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Residents under {manager.name}
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {manager.residentCount} residents assigned
            </p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {manager.residents.map((resident) => (
              <div
                key={resident.id}
                className="px-8 py-5 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                    {resident.name.charAt(0)}
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {resident.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
