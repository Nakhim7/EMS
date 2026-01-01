// src/pages/Admin/Residents/ResidentFormModal.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Upload, UserCircle } from "lucide-react";

export default function ResidentFormModal({
  onClose,
  initialData = null,
  onSuccess,
}) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "Resident Monk",
    kuti: initialData?.kuti || "",
    kutiNumber: initialData?.kutiNumber || "",
    meter: initialData?.meter || "",
    phone: initialData?.phone || "",
    avatarPreview: initialData?.avatar || null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, avatarPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: initialData?.id || null,
      name: form.name.trim(),
      role: form.role.trim(),
      kuti: form.kuti.trim(),
      kutiNumber: form.kutiNumber.trim(),
      meter: form.meter.trim(),
      phone: form.phone.trim(),
      avatar: form.avatarPreview,
    };
    onSuccess(data);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md px-4 py-6">
        <motion.div
          className="relative bg-white dark:bg-neutral-950 rounded-3xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[95vh] border border-gray-200 dark:border-neutral-800"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.72, opacity: 0, y: 90 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.72, opacity: 0, y: 70 }}
          transition={{
            type: "spring",
            damping: 22,
            stiffness: 300,
            duration: 0.5,
          }}
        >
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEdit ? "Edit Resident" : "Add New Resident"}
              </h2>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {form.avatarPreview ? (
                  <img
                    src={form.avatarPreview}
                    alt="Preview"
                    className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center border-4 border-orange-500 shadow-md">
                    <UserCircle size={60} className="text-gray-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2.5 rounded-full shadow-lg hover:bg-orange-700"
                >
                  <Upload size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload photo (optional)
              </p>
            </div>

            {/* Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. Venerable Sokha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. Resident Monk"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Kuti Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="kuti"
                    value={form.kuti}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                    placeholder="e.g. Kuti A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="kutiNumber"
                    value={form.kutiNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                    placeholder="e.g. A-01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Meter ID
                </label>
                <input
                  name="meter"
                  value={form.meter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. DDS1531-023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. 012 345 678"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold shadow-md transition-all"
              >
                {isEdit ? "Save Changes" : "Create Resident"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
