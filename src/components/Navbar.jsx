import { Menu, Bell, Sun, Moon, User, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar({ onMenu }) {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-24 px-6 lg:px-10 bg-white dark:bg-neutral-950 flex items-center justify-between shadow-sm sticky top-0 z-30">
      {/* LEFT */}
      <div className="flex items-center gap-4 lg:gap-6">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
          onClick={onMenu}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          {/* Profile circle (only circle, no name) */}
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm hover:ring-2 hover:ring-emerald-400 transition"
          >
            A
          </button>

          {/* Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-neutral-950 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 bg-gray-50 dark:bg-neutral-900">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  administrator
                </p>
              </div>

              {/* Actions */}
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                  <User size={16} />
                  View Profile
                </button>

                <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
