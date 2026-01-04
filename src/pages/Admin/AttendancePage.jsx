import React, { useState, useRef } from "react";
import { Printer, Plus, X, Settings2, Columns, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx"; // npm install xlsx
import Layout from "../../components/Layout";

export default function MonkAttendancePage() {
  const printRef = useRef(null);

  // Configurable page info (still in English for admin UI)
  const [pageConfig, setPageConfig] = useState({
    title: "បញ្ជីវត្តមានប្រចាំថ្ងៃ",
    institution: "វត្តឈូកវ៉ា",
    location: "រាជធានីភ្នំពេញ",
  });

  // Columns (labels shown in UI in English, but print uses Khmer)
  const [columns, setColumns] = useState([
    {
      id: "no",
      label: "No.",
      printLabel: "ល.រ",
      key: "index",
      width: "60px",
      permanent: true,
    },
    {
      id: "name",
      label: "Full Name",
      printLabel: "ព្រះនាម និងនាមត្រកូល",
      key: "full_name",
      width: "300px",
      permanent: true,
    },
    {
      id: "role",
      label: "Position / Title",
      printLabel: "នាទី/ឋានៈ",
      key: "role",
      width: "170px",
    },
    {
      id: "gender_role",
      label: "Monastic Role",
      printLabel: "ភេទសីល",
      key: "gender_role",
      width: "130px",
    },
    {
      id: "phone",
      label: "Phone Number",
      printLabel: "ទូរស័ព្ទ",
      key: "phone",
      width: "150px",
    },
  ]);

  // Sample data (English – your translation layer can handle display if needed)
  const [data] = useState([
    {
      id: 1,
      full_name: "Venerable Sok Chea",
      role: "Main Chant Teacher",
      gender_role: "Monk",
      phone: "012 345 678",
    },
    {
      id: 2,
      full_name: "Samanera Chanthol",
      role: "Student",
      gender_role: "Novice",
      phone: "098 765 432",
    },
    {
      id: 3,
      full_name: "Venerable Vann Sophea",
      role: "Assistant Teacher",
      gender_role: "Monk",
      phone: "097 112 2334",
    },
  ]);

  const [isConfiguring, setIsConfiguring] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const [exportOptions, setExportOptions] = useState({
    filename: "attendance_list",
    includeStatus: true,
    note: "Daily attendance record",
  });

  const addColumn = () => {
    const newCol = {
      id: `col-${Date.now()}`,
      label: "New Column",
      printLabel: "ជួរឈរថ្មី",
      key: `field_${Date.now()}`,
      width: "150px",
    };
    setColumns([...columns, newCol]);
  };

  const removeColumn = (id) => {
    setColumns(columns.filter((c) => c.id !== id || c.permanent));
  };

  const updateColumn = (id, field, value) => {
    setColumns(
      columns.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: pageConfig.title,
  });

  const handleExportExcel = () => {
    const exportRows = data.map((row, idx) => {
      const base = {
        "No.": idx + 1,
        "Full Name": row.full_name,
        "Position / Title": row.role,
        "Monastic Role": row.gender_role,
        "Phone Number": row.phone,
      };

      columns.forEach((col) => {
        if (
          !["index", "full_name", "role", "gender_role", "phone"].includes(
            col.key
          )
        ) {
          base[col.label] = row[col.key] || "";
        }
      });

      if (exportOptions.includeStatus) {
        base["Morning Present"] = "";
        base["Morning Absent"] = "";
        base["Evening Present"] = "";
        base["Evening Absent"] = "";
      }

      return base;
    });

    const ws = XLSX.utils.json_to_sheet(exportRows);
    XLSX.utils.sheet_add_aoa(ws, [[pageConfig.title]], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(
      ws,
      [[`${pageConfig.institution} — ${pageConfig.location}`]],
      { origin: "A2" }
    );
    XLSX.utils.sheet_add_aoa(ws, [[exportOptions.note]], { origin: "A3" });
    XLSX.utils.sheet_add_aoa(ws, [[]], { origin: "A4" });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, `${exportOptions.filename || "attendance"}.xlsx`);

    setShowExportModal(false);
  };

  return (
    <Layout>
      <style>{printStyles}</style>

      <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12 max-w-[2000px] mx-auto space-y-10">
        {/* Header - English UI */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Attendance List
            </h1>
            <p className="text-gray-600 mt-1">
              {pageConfig.institution} • {pageConfig.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsConfiguring(!isConfiguring)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isConfiguring
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <Settings2 size={18} />
              {isConfiguring ? "Finish" : "Customize"}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 shadow-md"
            >
              <Printer size={18} />
              Print (Khmer)
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 shadow-md"
            >
              <Download size={18} />
              Export Excel
            </button>
          </div>
        </div>

        {/* Config panel (English) */}
        {isConfiguring && (
          <div className="bg-gray-50 p-7 rounded-xl border border-gray-200 shadow-sm space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-600 uppercase">
                  Page Title (Khmer)
                </label>
                <input
                  value={pageConfig.title}
                  onChange={(e) =>
                    setPageConfig({ ...pageConfig, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-600 uppercase">
                  Institution (Khmer)
                </label>
                <input
                  value={pageConfig.institution}
                  onChange={(e) =>
                    setPageConfig({
                      ...pageConfig,
                      institution: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-600 uppercase">
                  Location (Khmer)
                </label>
                <input
                  value={pageConfig.location}
                  onChange={(e) =>
                    setPageConfig({ ...pageConfig, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-2">
                  <Columns size={18} /> Columns
                </label>
                <button
                  onClick={addColumn}
                  className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 shadow-sm"
                >
                  <Plus size={18} /> Add Column
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {columns.map((col) => (
                  <div
                    key={col.id}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm min-w-[180px]"
                  >
                    <input
                      value={col.label}
                      disabled={col.permanent}
                      onChange={(e) =>
                        updateColumn(col.id, "label", e.target.value)
                      }
                      className="flex-1 text-sm border-none focus:ring-0 disabled:bg-gray-50 outline-none"
                    />
                    {!col.permanent && (
                      <button
                        onClick={() => removeColumn(col.id)}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Screen table - English */}
        <div className="bg-white rounded-xl border border-gray-200 shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
                      style={{ width: col.width }}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase w-64">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className="px-6 py-4 text-sm text-gray-900"
                      >
                        {col.key === "index" ? idx + 1 : item[col.key] || "—"}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex gap-4">
                        <span className="px-4 py-1.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Present
                        </span>
                        <span className="px-4 py-1.5 bg-red-100 text-red-800 text-xs rounded-full">
                          Absent
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export modal - English */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h2 className="text-xl font-semibold mb-6">Export to Excel</h2>
              {/* ... same export form as before ... */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Name
                  </label>
                  <input
                    value={exportOptions.filename}
                    onChange={(e) =>
                      setExportOptions({
                        ...exportOptions,
                        filename: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeStatus"
                    checked={exportOptions.includeStatus}
                    onChange={(e) =>
                      setExportOptions({
                        ...exportOptions,
                        includeStatus: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-green-600 rounded"
                  />
                  <label
                    htmlFor="includeStatus"
                    className="text-sm text-gray-700"
                  >
                    Include status columns
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note
                  </label>
                  <input
                    value={exportOptions.note}
                    onChange={(e) =>
                      setExportOptions({
                        ...exportOptions,
                        note: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportExcel}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Khmer-style print/PDF version */}
      <div ref={printRef} className="print-only print-khmer">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 khmer-title">
            {pageConfig.title}
          </h1>
          <p className="text-xl font-medium">
            {pageConfig.institution} — {pageConfig.location}
          </p>
          <p className="mt-6 text-lg">ថ្ងៃទី ………… ខែ ………… ឆ្នាំ ២០២៦</p>
        </div>

        <table className="khmer-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.id} rowSpan={2} style={{ width: col.width }}>
                  {col.printLabel || col.label}
                </th>
              ))}
              <th colSpan={4}>ព្រឹក</th>
              <th colSpan={4}>ល្ងាច</th>
            </tr>
            <tr className="sub-header">
              <th>វត្តមាន</th>
              <th>អវត្តមាន</th>
              <th>កំណត់សម្គាល់</th>
              <th>ហត្ថលេខា</th>
              <th>វត្តមាន</th>
              <th>អវត្តមាន</th>
              <th>កំណត់សម្គាល់</th>
              <th>ហត្ថលេខា</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={
                      col.key === "full_name"
                        ? "text-left pl-6 font-medium"
                        : "text-center"
                    }
                  >
                    {col.key === "index" ? idx + 1 : item[col.key] || ""}
                  </td>
                ))}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-12 text-right text-sm italic">
          បោះពុម្ពនៅថ្ងៃទី {new Date().toLocaleDateString("km-KH")}
        </div>
      </div>
    </Layout>
  );
}

const printStyles = `
  @media print {
    @page { size: A4 landscape; margin: 12mm; }
    .print-only { display: block !important; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

    .print-khmer {
      font-family: 'Kantumruy Pro', 'Khmer OS Muol Light', 'Khmer OS', 'Noto Sans Khmer', sans-serif;
      font-size: 11pt;
      color: black;
    }

    .khmer-title {
      font-family: 'Khmer OS Muol Light', 'Kantumruy Pro', serif;
      letter-spacing: 0.5px;
    }

    .khmer-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5pt;
    }

    .khmer-table th, .khmer-table td {
      border: 1px solid black;
      padding: 6px 8px;
      text-align: center;
      vertical-align: middle;
    }

    .khmer-table th {
      background-color: #f8f8f8;
      font-weight: bold;
    }

    .sub-header th {
      font-size: 9.5pt;
      background-color: #f0f0f0;
    }

    .text-left { text-align: left !important; padding-left: 12px !important; }
  }

  .print-only { display: none; }
`;
