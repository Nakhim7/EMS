import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Zap,
  BarChart3,
  Settings,
  FileText,
  X,
  ClipboardCheck, // Added for Attendance
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Sidebar({ open, setOpen }) {
  const { t } = useTranslation();

  const menus = [
    {
      key: "dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
      active:
        "bg-blue-500/15 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 shadow-sm",
    },
    {
      key: "managers",
      path: "/admin/managers",
      icon: UserCog,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
      active:
        "bg-indigo-500/15 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 shadow-sm",
    },
    {
      key: "residents",
      path: "/admin/residents",
      icon: Users,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
      active:
        "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 shadow-sm",
    },

    /* ✅ ATTENDANCE (FIXED) */
    {
      key: "attendance",
      path: "/admin/attendance",
      icon: ClipboardCheck,
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
      active:
        "bg-rose-500/15 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300 shadow-sm",
    },

    {
      key: "meters",
      path: "/admin/meters",
      icon: Zap,
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
      active:
        "bg-orange-500/15 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300 shadow-sm",
    },
    {
      key: "reports",
      path: "/admin/reports",
      icon: BarChart3,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
      active:
        "bg-purple-500/15 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 shadow-sm",
    },
    {
      key: "payments",
      path: "/admin/payments",
      icon: FileText,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
      active:
        "bg-green-500/15 text-green-700 dark:bg-green-900/60 dark:text-green-300 shadow-sm",
    },
    {
      key: "settings",
      path: "/admin/settings",
      icon: Settings,
      color: "bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-400",
      active:
        "bg-gray-500/15 text-gray-700 dark:bg-neutral-700/60 dark:text-gray-300 shadow-sm",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-80
          bg-white dark:bg-neutral-950
          border-r border-gray-100 dark:border-neutral-800
          flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand / Logo */}
        <div className="h-24 px-8 flex items-center gap-4 border-b border-gray-100 dark:border-neutral-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center font-bold shadow-md">
            ⚡
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t("app.title")}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("app.subtitle")}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          {menus.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end
              className={({ isActive }) =>
                `group flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? item.active
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900"
                }`
              }
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105
                  ${item.color}`}
              >
                <item.icon size={22} />
              </div>
              <span>{t(`menu.${item.key}`)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-8 py-5 text-xs text-gray-500 dark:text-gray-400 shrink-0 border-t border-gray-100 dark:border-neutral-800">
          © {new Date().getFullYear()} EMS • Cambodia
        </div>
      </aside>
    </>
  );
}
