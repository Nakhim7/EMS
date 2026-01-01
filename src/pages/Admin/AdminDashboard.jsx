import { useState } from "react";
import {
  Users,
  UserCog,
  Zap,
  BarChart3,
  TrendingUp,
  TrendingDown,
  X,
} from "lucide-react";
import Layout from "../../components/Layout";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [selected, setSelected] = useState(null);

  /* ================= ORGANIZATION DATA ================= */

  const organization = {
    leader: {
      name: "H.E. Samdech Techo",
      role: "Chief Administrator",
    },
    deputies: [
      { name: "Deputy Leader 1", role: "Deputy Administrator" },
      { name: "Deputy Leader 2", role: "Deputy Administrator" },
    ],
    managers: [
      {
        id: 1,
        name: "Mr. Chan Dara",
        role: "Energy Manager",
        residents: [
          { id: 1, name: "Venerable Sokha", role: "Resident Monk" },
          { id: 2, name: "Venerable Dara", role: "Resident Monk" },
        ],
      },
      {
        id: 2,
        name: "Mr. Sok Piseth",
        role: "Energy Manager",
        residents: [{ id: 3, name: "Venerable Thavy", role: "Resident Monk" }],
      },
      {
        id: 3,
        name: "Mr. Kim Vannak",
        role: "Energy Manager",
        residents: [
          { id: 4, name: "Venerable Sopheak", role: "Resident Monk" },
        ],
      },
      {
        id: 4,
        name: "Mr. Long Rithy",
        role: "Energy Manager",
        residents: [{ id: 5, name: "Venerable Chenda", role: "Resident Monk" }],
      },
      {
        id: 5,
        name: "Mr. Phan Makara",
        role: "Energy Manager",
        residents: [{ id: 6, name: "Venerable Visal", role: "Resident Monk" }],
      },
      {
        id: 6,
        name: "Mr. Sok Bunthoeun",
        role: "Energy Manager",
        residents: [{ id: 7, name: "Venerable Rith", role: "Resident Monk" }],
      },
    ],
  };

  /* ================= RECENT DATA (UNCHANGED) ================= */

  const residents = [
    {
      id: 101,
      name: "Venerable Sokha",
      role: "Resident Monk",
      meter: "DDS1531-023",
      last: "40.1 kWh",
      current: "45.2 kWh",
      cost: "27,572",
    },
    {
      id: 102,
      name: "Venerable Dara",
      role: "Resident Monk",
      meter: "DDS1531-041",
      last: "41.0 kWh",
      current: "38.9 kWh",
      cost: "23,729",
    },
    {
      id: 103,
      name: "Venerable Thavy",
      role: "Resident Monk",
      meter: "DDS1531-058",
      last: "36.8 kWh",
      current: "39.4 kWh",
      cost: "24,034",
    },
  ];

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
              Monastery Administration
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Energy consumption overview across all Kuti groups
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-orange-100/70 dark:bg-orange-950/40 text-orange-800 dark:text-orange-400 font-semibold">
            Electricity Rate: <span className="font-bold">610 Riels / kWh</span>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <StatCard title="Managers" value="6" icon={UserCog} trend="+1" />
          <StatCard title="Residents" value="248" icon={Users} trend="+14" />
          <StatCard
            title="Meters Installed"
            value="212"
            icon={Zap}
            trend="+5"
          />
          <StatCard
            title="Energy (Last 30 days)"
            value="1,530.2 kWh"
            icon={BarChart3}
            trend="-3.1%"
            negative
          />
        </div>

        {/* ================= ORGANIZATION STRUCTURE ================= */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm p-6 md:p-8 space-y-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Organizational Structure
          </h2>

          {/* Leader */}
          <div className="flex justify-center">
            <PersonCard
              person={organization.leader}
              type="leader"
              onClick={setSelected}
            />
          </div>

          {/* Deputies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {organization.deputies.map((d, i) => (
              <PersonCard
                key={i}
                person={d}
                type="deputy"
                onClick={setSelected}
              />
            ))}
          </div>

          {/* Managers & Residents */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {organization.managers.map((m) => (
              <div key={m.id} className="space-y-4">
                <PersonCard person={m} type="manager" onClick={setSelected} />

                <div className="space-y-2 pl-4 border-l border-gray-200 dark:border-neutral-800">
                  {m.residents.map((r) => (
                    <PersonCard
                      key={r.id}
                      person={r}
                      type="resident"
                      small
                      onClick={setSelected}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RECENT RESIDENTS (UNCHANGED) ================= */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Recent Resident Meter Usage
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Click a resident to view details
            </p>
          </div>

          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-neutral-900/70">
                <tr>
                  <Th>Resident</Th>
                  <Th>Meter</Th>
                  <Th align="right">Last Month</Th>
                  <Th align="right">This Month</Th>
                  <Th align="right">Cost (Riels)</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                {residents.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
                  >
                    <td className="py-6 px-8 font-medium">{r.name}</td>
                    <td className="py-6 px-8 font-mono text-gray-500">
                      {r.meter}
                    </td>
                    <td className="py-6 px-8 text-right">{r.last}</td>
                    <td className="py-6 px-8 text-right font-semibold text-orange-600">
                      {r.current}
                    </td>
                    <td className="py-6 px-8 text-right font-bold">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <PersonModal data={selected} onClose={() => setSelected(null)} />
      )}
    </Layout>
  );
}

/* ================= COMPONENTS ================= */
function PersonCard({ person, type, onClick, small }) {
  const colorMap = {
    leader: "bg-yellow-100 text-yellow-700",
    deputy: "bg-lime-100 text-lime-700",
    manager: "bg-emerald-100 text-emerald-700",
    resident: "bg-blue-100 text-blue-700",
  };

  return (
    <div
      onClick={() => onClick(person)}
      className={`
        cursor-pointer
        rounded-2xl
        bg-gray-50 dark:bg-neutral-900
        hover:shadow-md hover:-translate-y-1
        transition-all duration-200
        flex flex-col items-center text-center
        ${small ? "p-4" : "p-6"}
      `}
    >
      {/* Avatar */}
      <div
        className={`
          ${small ? "w-14 h-14 text-lg" : "w-20 h-20 text-2xl"}
          rounded-full
          flex items-center justify-center
          font-bold
          shadow-sm
          ${colorMap[type]}
        `}
      >
        {person.name.charAt(0)}
      </div>

      {/* Name */}
      <p className="mt-3 font-semibold text-gray-900 dark:text-white leading-tight">
        {person.name}
      </p>

      {/* Role */}
      <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {person.role}
      </p>
    </div>
  );
}
function StatCard({ title, value, icon: Icon, trend, negative }) {
  return (
    <div className="group relative bg-white dark:bg-neutral-950 rounded-[24px] p-6 border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            {title}
          </p>
          <p className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {value}
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
          <Icon size={22} strokeWidth={2.5} />
        </div>
      </div>
      {trend && (
        <div className="mt-6 flex items-center justify-between">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black ${
              negative
                ? "bg-red-50 text-red-600 dark:bg-red-500/10"
                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"
            }`}
          >
            {negative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}{" "}
            {trend}
          </div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
            Growth Rate
          </span>
        </div>
      )}
    </div>
  );
}
function Th({ children, align = "left" }) {
  return (
    <th
      className={`py-4 px-8 text-sm uppercase tracking-wide text-gray-500 text-${align}`}
    >
      {children}
    </th>
  );
}

function PersonModal({ data, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-neutral-950 rounded-2xl max-w-md w-full shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
        >
          <div className="px-6 pt-8 pb-6 text-center bg-gray-50 dark:bg-neutral-900">
            <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold mx-auto">
              {data.name.charAt(0)}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{data.name}</h3>
            <p className="text-sm text-gray-500">{data.role}</p>
          </div>

          <div className="px-6 py-5 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-orange-600 text-white"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
