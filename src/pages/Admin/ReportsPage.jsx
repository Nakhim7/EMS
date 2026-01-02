import { useState, useRef } from "react";
import {
  Printer,
  Download,
  Zap,
  DollarSign,
  Calendar,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import Layout from "../../components/Layout";
import { useReactToPrint } from "react-to-print";

/* ---------------- MOCK DATA ---------------- */
const invoices = [
  {
    id: "INV-001",
    resident: "Sokha",
    meter: "MTR-101",
    month: "January",
    year: "2025",
    amount: 45.2,
    status: "Paid",
  },
  {
    id: "INV-002",
    resident: "Vannak",
    meter: "MTR-105",
    month: "January",
    year: "2025",
    amount: 62.8,
    status: "Pending",
  },
  {
    id: "INV-003",
    resident: "Srey",
    meter: "MTR-112",
    month: "February",
    year: "2025",
    amount: 38.5,
    status: "Paid",
  },
];

const usageData = [
  { month: "January", year: "2025", kwh: 770, amount: 469700 },
  { month: "February", year: "2025", kwh: 280, amount: 170800 },
  { month: "March", year: "2025", kwh: 390, amount: 237900 },
];

/* ================= MAIN PAGE ================= */
export default function EMSReportsPage() {
  const [tab, setTab] = useState("invoice");
  const [resident, setResident] = useState("All");
  const [year, setYear] = useState("2025");
  const [confirmExport, setConfirmExport] = useState(false);
  const printRef = useRef(null);

  const residents = [...new Set(invoices.map((i) => i.resident))];

  const filteredInvoices = invoices.filter(
    (i) =>
      (resident === "All" || i.resident === resident) &&
      (year === "All" || i.year === year)
  );

  const filteredUsage = usageData.filter(
    (d) => year === "All" || d.year === year
  );
  const totalKwh = filteredUsage.reduce((sum, d) => sum + d.kwh, 0);
  const totalPaid = filteredUsage.reduce((sum, d) => sum + d.amount, 0);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `EMS_Report_${tab}_${year}`,
  });

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredInvoices);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoices");
    XLSX.writeFile(wb, `EMS_Invoices_${year}.xlsx`);
    setConfirmExport(false);
  };

  return (
    <Layout>
      <style>{printStyles}</style>

      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10 no-print-container">
        {/* Screen Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 no-print">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                EMS Reports Center
              </h1>
              <p className="mt-1.5 text-gray-600">
                Official Billing & Usage Documentation
              </p>
            </div>
          </div>

          <div className="flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
            <TabButton
              active={tab === "invoice"}
              onClick={() => setTab("invoice")}
            >
              Invoices
            </TabButton>
            <TabButton active={tab === "usage"} onClick={() => setTab("usage")}>
              Usage & Billing
            </TabButton>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm no-print">
          {tab === "invoice" && (
            <select
              value={resident}
              onChange={(e) => setResident(e.target.value)}
              className="h-11 px-5 rounded-xl border border-gray-300 bg-white text-sm outline-none min-w-[180px]"
            >
              <option value="All">All Residents</option>
              {residents.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          )}

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-11 px-5 rounded-xl border border-gray-300 bg-white text-sm outline-none min-w-[140px]"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          <div className="flex gap-3 sm:ml-auto">
            <ActionButton onClick={handlePrint} variant="primary">
              <Printer size={16} /> Print A4 Receipt
            </ActionButton>
            {tab === "invoice" && (
              <ActionButton
                onClick={() => setConfirmExport(true)}
                variant="success"
              >
                <Download size={16} /> Export Excel
              </ActionButton>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div ref={printRef} className="print-area">
          <AnimatePresence mode="wait">
            {tab === "invoice" ? (
              <InvoiceSection key="inv" data={filteredInvoices} year={year} />
            ) : (
              <UsageSection
                key="use"
                data={filteredUsage}
                totalKwh={totalKwh}
                totalPaid={totalPaid}
                year={year}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Export Modal */}
        <AnimatePresence>
          {confirmExport && (
            <ConfirmModal
              onCancel={() => setConfirmExport(false)}
              onConfirm={exportExcel}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

/* ──────────────────────────────────────────────
   Invoice Section (Print-Optimized)
──────────────────────────────────────────────── */
function InvoiceSection({ data, year }) {
  return (
    <div className="space-y-6">
      {/* Print Header (A4 Only) */}
      <div className="print-only a4-header">
        <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-orange-600 text-white flex items-center justify-center rounded-lg font-bold text-2xl">
                E
              </div>
              <h1 className="text-2xl font-bold tracking-tighter">
                EMS ENERGY SOLUTIONS
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              123 Industrial Blvd, Phnom Penh, Cambodia
            </p>
            <p className="text-sm text-gray-500">
              Contact: +855 23 888 999 | support@ems.com
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-light text-gray-300 uppercase tracking-widest mb-2">
              Invoice
            </h2>
            <p className="text-sm">
              <strong>Date:</strong> {new Date().toLocaleDateString("en-GB")}
            </p>
            <p className="text-sm">
              <strong>Report Year:</strong> {year}
            </p>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden a4-body">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Invoice ID
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Resident
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Meter
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Period
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">
                Amount (USD)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-semibold">{inv.id}</td>
                <td className="px-6 py-4 text-sm">{inv.resident}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{inv.meter}</td>
                <td className="px-6 py-4 text-sm">
                  {inv.month} {inv.year}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-right">
                  ${inv.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print Footer (A4 Only) */}
      <div className="print-only a4-footer">
        <div className="mt-20 flex justify-between items-end border-t pt-8">
          <div className="w-1/2 text-[10pt] text-gray-500 space-y-1">
            <p className="font-bold text-gray-800">Payment Notice:</p>
            <p>
              Please ensure all pending payments are settled via bank transfer
              or ABA mobile app.
            </p>
            <p>
              This document is electronically generated and remains valid
              without a physical stamp.
            </p>
          </div>
          <div className="text-center w-64">
            <div className="border-b border-gray-900 mb-2 h-10"></div>
            <p className="text-xs font-bold uppercase tracking-widest">
              Authorized Signature
            </p>
            <p className="text-[9px] text-gray-400 italic">
              Verified by EMS Smart System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Usage Section (Print-Optimized)
──────────────────────────────────────────────── */
function UsageSection({ data, totalKwh, totalPaid, year }) {
  return (
    <div className="space-y-8">
      {/* Screen Summary (Hidden in print) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 no-print">
        <SummaryCard
          icon={Zap}
          title="Total Energy"
          value={`${totalKwh} kWh`}
          color="orange"
        />
        <SummaryCard
          icon={DollarSign}
          title="Total Revenue"
          value={`${totalPaid.toLocaleString()}៛`}
          color="emerald"
        />
        <SummaryCard
          icon={Calendar}
          title="Periods"
          value={data.length}
          color="blue"
        />
        <SummaryCard
          icon={FileText}
          title="Type"
          value="Official"
          color="purple"
        />
      </div>

      {/* Print Header */}
      <div className="print-only a4-header mb-8 pb-4 border-b-2 border-gray-900">
        <h1 className="text-2xl font-bold uppercase">
          Energy Usage Statement - {year}
        </h1>
        <p className="text-gray-500">Official monthly consumption breakdown</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden a4-body">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase">
                Billing Cycle
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-right">
                Consumption (kWh)
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-right">
                Total Amount (Riels)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-sm font-medium">
                  {item.month} {item.year}
                </td>
                <td className="px-6 py-4 text-sm text-right font-mono">
                  {item.kwh.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-right font-bold">
                  {item.amount.toLocaleString()}៛
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50/50 font-bold border-t-2 border-gray-200">
              <td className="px-6 py-4 text-sm uppercase">Grand Total</td>
              <td className="px-6 py-4 text-sm text-right font-mono text-orange-600">
                {totalKwh.toLocaleString()} kWh
              </td>
              <td className="px-6 py-4 text-sm text-right text-emerald-600">
                {totalPaid.toLocaleString()}៛
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="print-only a4-footer mt-12 text-center text-xs text-gray-400 italic">
        Report generated on {new Date().toLocaleString()} • EMS Internal Use
        Only
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Components & Styles
──────────────────────────────────────────────── */

function SummaryCard({ icon: Icon, title, value, color }) {
  const colorMap = {
    orange: "bg-orange-50 text-orange-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className={`inline-flex p-3 rounded-xl ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <p className="mt-4 text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
        active
          ? "bg-orange-600 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

function ActionButton({ children, variant, onClick }) {
  const styles =
    variant === "primary"
      ? "bg-orange-600 hover:bg-orange-700"
      : "bg-emerald-600 hover:bg-emerald-700";
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 h-11 rounded-xl font-medium text-sm text-white transition-all shadow-sm ${styles}`}
    >
      {children}
    </button>
  );
}

function ConfirmModal({ onCancel, onConfirm }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm text-center"
      >
        <h3 className="text-xl font-bold mb-2">Confirm Export</h3>
        <p className="text-gray-500 mb-6">
          Download the current report as Excel?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-emerald-600 text-white rounded-xl"
          >
            Download
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const printStyles = `
  @media print {
    @page {
      size: A4;
      margin: 15mm;
    }
    
    body {
      background: white !important;
      -webkit-print-color-adjust: exact;
    }

    .no-print { display: none !important; }
    
    /* Layout Reset */
    .print-area {
      display: block !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
    }

    .a4-body {
      border: 1px solid #eee !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    .print-only { display: block !important; }

    /* Fix table colors for print */
    th { background-color: #f8fafc !important; color: black !important; }
    td { border-bottom: 1px solid #f1f5f9 !important; }
  }

  .print-only { display: none; }
`;
