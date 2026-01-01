// src/pages/Admin/Residents/ResidentsPage.jsx
import { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import ResidentFormModal from "./ResidentFormModal";

export default function ResidentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const navigate = useNavigate();

  // Mock data – replace with real API later
  const [residents, setResidents] = useState([
    {
      id: 1,
      name: "Venerable Sokha",
      avatar: "https://via.placeholder.com/150?text=Sokha",
      role: "Resident Monk",
      kuti: "Kuti A",
      kutiNumber: "A-01",
      meter: "DDS1531-023",
      phone: "012 345 678",
      joined: "2023-05-15",
    },
    {
      id: 2,
      name: "Venerable Dara",
      avatar: "https://via.placeholder.com/150?text=Dara",
      role: "Resident Monk",
      kuti: "Kuti B",
      kutiNumber: "B-03",
      meter: "DDS1531-041",
      phone: "098 777 123",
      joined: "2024-01-10",
    },
    {
      id: 3,
      name: "Venerable Thavy",
      avatar: "https://via.placeholder.com/150?text=Thavy",
      role: "Resident Monk",
      kuti: "Kuti C",
      kutiNumber: "C-02",
      meter: "DDS1531-058",
      phone: "097 888 456",
      joined: "2022-11-20",
    },
  ]);

  const openCreate = () => {
    setSelectedResident(null);
    setIsModalOpen(true);
  };

  const openEdit = (resident) => {
    setSelectedResident(resident);
    setIsModalOpen(true);
  };

  const handleSuccess = (updated) => {
    if (selectedResident) {
      setResidents(residents.map((r) => (r.id === updated.id ? updated : r)));
    } else {
      const newId = Math.max(...residents.map((r) => r.id), 0) + 1;
      setResidents([...residents, { ...updated, id: newId }]);
    }
    setIsModalOpen(false);
    setSelectedResident(null);
  };

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Residents
            </h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              Manage monastery residents, Kuti assignments and meters
            </p>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus size={18} />
            Add Resident
          </button>
        </div>

        {/* List Container */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Resident List
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Click row to view full details
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 dark:bg-neutral-900/70 border-b border-gray-200 dark:border-neutral-800">
                <tr>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Resident
                  </th>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Kuti
                  </th>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Meter
                  </th>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Phone
                  </th>
                  <th className="py-5 px-6 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                {residents.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/residents/${r.id}`)}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-neutral-700"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {r.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {r.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm">
                      {r.kuti} ({r.kutiNumber})
                    </td>
                    <td className="py-5 px-6 text-sm font-mono">{r.meter}</td>
                    <td className="py-5 px-6 text-sm">{r.phone}</td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/residents/${r.id}`);
                          }}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(r);
                          }}
                          className="p-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Remove ${r.name}?`)) {
                              setResidents(
                                residents.filter((res) => res.id !== r.id)
                              );
                            }
                          }}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
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

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-neutral-800">
            {residents.map((r) => (
              <div
                key={r.id}
                className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                onClick={() => navigate(`/admin/residents/${r.id}`)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-neutral-700"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {r.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {r.role}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Kuti</p>
                    <p className="font-medium">
                      {r.kuti} ({r.kutiNumber})
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Meter</p>
                    <p className="font-mono">{r.meter}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm">
                  <p className="text-gray-400">Phone</p>
                  <p className="font-medium">{r.phone}</p>
                </div>

                <div className="mt-5 flex justify-end gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/residents/${r.id}`);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(r);
                    }}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Remove ${r.name}?`)) {
                        setResidents(
                          residents.filter((res) => res.id !== r.id)
                        );
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {residents.length === 0 && (
            <div className="py-16 text-center text-gray-500 dark:text-gray-400">
              No residents yet. Add one to begin.
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ResidentFormModal
            onClose={() => {
              setIsModalOpen(false);
              setSelectedResident(null);
            }}
            initialData={selectedResident}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </Layout>
  );
}
