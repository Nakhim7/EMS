import { BarChart3, Zap, DollarSign, TrendingUp } from "lucide-react";
import Layout from "../../components/Layout";

export default function ReportsPage() {
  return (
    <Layout>
      <div className="px-6 md:px-10 py-10 max-w-[1600px] mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Energy consumption and financial performance overview
          </p>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Kpi title="Total Usage" value="1,480 kWh" icon={Zap} />
          <Kpi title="Monthly Average" value="123.5 kWh" icon={BarChart3} />
          <Kpi title="Revenue" value="73,375 Riels" icon={DollarSign} />
          <Kpi title="Usage Trend" value="+8.2%" icon={TrendingUp} />
        </div>

        {/* Chart */}
        <div
          className="group bg-white dark:bg-neutral-950 rounded-2xl
          border border-gray-100 dark:border-neutral-800
          shadow-sm p-6 md:p-8
          transition hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <BarChart3 size={22} className="text-orange-600" />
              Monthly Energy Usage
            </h2>
            <span className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition">
              kWh (last 12 months)
            </span>
          </div>

          <div
            className="relative h-80 rounded-xl
            bg-gradient-to-br from-orange-50 to-transparent
            dark:from-orange-950/30
            border border-dashed border-orange-200 dark:border-orange-900
            flex items-center justify-center text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Interactive line chart showing monthly electricity usage trends.
              <br />
              <span className="text-sm opacity-75">
                (Chart.js / Recharts integration ready)
              </span>
            </p>

            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm
              flex items-center justify-center
              text-white text-sm font-medium
              opacity-0 group-hover:opacity-100 transition"
            >
              Hover to explore detailed trends
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* KPI Card */
const Kpi = ({ title, value, icon: Icon }) => (
  <div
    className="bg-white dark:bg-neutral-950 p-6 rounded-2xl
    border border-gray-100 dark:border-neutral-800
    shadow-sm flex items-center gap-5
    hover:-translate-y-1 hover:shadow-lg transition"
  >
    <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40">
      <Icon size={26} className="text-orange-600 dark:text-orange-400" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);
