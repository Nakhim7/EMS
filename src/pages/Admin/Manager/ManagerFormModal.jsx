// src/pages/Admin/Managers/ManagerFormModal.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Upload, UserCircle } from "lucide-react";

export default function ManagerFormModal({
  onClose,
  initialData = null,
  onSuccess,
}) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    kutiName: initialData?.kuti?.name || "",
    kutiNumber: initialData?.kuti?.number || "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [profilePreview, setProfilePreview] = useState(
    initialData?.avatarUrl || null
  );
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEdit && form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const submittedData = {
      id: initialData?.id || null,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      kuti: {
        name: form.kutiName.trim(),
        number: form.kutiNumber.trim(),
      },
      avatarUrl: profilePreview,
      ...(!isEdit && { password: form.password }),
    };

    onSuccess?.(submittedData);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md px-4 py-6"
        // No onClick here → clicking outside does NOT close the modal
      >
        <motion.div
          className="
            relative bg-white dark:bg-neutral-950 
            rounded-3xl w-full max-w-lg 
            shadow-2xl overflow-y-auto max-h-[95vh] 
            border border-gray-200 dark:border-neutral-800
          "
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.72, opacity: 0, y: 90 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.72, opacity: 0, y: 70 }}
          transition={{
            type: "spring",
            damping: 22,
            stiffness: 300,
            mass: 0.9,
            duration: 0.5,
          }}
        >
          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="px-5 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-7"
          >
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="relative">
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-orange-500 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center border-4 border-orange-500 shadow-md">
                    <UserCircle size={60} className="text-gray-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 bg-orange-600 text-white p-2.5 rounded-full shadow-lg hover:bg-orange-700 transition"
                >
                  <Upload size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-2">
                Upload profile photo (optional)
              </p>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. Mr. Chan Dara"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. 012 345 678"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                placeholder="e.g. chan.dara@monastery.org"
              />
            </div>

            {/* Kuti Name & Number - side by side even on mobile */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Kuti / Home Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="kutiName"
                  value={form.kutiName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. Kuti A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="kutiNumber"
                  value={form.kutiNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
                  placeholder="e.g. A-01"
                />
              </div>
            </div>

            {/* Password fields – only in create mode */}
            {!isEdit && (
              <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all pr-12"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all pr-12"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium transition-all order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold shadow-md transition-all order-1 sm:order-2"
              >
                {isEdit ? "Save Changes" : "Create Manager"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
