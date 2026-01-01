import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Zap,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    active: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  {
    name: "Managers",
    path: "/admin/managers",
    icon: UserCog,
    color:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
    active: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  },
  {
    name: "Residents",
    path: "/admin/residents",
    icon: Users,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  {
    name: "Meters",
    path: "/admin/meters",
    icon: Zap,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
    active: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  },
  {
    name: "Usage Reports",
    path: "/admin/usage",
    icon: BarChart3,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    active: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
    color: "bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-400",
    active: "bg-gray-500/10 text-gray-700 dark:text-gray-300",
  },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen w-80
          bg-white dark:bg-neutral-950
          flex flex-col
          border-r border-gray-100 dark:border-neutral-800
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand / Logo */}
        <div className="h-24 px-8 flex items-center gap-4 shrink-0 border-b border-gray-100 dark:border-neutral-800">
          <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xl font-bold shadow-sm">
            ⚡
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              EMS Admin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Energy Management System
            </p>
          </div>
          <button
            className="ml-auto lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-1.5 pt-4">
          {menus.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={true} // ← This ensures exact match (very important!)
              className={({ isActive }) =>
                `
                flex items-center gap-5 px-6 py-4 rounded-2xl
                text-[15px] font-semibold transition-all duration-200
                ${
                  isActive
                    ? item.active
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-900"
                }
              `
              }
            >
              {/* Icon with color background */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
              >
                <item.icon size={22} />
              </div>
              <span>{item.name}</span>
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
