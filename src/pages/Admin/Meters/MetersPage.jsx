// src/pages/Admin/Meters/MetersPage.jsx
import { useState } from "react";
import { Plus, Zap, DollarSign, BarChart3 } from "lucide-react";
import Layout from "../../../components/Layout";
import MeterFormModal from "./MeterFormModal";
import { motion, AnimatePresence } from "framer-motion"; // ← FIXED: Add these imports

export default function MetersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [pricePerKwh, setPricePerKwh] = useState(610);
  const [selectedResident, setSelectedResident] = useState(null); // for popup

  // Mock data
  const [meters, setMeters] = useState([
    {
      id: 1,
      meterId: "DDS1531-023",
      resident: "Venerable Sokha",
      kuti: "Kuti A",
      monthlyUsage: 45.2,
      yearlyUsage: 530.4,
      monthlyCost: 27622,
      status: "Active",
    },
    {
      id: 2,
      meterId: "DDS1531-041",
      resident: "Venerable Dara",
      kuti: "Kuti B",
      monthlyUsage: 38.9,
      yearlyUsage: 467.0,
      monthlyCost: 23729,
      status: "Active",
    },
    {
      id: 3,
      meterId: "DDS1531-058",
      resident: "Venerable Thavy",
      kuti: "Kuti C",
      monthlyUsage: 39.4,
      yearlyUsage: 472.8,
      monthlyCost: 24034,
      status: "Active",
    },
  ]);

  const openCreate = () => {
    setSelectedMeter(null);
    setIsModalOpen(true);
  };

  const openEdit = (meter) => {
    setSelectedMeter(meter);
    setIsModalOpen(true);
  };

  const handleSuccess = (updated) => {
    if (selectedMeter) {
      setMeters(meters.map((m) => (m.id === updated.id ? updated : m)));
    } else {
      const newId = Math.max(...meters.map((m) => m.id), 0) + 1;
      setMeters([...meters, { ...updated, id: newId }]);
    }
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Meters Management
            </h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              Monitor installed meters, usage, and pricing
            </p>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus size={18} />
            Add Meter
          </button>
        </div>

        {/* Price Setup */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <DollarSign size={22} className="text-orange-600" />
            Electricity Rate
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Price per kWh (Riels)
              </label>
              <input
                type="number"
                value={pricePerKwh}
                onChange={(e) => setPricePerKwh(Number(e.target.value))}
                className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              />
            </div>
            <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-all">
              Update Rate
            </button>
          </div>
        </div>

        {/* Summary Cards - with hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{
              scale: 1.03,
              y: -4,
              boxShadow: "0 10px 25px rgba(249, 115, 22, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40">
                <Zap
                  size={28}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Meters
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {meters.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -4,
              boxShadow: "0 10px 25px rgba(249, 115, 22, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40">
                <BarChart3
                  size={28}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Monthly Usage
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  123.5 kWh
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -4,
              boxShadow: "0 10px 25px rgba(249, 115, 22, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40">
                <BarChart3
                  size={28}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Yearly Usage
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  1,480 kWh
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -4,
              boxShadow: "0 10px 25px rgba(249, 115, 22, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40">
                <DollarSign
                  size={28}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Revenue
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {meters
                    .reduce((sum, m) => sum + m.monthlyCost, 0)
                    .toLocaleString()}{" "}
                  Riels
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Monthly Graph Placeholder */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <BarChart3 size={22} className="text-orange-600" />
            Monthly Usage Trend (Last 12 Months)
          </h2>
          <div className="h-80 bg-gray-50 dark:bg-neutral-900 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Line chart: Total kWh per month (implement Chart.js here)</p>
          </div>
        </div>

        {/* Meters List */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Installed Meters
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Click row/card to view resident details
            </p>
          </div>

          {/* Desktop Table - No Action Column */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 dark:bg-neutral-900/70 border-b border-gray-200 dark:border-neutral-800">
                <tr>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Meter ID
                  </th>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Resident
                  </th>
                  <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Kuti
                  </th>
                  <th className="py-5 px-6 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Monthly (kWh)
                  </th>
                  <th className="py-5 px-6 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Yearly (kWh)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                {meters.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-orange-50/40 dark:hover:bg-orange-950/20 transition-colors duration-150 cursor-pointer"
                    onClick={() =>
                      setSelectedResident({
                        name: m.resident,
                        meter: m.meterId,
                      })
                    }
                  >
                    <td className="py-6 px-6 font-mono text-sm">{m.meterId}</td>
                    <td className="py-6 px-6 font-medium">{m.resident}</td>
                    <td className="py-6 px-6">{m.kuti}</td>
                    <td className="py-6 px-6 text-right font-semibold text-orange-600">
                      {m.monthlyUsage}
                    </td>
                    <td className="py-6 px-6 text-right font-semibold">
                      {m.yearlyUsage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-neutral-800">
            {meters.map((m) => (
              <button
                key={m.id}
                onClick={() =>
                  setSelectedResident({ name: m.resident, meter: m.meterId })
                }
                className="w-full text-left px-6 py-5 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {m.resident}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Meter: {m.meterId}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Monthly</p>
                    <p className="font-semibold text-orange-600">
                      {m.monthlyUsage} kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Yearly</p>
                    <p className="font-semibold">{m.yearlyUsage} kWh</p>
                  </div>
                </div>

                <div className="mt-3 text-sm font-bold">
                  Cost: {m.monthlyCost.toLocaleString()} Riels
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal for Add/Edit Meter */}
        {isModalOpen && (
          <MeterFormModal
            onClose={() => setIsModalOpen(false)}
            initialData={selectedMeter}
            onSuccess={handleSuccess}
          />
        )}

        {/* Resident Detail Popup */}
        <AnimatePresence>
          {selectedResident && (
            <ResidentModal
              data={selectedResident}
              onClose={() => setSelectedResident(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

/* Resident Modal (same as dashboard) */
function ResidentModal({ data, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="relative bg-white dark:bg-neutral-950 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.72, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.72, opacity: 0, y: 40 }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 320,
          duration: 0.35,
        }}
      >
        <div className="relative px-6 pt-8 pb-6 bg-gray-50 dark:bg-neutral-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
              {data.name.charAt(0)}
            </div>

            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              {data.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Meter: {data.meter}
            </p>
          </div>
        </div>

        <div className="px-6 py-6 space-y-5 text-sm">
          <Detail label="Meter ID" value={data.meter} />
          {/* Add more resident details as needed */}
        </div>

        <div className="px-6 py-5 border-t border-gray-100 dark:border-neutral-800 text-right bg-gray-50 dark:bg-neutral-900">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-semibold text-gray-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}
