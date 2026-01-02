import { Menu, Bell, Sun, Moon, User, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function Navbar({ onMenu }) {
  const { t } = useTranslation();

  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [openProfile, setOpenProfile] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const profileRef = useRef(null);
  const langRef = useRef(null);

  /* ---------------- Theme ---------------- */
  /* ---------------- Theme ---------------- */
  useEffect(() => {
    // Instead of classList.toggle, we set the data-theme attribute
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* ---------------- Language ---------------- */
  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setLang(lng);
    setOpenLang(false);
  };

  /* ---------------- Outside click ---------------- */
  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setOpenProfile(false);
      if (langRef.current && !langRef.current.contains(e.target))
        setOpenLang(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 h-24 px-6 lg:px-10
      bg-white/80 dark:bg-neutral-950/80
      backdrop-blur-xl
      border-b border-gray-100 dark:border-neutral-800
      flex items-center justify-between"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <Menu size={22} />
        </button>

        <div className="hidden md:block">
          <h2 className="font-bold text-gray-900 dark:text-white tracking-tight">
            {t("app.title")}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("app.subtitle")}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* LANGUAGE */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setOpenLang(!openLang)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl
            hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <span className="text-lg">{lang === "en" ? "🇺🇸" : "🇰🇭"}</span>
            <span className="text-sm font-medium hidden sm:block">
              {lang === "en" ? t("nav.english") : t("nav.khmer")}
            </span>
            <ChevronDown size={14} />
          </button>

          {openLang && (
            <div
              className="absolute right-0 mt-3 w-44
              bg-white dark:bg-neutral-950
              rounded-xl shadow-xl
              ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
            >
              <button
                onClick={() => changeLang("en")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm
                hover:bg-gray-100 dark:hover:bg-neutral-800 transition
                ${
                  lang === "en"
                    ? "font-semibold bg-gray-50 dark:bg-neutral-900"
                    : ""
                }`}
              >
                🇺🇸 {t("nav.english")}
              </button>

              <button
                onClick={() => changeLang("km")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm
                hover:bg-gray-100 dark:hover:bg-neutral-800 transition
                ${
                  lang === "km"
                    ? "font-semibold bg-gray-50 dark:bg-neutral-900"
                    : ""
                }`}
              >
                🇰🇭 {t("nav.khmer")}
              </button>
            </div>
          )}
        </div>

        {/* THEME */}
        <button
          onClick={() => setDark(!dark)}
          className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* NOTIFICATION */}
        <button className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full
            hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <div className="relative">
              <div
                className="w-11 h-11 rounded-full
                bg-gradient-to-br from-emerald-500 to-emerald-700
                text-white font-bold flex items-center justify-center
                shadow ring-2 ring-white dark:ring-neutral-900"
              >
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-neutral-900" />
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Admin
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("user.role")}
              </p>
            </div>

            <ChevronDown size={16} />
          </button>

          {openProfile && (
            <div
              className="absolute right-0 mt-3 w-64
              bg-white dark:bg-neutral-950
              rounded-2xl shadow-xl
              ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
            >
              {/* HEADER */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-neutral-900">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  administrator@ems.com
                </p>
              </div>

              {/* ACTIONS */}
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                  <User size={16} />
                  {t("nav.profile")}
                </button>
                <button className="w-full flex items-center gap-3 px-6 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition">
                  <LogOut size={16} />
                  {t("nav.logout")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
