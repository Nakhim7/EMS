import { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Calendar,
  DollarSign,
} from "lucide-react";
import Layout from "../../components/Layout";

export default function InvoicesPage() {
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("03");

  const invoices = [
    {
      id: "INV-2026-001",
      resident: "Venerable Sokha",
      meter: "DDS1531-023",
      amount: 27622,
      status: "Paid",
    },
    {
      id: "INV-2026-002",
      resident: "Venerable Dara",
      meter: "DDS1531-041",
      amount: 23729,
      status: "Unpaid",
    },
  ];

  return (
    <Layout>
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-[1800px] mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Invoices
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Monthly electricity billing & receipts
          </p>
        </div>

        {/* Filters + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex gap-4">
            <Select
              label="Year"
              value={year}
              setValue={setYear}
              options={["2024", "2025", "2026"]}
            />
            <Select
              label="Month"
              value={month}
              setValue={setMonth}
              options={[
                { v: "01", t: "January" },
                { v: "02", t: "February" },
                { v: "03", t: "March" },
              ]}
            />
          </div>

          <div className="flex gap-3">
            <ActionBtn icon={Download} text="Export Excel" />
            <ActionBtn icon={Printer} text="Print PDF" />
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 dark:bg-neutral-900 border-b">
              <tr>
                <Th>Invoice</Th>
                <Th>Resident</Th>
                <Th>Meter</Th>
                <Th align="right">Amount (Riels)</Th>
                <Th align="center">Status</Th>
                <Th align="right">Print</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
                >
                  <Td className="font-mono">{inv.id}</Td>
                  <Td className="font-medium">{inv.resident}</Td>
                  <Td>{inv.meter}</Td>
                  <Td align="right" className="font-semibold text-orange-600">
                    {inv.amount.toLocaleString()}
                  </Td>
                  <Td align="center">
                    <Status status={inv.status} />
                  </Td>
                  <Td align="right">
                    <button
                      onClick={() => window.print()}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                      <Printer size={18} />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Printable Receipt */}
        <PrintableInvoice />
      </div>
    </Layout>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Select = ({ label, value, setValue, options }) => (
  <div>
    <label className="block text-sm text-gray-500 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="px-4 py-3 rounded-xl border bg-white dark:bg-neutral-900"
    >
      {options.map((o) =>
        typeof o === "string" ? (
          <option key={o}>{o}</option>
        ) : (
          <option key={o.v} value={o.v}>
            {o.t}
          </option>
        )
      )}
    </select>
  </div>
);

const ActionBtn = ({ icon: Icon, text }) => (
  <button className="flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium">
    <Icon size={18} /> {text}
  </button>
);

const Status = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold
    ${
      status === "Paid"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {status}
  </span>
);

const Th = ({ children, align }) => (
  <th
    className={`px-6 py-4 text-sm font-semibold text-gray-600 ${
      align === "right" ? "text-right" : align === "center" ? "text-center" : ""
    }`}
  >
    {children}
  </th>
);

const Td = ({ children, align, className = "" }) => (
  <td
    className={`px-6 py-4 text-sm ${
      align === "right" ? "text-right" : align === "center" ? "text-center" : ""
    } ${className}`}
  >
    {children}
  </td>
);
