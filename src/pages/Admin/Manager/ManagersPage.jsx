// src/pages/Admin/Managers/ManagersPage.jsx
import { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import ManagerFormModal from "./ManagerFormModal";

export default function ManagersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const navigate = useNavigate();

  // Mock data (replace with real data later)
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Mr. Chan Dara",
      avatar: "C",
      phone: "012 345 678",
      email: "chan.dara@monastery.org",
      kuti: { name: "Kuti A", number: "A-01" },
      residentCount: 8,
    },
    {
      id: 2,
      name: "Mr. Sok Piseth",
      avatar: "S",
      phone: "098 555 222",
      email: "piseth.sok@monastery.org",
      kuti: { name: "Kuti B", number: "B-03" },
      residentCount: 12,
    },
    {
      id: 3,
      name: "Mrs. Leakena Vong",
      avatar: "L",
      phone: "097 777 123",
      email: "leakena@monastery.org",
      kuti: { name: "Kuti C", number: "C-02" },
      residentCount: 9,
    },
  ]);

  const openCreateModal = () => {
    setSelectedManager(null);
    setIsModalOpen(true);
  };

  const openEditModal = (manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  const handleFormSuccess = (updatedManager) => {
    if (selectedManager) {
      // Update existing
      setManagers(
        managers.map((m) => (m.id === updatedManager.id ? updatedManager : m))
      );
    } else {
      // Add new (mock ID)
      const newId = Math.max(...managers.map((m) => m.id), 0) + 1;
      setManagers([...managers, { ...updatedManager, id: newId }]);
    }
    setIsModalOpen(false);
    setSelectedManager(null);
  };

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Managers
            </h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              Manage monastery managers and their assigned Kuti / Homes
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-sm transition-all duration-200"
          >
            <Plus size={18} />
            Add Manager
          </button>
        </div>

        {/* Container */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-neutral-800">
          <div className="px-6 md:px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Manager List
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Click a manager to view details
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-neutral-900/70 border-b border-gray-200 dark:border-neutral-800">
                <tr>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Manager
                  </th>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Contact
                  </th>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Assigned Kuti
                  </th>
                  <th className="py-5 px-6 text-center text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Residents
                  </th>
                  <th className="py-5 px-6 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                {managers.map((manager) => (
                  <tr
                    key={manager.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/managers/${manager.id}`)}
                  >
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                          {manager.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {manager.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ID: #{manager.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{manager.phone}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {manager.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="text-sm">
                        <span className="font-medium">{manager.kuti.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                          ({manager.kuti.number})
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 font-bold">
                        {manager.residentCount}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/managers/${manager.id}`);
                          }}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(manager);
                          }}
                          className="p-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Remove ${manager.name}?`)) {
                              setManagers(
                                managers.filter((m) => m.id !== manager.id)
                              );
                            }
                          }}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card/List View */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-neutral-800">
            {managers.map((manager) => (
              <div
                key={manager.id}
                className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
                onClick={() => navigate(`/admin/managers/${manager.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                      {manager.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {manager.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        ID: #{manager.id}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 font-bold text-lg">
                    {manager.residentCount}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="font-medium">{manager.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {manager.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-400">Assigned Kuti</p>
                  <p className="font-medium">
                    {manager.kuti.name}{" "}
                    <span className="text-gray-500">
                      ({manager.kuti.number})
                    </span>
                  </p>
                </div>

                {/* Actions on mobile */}
                <div className="mt-5 flex justify-end gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/managers/${manager.id}`);
                    }}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(manager);
                    }}
                    className="p-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Remove ${manager.name}?`)) {
                        setManagers(
                          managers.filter((m) => m.id !== manager.id)
                        );
                      }
                    }}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {managers.length === 0 && (
            <div className="py-16 text-center text-gray-500 dark:text-gray-400">
              No managers found. Add one to get started.
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ManagerFormModal
            onClose={() => {
              setIsModalOpen(false);
              setSelectedManager(null);
            }}
            initialData={selectedManager}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </Layout>
  );
}
