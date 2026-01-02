import { useState } from "react";
import {
  Save,
  User,
  Bell,
  DollarSign,
  CreditCard,
  Mail,
  Phone,
  Shield,
  Moon,
  Sun,
  Globe,
  Lock,
  ArrowLeft,
} from "lucide-react";
import Layout from "../../components/Layout"; // assuming same Layout as PaymentsPage

export default function SettingsPage({
  role = "admin",
  currentUser = "Admin",
}) {
  const [formData, setFormData] = useState({
    // Billing / Tariff settings
    electricityRate: 0.35, // $/kWh
    taxRate: 10, // %
    currency: "USD",
    lateFeePerDay: 0.5, // $ per day overdue

    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    overdueReminderDays: [3, 7, 14],

    // Payment gateways
    paymentMethods: {
      cash: true,
      bankTransfer: true,
      wing: true, // popular in Cambodia
      aba: true,
      visaMaster: false,
    },

    // User profile
    fullName: currentUser,
    email: "admin@ems.kh",
    phone: "+855 12 345 678",
    twoFactorAuth: false,

    // Preferences
    theme: "light", // light / dark
    language: "en",
    dateFormat: "DD/MM/YYYY",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name.startsWith("paymentMethods.")) {
        const key = name.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          paymentMethods: { ...prev.paymentMethods, [key]: checked },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: save to backend / localStorage / context
    console.log("Settings saved:", formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Settings
              </h1>
              <p className="mt-1.5 text-gray-600 text-lg">
                Manage system, billing, notifications & account preferences
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 h-11 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium shadow-sm transition-all disabled:opacity-50"
            disabled={saved}
          >
            <Save size={16} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* 1. Billing Configuration */}
          <section className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="text-neutral-700" size={24} />
              <h2 className="text-2xl font-bold text-neutral-900">
                Billing & Tariff Settings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Electricity Rate (per kWh)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="electricityRate"
                    value={formData.electricityRate}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  VAT / Tax Rate (%)
                </label>
                <input
                  type="number"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                >
                  <option value="USD">USD ($)</option>
                  <option value="KHR">KHR (៛)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Late Fee per Day ($)
                </label>
                <input
                  type="number"
                  name="lateFeePerDay"
                  value={formData.lateFeePerDay}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                />
              </div>
            </div>
          </section>

          {/* 2. Notifications */}
          <section className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-neutral-700" size={24} />
              <h2 className="text-2xl font-bold text-neutral-900">
                Notification Settings
              </h2>
            </div>

            <div className="space-y-5">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <div>
                  <p className="font-medium text-neutral-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-neutral-500">
                    Send reminders for overdue payments, new invoices, etc.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={formData.smsNotifications}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <div>
                  <p className="font-medium text-neutral-900">
                    SMS Notifications
                  </p>
                  <p className="text-sm text-neutral-500">
                    Instant alerts via SMS (requires integration)
                  </p>
                </div>
              </label>

              {/* You can add more → reminder days checkboxes, etc. */}
            </div>
          </section>

          {/* 3. Payment Methods */}
          <section className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-neutral-700" size={24} />
              <h2 className="text-2xl font-bold text-neutral-900">
                Accepted Payment Methods
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(formData.paymentMethods).map(([key, enabled]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={`paymentMethods.${key}`}
                    checked={enabled}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span className="font-medium text-neutral-900 capitalize">
                    {key === "visaMaster"
                      ? "Visa / Mastercard"
                      : key.replace(/([A-Z])/g, " $1")}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* 4. Profile & Security */}
          <section className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-neutral-700" size={24} />
              <h2 className="text-2xl font-bold text-neutral-900">
                Profile & Security
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                />
              </div>

              <div className="flex items-center gap-3 pt-8">
                <Shield size={20} className="text-neutral-700" />
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={formData.twoFactorAuth}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span className="font-medium text-neutral-900">
                    Enable Two-Factor Authentication
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <button
                type="button"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
              >
                <Lock size={18} /> Change Password
              </button>
            </div>
          </section>

          {/* 5. General Preferences */}
          <section className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-neutral-700" size={24} />
              <h2 className="text-2xl font-bold text-neutral-900">
                General Preferences
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Theme
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, theme: "light" }))
                    }
                    className={`p-3 rounded-xl flex-1 flex items-center justify-center gap-2 border ${
                      formData.theme === "light"
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-200"
                    }`}
                  >
                    <Sun size={18} /> Light
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, theme: "dark" }))
                    }
                    className={`p-3 rounded-xl flex-1 flex items-center justify-center gap-2 border ${
                      formData.theme === "dark"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200"
                    }`}
                  >
                    <Moon size={18} /> Dark
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                >
                  <option value="en">English</option>
                  <option value="km">ខ្មែរ (Khmer)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  value={formData.dateFormat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Layout>
  );
}
