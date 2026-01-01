// src/pages/Admin/Meters/MeterFormModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function MeterFormModal({
  onClose,
  initialData = null,
  onSuccess,
}) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    meterId: initialData?.meterId || "",
    resident: initialData?.resident || "",
    kuti: initialData?.kuti || "",
    status: initialData?.status || "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(form);
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md px-4">
        <motion.div
          className="bg-white dark:bg-neutral-950 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
          initial={{ scale: 0.75, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.75, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
        >
          <div className="px-8 py-6 border-b border-gray-100 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEdit ? "Edit Meter" : "Add New Meter"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meter ID <span className="text-red-500">*</span>
              </label>
              <input
                name="meterId"
                value={form.meterId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 outline-none transition"
                placeholder="e.g. DDS1531-023"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assigned Resident
              </label>
              <input
                name="resident"
                value={form.resident}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 outline-none transition"
                placeholder="e.g. Venerable Sokha"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kuti Name
                </label>
                <input
                  name="kuti"
                  value={form.kuti}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 outline-none transition"
                  placeholder="e.g. Kuti A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 outline-none transition"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Faulty">Faulty</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium transition"
              >
                {isEdit ? "Update Meter" : "Add Meter"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
