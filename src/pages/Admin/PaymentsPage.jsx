import { useState, useRef } from "react";
import {
  Printer,
  Search,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Undo2,
  Calendar,
  FileText,
  X,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReactToPrint } from "react-to-print";
import Layout from "../../components/Layout";

/* ---------------- MOCK DATA (added usageKwh) ---------------- */
const initialPayments = [
  {
    id: "PAY-001",
    resident: "Sokha",
    invoiceId: "INV-001",
    month: "January 2026",
    amount: 45.2,
    usageKwh: 128,
    status: "Paid",
    date: "2026-01-05",
    method: "Bank",
    phone: "+855 12 345 678",
  },
  {
    id: "PAY-002",
    resident: "Vannak",
    invoiceId: "INV-002",
    month: "January 2026",
    amount: 62.8,
    usageKwh: 185,
    status: "Pending",
    date: null,
    method: null,
    phone: "+855 97 123 4567",
  },
  {
    id: "PAY-003",
    resident: "Srey",
    invoiceId: "INV-003",
    month: "January 2026",
    amount: 38.5,
    usageKwh: 102,
    status: "Overdue",
    date: null,
    method: null,
    phone: "+855 88 987 6543",
  },
  {
    id: "PAY-004",
    resident: "Sokha",
    invoiceId: "INV-004",
    month: "February 2026",
    amount: 50.0,
    usageKwh: 142,
    status: "Pending",
    date: null,
    method: null,
    phone: "+855 12 345 678",
  },
  {
    id: "PAY-005",
    resident: "Vannak",
    invoiceId: "INV-005",
    month: "February 2026",
    amount: 48.0,
    usageKwh: 136,
    status: "Pending",
    date: null,
    method: null,
    phone: "+855 97 123 4567",
  },
];

const months = ["All Months", "January 2026", "February 2026", "March 2026"];
const currentMonth = "February 2026";
const lastMonth = "January 2026";

export default function PaymentsPage({
  role = "admin",
  currentUser = "Sokha",
}) {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [page, setPage] = useState(1);
  const [selectedResident, setSelectedResident] = useState(null);

  const printRef = useRef(null);
  const itemsPerPage = 8;

  const getArrears = (residentName) => {
    return payments
      .filter(
        (p) =>
          p.resident === residentName &&
          p.month === lastMonth &&
          p.status !== "Paid"
      )
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const handleToggleStatus = (id) => {
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isPaid = p.status === "Paid";
          return {
            ...p,
            status: isPaid ? "Pending" : "Paid",
            date: isPaid ? null : new Date().toISOString().split("T")[0],
            method: isPaid ? null : "Cash",
          };
        }
        return p;
      })
    );
  };

  let filtered =
    role === "resident"
      ? payments.filter((p) => p.resident === currentUser)
      : payments;

  if (search)
    filtered = filtered.filter(
      (p) =>
        p.resident.toLowerCase().includes(search.toLowerCase()) ||
        p.invoiceId.toLowerCase().includes(search.toLowerCase())
    );

  if (statusFilter !== "All")
    filtered = filtered.filter((p) => p.status === statusFilter);

  if (monthFilter !== "All Months")
    filtered = filtered.filter((p) => p.month === monthFilter);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `EMS_Statement_${monthFilter.replace(" ", "_")}`,
  });

  const openDetail = (residentName) => {
    const residentPayments = payments.filter(
      (p) => p.resident === residentName
    );
    const lastMonthPayment = residentPayments.find(
      (p) => p.month === lastMonth
    ) || {
      amount: 0,
      usageKwh: 0,
      status: "No Record",
    };
    const currentMonthPayment = residentPayments.find(
      (p) => p.month === currentMonth
    ) || {
      amount: 0,
      usageKwh: 0,
      status: "Pending",
    };
    const arrears = getArrears(residentName);

    setSelectedResident({
      name: residentName,
      phone: residentPayments[0]?.phone || "N/A",
      lastMonth: {
        amount: lastMonthPayment.amount,
        usageKwh: lastMonthPayment.usageKwh,
        status: lastMonthPayment.status,
      },
      currentMonth: {
        amount: currentMonthPayment.amount,
        usageKwh: currentMonthPayment.usageKwh,
        status: currentMonthPayment.status,
      },
      totalOwed: arrears + currentMonthPayment.amount,
      image: "https://via.placeholder.com/120?text=" + residentName.charAt(0),
    });
  };

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Back & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {role === "resident" ? "My Bills" : "Collection Dashboard"}
              </h1>
              <p className="mt-1.5 text-gray-600 text-lg">
                Tracking {monthFilter === "All Months" ? "Global" : monthFilter}{" "}
                payments
              </p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 h-11 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium shadow-sm transition-all"
          >
            <Printer size={16} /> Print Statement
          </button>
        </div>

        {/* Stats Section (Admin/Manager Only) */}
        {role !== "resident" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Total Arrears (Debt)"
              value={`$${payments
                .filter((p) => p.status !== "Paid")
                .reduce((s, p) => s + p.amount, 0)
                .toFixed(2)}`}
              color="text-red-600"
            />
            <StatCard
              label="Filtered Collection"
              value={`$${filtered
                .filter((p) => p.status === "Paid")
                .reduce((s, p) => s + p.amount, 0)
                .toFixed(2)}`}
              color="text-emerald-600"
            />
            <StatCard
              label="Filtered Expected"
              value={`$${filtered
                .reduce((s, p) => s + p.amount, 0)
                .toFixed(2)}`}
              color="text-blue-600"
            />
          </div>
        )}

        {/* Filters Panel */}
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-[28px] border border-neutral-200 shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search resident..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 border-none font-medium outline-none focus:ring-2 ring-neutral-900/5"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-50">
              <Calendar size={16} className="text-neutral-400" />
              <select
                className="bg-transparent font-bold text-neutral-600 outline-none cursor-pointer"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <select
              className="px-4 py-3 rounded-xl bg-neutral-50 font-bold text-neutral-600 outline-none cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-[32px] border border-neutral-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <Th>Resident / ID</Th>
                <Th>Billing Month</Th>
                <Th align="right">Usage (kWh)</Th>
                <Th align="right">Current Amount</Th>
                <Th align="right">Arrears</Th>
                <Th align="right">Grand Total</Th>
                <Th>Status</Th>
                {role !== "resident" && <Th align="right">Action</Th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {paginated.map((p) => {
                const arrears = getArrears(p.resident);
                const total = p.amount + arrears;
                return (
                  <tr
                    key={p.id}
                    className="group hover:bg-neutral-50/50 transition-colors cursor-pointer"
                    onClick={() => openDetail(p.resident)}
                  >
                    <td className="py-5 px-8">
                      <p className="font-bold text-neutral-900">{p.resident}</p>
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-tighter">
                        {p.invoiceId}
                      </p>
                    </td>
                    <td className="py-5 px-8 font-medium text-neutral-500">
                      {p.month}
                    </td>
                    <td className="py-5 px-8 text-right font-bold text-neutral-700">
                      {p.usageKwh} kWh
                    </td>
                    <td className="py-5 px-8 text-right font-bold text-neutral-700">
                      ${p.amount.toFixed(2)}
                    </td>
                    <td
                      className={`py-5 px-8 text-right font-bold ${
                        arrears > 0 ? "text-red-500" : "text-neutral-200"
                      }`}
                    >
                      ${arrears.toFixed(2)}
                    </td>
                    <td className="py-5 px-8 text-right">
                      <span className="text-lg font-black text-neutral-900">
                        ${total.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-5 px-8">
                      <StatusBadge status={p.status} />
                    </td>
                    {role !== "resident" && (
                      <td className="py-5 px-8 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(p.id);
                          }}
                          className={`flex items-center gap-2 ml-auto px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${
                            p.status === "Paid"
                              ? "bg-neutral-100 text-neutral-400 hover:text-red-500"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                          }`}
                        >
                          {p.status === "Paid" ? (
                            <>
                              <Undo2 size={14} /> Revert
                            </>
                          ) : (
                            <>
                              <Wallet size={14} /> Mark Cash
                            </>
                          )}
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-6 border-t border-neutral-100 flex justify-between items-center bg-neutral-50/20">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 rounded-lg border border-neutral-200 disabled:opacity-20 hover:bg-white transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 rounded-lg border border-neutral-200 disabled:opacity-20 hover:bg-white transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Resident Detail Modal */}
        <AnimatePresence>
          {selectedResident && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedResident(null)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X size={24} className="text-gray-700" />
                </button>

                <div className="text-center mb-6">
                  <img
                    src={selectedResident.image}
                    alt={selectedResident.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-500 shadow-md"
                  />
                  <h2 className="text-2xl font-black mt-4">
                    {selectedResident.name}
                  </h2>
                  <p className="text-gray-600 font-medium">
                    {selectedResident.phone}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">
                      Last Month ({lastMonth})
                    </p>
                    <p className="text-xl font-bold mt-1">
                      ${selectedResident.lastMonth.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1 font-medium">
                      {selectedResident.lastMonth.usageKwh} kWh
                    </p>
                    <p
                      className={`text-sm font-medium mt-1 ${
                        selectedResident.lastMonth.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedResident.lastMonth.status}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">
                      Current Month ({currentMonth})
                    </p>
                    <p className="text-xl font-bold mt-1">
                      ${selectedResident.currentMonth.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1 font-medium">
                      {selectedResident.currentMonth.usageKwh} kWh
                    </p>
                    <p
                      className={`text-sm font-medium mt-1 ${
                        selectedResident.currentMonth.status === "Paid"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {selectedResident.currentMonth.status}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-orange-50 p-5 rounded-2xl border border-orange-200 text-center">
                  <p className="text-sm text-orange-700 font-medium">
                    Total Owed
                  </p>
                  <p className="text-3xl font-black text-orange-700 mt-1">
                    ${selectedResident.totalOwed.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Print Content (hidden) */}
        <div className="hidden">
          <div ref={printRef} className="p-12 text-neutral-800 font-sans">
            <div className="flex justify-between items-start border-b-4 border-neutral-900 pb-8">
              <div>
                <h1 className="text-3xl font-black tracking-tighter text-neutral-900">
                  ELECTRICITY MANAGEMENT
                </h1>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-1">
                  Monthly Utility Statement
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black uppercase">Report Date</p>
                <p className="text-xl font-medium">
                  {new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-black border-b-2 border-neutral-100 pb-2 mb-6 uppercase">
                Collection Summary: {monthFilter}
              </h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-neutral-400 border-b border-neutral-100">
                    <th className="py-4">Resident</th>
                    <th className="py-4">Invoice</th>
                    <th className="py-4 text-right">Usage (kWh)</th>
                    <th className="py-4 text-right">Monthly Bill</th>
                    <th className="py-4 text-right">Debt/Arrears</th>
                    <th className="py-4 text-right">Total Due</th>
                    <th className="py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filtered.map((p) => (
                    <tr key={p.id}>
                      <td className="py-4 font-bold">{p.resident}</td>
                      <td className="py-4 text-neutral-500">{p.invoiceId}</td>
                      <td className="py-4 text-right">{p.usageKwh} kWh</td>
                      <td className="py-4 text-right">
                        ${p.amount.toFixed(2)}
                      </td>
                      <td className="py-4 text-right text-red-500">
                        ${getArrears(p.resident).toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-black">
                        ${(p.amount + getArrears(p.resident)).toFixed(2)}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-1 rounded ${
                            p.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 ml-auto w-64 space-y-3 border-t-2 border-neutral-900 pt-6">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-neutral-400">SUBTOTAL</span>
                <span className="font-black">
                  ${filtered.reduce((s, p) => s + p.amount, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-neutral-400">
                  TOTAL ARREARS
                </span>
                <span className="font-black text-red-500">
                  $
                  {filtered
                    .reduce((s, p) => s + getArrears(p.resident), 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xl border-t border-neutral-100 pt-3">
                <span className="font-black">GRAND TOTAL</span>
                <span className="font-black text-neutral-900">
                  $
                  {filtered
                    .reduce((s, p) => s + p.amount + getArrears(p.resident), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-24 flex justify-between items-end italic text-neutral-400 text-xs">
              <div>
                <p>Verified By: __________________________</p>
                <p className="mt-2 uppercase font-black tracking-widest italic">
                  Operations Manager
                </p>
              </div>
              <div className="text-right">
                <p>Computer generated statement.</p>
                <p>No signature required unless manually marked.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ================= HELPERS ================= */
function Th({ children, align = "left" }) {
  return (
    <th
      className={`py-5 px-8 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-${align}`}
    >
      {children}
    </th>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-[28px] border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all">
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
        {label}
      </p>
      <p className={`text-3xl font-black mt-1 ${color}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-100 text-emerald-600",
    Pending: "bg-amber-100 text-amber-600",
    Overdue: "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
