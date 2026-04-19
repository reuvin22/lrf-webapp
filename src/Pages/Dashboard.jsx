import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  FileText,
  DollarSign,
  Users,
  Unlock,
  TrendingUp,
  Lock,
  Globe,
  CalendarDays,
  PanelLeft,
  HardHat,
  Receipt,
  Send,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { MONTHS, MONTHLY_DATA, INVOICE_STATUSES } from "../constants/Constants";
import { useGetOcrUploadsQuery } from "../store/api/OcrApi";

function computeBilling(workers) {
  return workers.reduce((sum, w) => sum + w.days * w.rate, 0);
}

function formatYen(amount) {
  return `¥${amount.toLocaleString("ja-JP")}`;
}


const realtimeSites = [
  { name: "Shinjuku Tower A", workers: 8, status: "Active"  },
  { name: "Osaka Refinery B", workers: 5, status: "Active"  },
  { name: "Yokohama Port C",  workers: 3, status: "Standby" },
];

function InvoiceStatusBadge({ status }) {
  const styles = {
    [INVOICE_STATUSES.PENDING]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
    [INVOICE_STATUSES.SENT]:    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    [INVOICE_STATUSES.PAID]:    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  };
  const labels = {
    [INVOICE_STATUSES.PENDING]: "Pending",
    [INVOICE_STATUSES.SENT]:    "Sent",
    [INVOICE_STATUSES.PAID]:    "Paid",
  };
  const cls = styles[status] ?? styles[INVOICE_STATUSES.PENDING];
  return (
    <span className={`text-[11px] font-semibold px-[10px] py-[3px] rounded-full ${cls}`}>
      {labels[status] ?? "Pending"}
    </span>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: ocrUploads = [] } = useGetOcrUploadsQuery();
  const pendingOcrCount = ocrUploads.filter((o) => o.status === 'PENDING').length;

  const actionItems = [
    { label: "Unconfirmed OCR",         count: pendingOcrCount, icon: FileText,   color: "text-gray-500", onClick: () => navigate('/ocr-management?status=PENDING') },
    { label: "Expense Conflicts",       count: 2,               icon: DollarSign, color: "text-red-500"   },
    { label: "Missing Entries (today)", count: 3,               icon: Users,      color: "text-amber-500" },
    { label: "Lock Released",           count: 1,               icon: Unlock,     color: "text-gray-500"  },
  ];

  const [selectedMonth, setSelectedMonth] = useState("Feb 2026");
  const [expandedId, setExpandedId]       = useState(null);
  const [sentOverrides, setSentOverrides] = useState({});

  const { summary, deployments } = MONTHLY_DATA[selectedMonth];

  const resolveStatus = (id, defaultStatus) =>
    sentOverrides[`${selectedMonth}_${id}`] ?? defaultStatus;

  const handleSendInvoice = (id) => {
    setSentOverrides((prev) => ({
      ...prev,
      [`${selectedMonth}_${id}`]: INVOICE_STATUSES.SENT,
    }));
  };

  const totalWorkers  = deployments.reduce((s, d) => s + d.workers.length, 0);
  const totalBilling  = deployments.reduce((s, d) => s + computeBilling(d.workers), 0);
  const pendingAmount = deployments
    .filter((d) => resolveStatus(d.id, d.invoiceStatus) === INVOICE_STATUSES.PENDING)
    .reduce((s, d) => s + computeBilling(d.workers), 0);
  const pendingCount = deployments.filter(
    (d) => resolveStatus(d.id, d.invoiceStatus) === INVOICE_STATUSES.PENDING
  ).length;

  const card    = "bg-white dark:bg-gray-800 border border-[#E6EAF0] dark:border-gray-700 rounded-[12px]";
  const divider = "border-b border-[#EEF2F6] dark:border-gray-700";
  const rowDiv  = "border-b border-[#F1F5F9] dark:border-gray-700";
  const th      = "text-[11px] font-semibold py-3 text-gray-500 dark:text-gray-400";

  return (
    <div className="min-h-screen bg-[#F6F8FB] dark:bg-gray-900 transition-colors duration-200">

      {/* Breadcrumb */}
      <div className={`flex items-center gap-2 px-6 py-[14px] ${divider}`}>
        <PanelLeft size={18} className="text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
        <span className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Admin</span>
      </div>

      <div className="max-w-[1050px] mx-auto px-4 py-6">

        {/* Title + Month picker */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[22px] font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <div className={`relative flex items-center gap-2 px-3 py-[6px] rounded-lg border border-[#E6EAF0] dark:border-gray-600 bg-white dark:bg-gray-800`}>
            <CalendarDays size={14} className="text-gray-500 dark:text-gray-400" />
            <select
              value={selectedMonth}
              onChange={(e) => { setSelectedMonth(e.target.value); setExpandedId(null); }}
              className="text-[13px] font-medium appearance-none bg-transparent border-none outline-none cursor-pointer pr-5 text-gray-700 dark:text-gray-200"
            >
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 text-gray-400 dark:text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Action Required */}
        <div className={card}>
          <div className={`flex items-center gap-2 px-5 py-[14px] ${divider}`}>
            <AlertCircle size={16} className="text-red-500" strokeWidth={1.8} />
            <span className="text-[14px] font-semibold text-gray-900 dark:text-gray-100">Action Required</span>
          </div>
          {actionItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                onClick={item.onClick}
                className={`flex items-center justify-between px-5 py-[12px] cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors ${
                  i !== actionItems.length - 1 ? rowDiv : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={item.color} strokeWidth={1.5} />
                  <span className="text-[13px] text-blue-600 dark:text-blue-400">{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="min-w-[26px] h-[22px] flex items-center justify-center text-[12px] rounded-full px-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {item.count}
                  </span>
                  <span className="text-[16px] text-gray-400 dark:text-gray-500 cursor-pointer inline-block transition-transform duration-200 hover:scale-125">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { icon: Users,      label: "Attendance Rate", value: `${summary.attendanceRate}%`, sub: `${summary.attendanceDays} days` },
            { icon: TrendingUp, label: "Cost Total",       value: summary.costTotal,            sub: `${summary.sitesCount} sites` },
            { icon: Lock,       label: "Closing Status",   value: summary.closingStatus,        sub: summary.closingDaysLeft > 0 ? `${summary.closingDaysLeft} days left` : "Closed" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className={`${card} px-5 py-[16px]`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className="text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
                <p className="text-[12px] text-gray-500 dark:text-gray-400">{label}</p>
              </div>
              <p className="text-[24px] font-bold text-gray-900 dark:text-gray-100">{value}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* Real-time Site Status */}
        <div className={`${card} mt-5`}>
          <div className={`flex items-center gap-2 px-5 py-[14px] ${divider}`}>
            <Globe size={15} className="text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
            <span className="text-[14px] font-semibold text-gray-700 dark:text-gray-300">Real-time Site Status</span>
          </div>
          {realtimeSites.map((site, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-[14px] ${i !== realtimeSites.length - 1 ? rowDiv : ""}`}
            >
              <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100">{site.name}</span>
              <div className="flex items-center gap-6">
                <span className="text-[12px] text-gray-400 dark:text-gray-500">{site.workers} workers</span>
                <span
                  className={`text-[11px] font-medium px-3 py-[4px] rounded-full ${
                    site.status === "Active"
                      ? "bg-[#0F9D7A] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {site.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Worker Deployment */}
        <div className={`${card} mt-5`}>
          <div className={`flex items-center justify-between px-5 py-[14px] ${divider}`}>
            <div className="flex items-center gap-2">
              <HardHat size={15} className="text-[#0F9D7A]" strokeWidth={1.5} />
              <span className="text-[14px] font-semibold text-gray-900 dark:text-gray-100">Worker Deployment</span>
              <span className="text-[11px] font-medium ml-1 px-2 py-[2px] rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                {selectedMonth}
              </span>
            </div>
            <span className="text-[12px] text-gray-500 dark:text-gray-400">
              {totalWorkers} workers · {deployments.length} sites
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr className={rowDiv}>
                  <th className={`${th} px-5 w-[220px]`}>SITE</th>
                  <th className={`${th} px-4 w-[200px]`}>SUBCONTRACTOR</th>
                  <th className={`${th} px-4 text-center w-[80px]`}>PEOPLE</th>
                  <th className={`${th} px-4 text-right w-[100px]`}>TOTAL DAYS</th>
                  <th className={`${th} pr-5 text-right w-[40px]`}></th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d) => {
                  const isExpanded = expandedId === d.id;
                  const totalDays  = d.workers.reduce((s, w) => s + w.days, 0);
                  return (
                    <>
                      <tr
                        key={d.id}
                        onClick={() => setExpandedId(isExpanded ? null : d.id)}
                        className={`cursor-pointer transition-colors hover:bg-[#F0FDF9] dark:hover:bg-gray-700/40 ${rowDiv}`}
                      >
                        <td className="py-[12px] px-5">
                          <div className="flex items-center gap-2">
                            {isExpanded
                              ? <ChevronDown size={13} className="text-[#0F9D7A]" />
                              : <ChevronRight size={13} className="text-gray-400 dark:text-gray-500" />
                            }
                            <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100">{d.site}</span>
                          </div>
                        </td>
                        <td className="py-[12px] px-4 text-[13px] text-gray-700 dark:text-gray-300">{d.subcontractor}</td>
                        <td className="py-[12px] px-4 text-center">
                          <span className="inline-flex items-center justify-center w-[32px] h-[22px] rounded-full text-[12px] font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-[#0F9D7A] dark:text-emerald-400">
                            {d.workers.length}
                          </span>
                        </td>
                        <td className="py-[12px] px-4 text-[13px] font-medium text-right text-gray-700 dark:text-gray-300">{totalDays}</td>
                        <td className="py-[12px] pr-5 text-right text-[12px] text-gray-400 dark:text-gray-500">
                          {isExpanded ? "▲" : "▼"}
                        </td>
                      </tr>
                      {isExpanded && d.workers.map((w, wi) => (
                        <tr key={`${d.id}-w-${wi}`} className={`bg-gray-50 dark:bg-gray-700/30 ${rowDiv}`}>
                          <td className="py-[9px] pl-12 pr-4 text-[12px] text-gray-700 dark:text-gray-300">{w.name}</td>
                          <td className="py-[9px] px-4 text-[12px] text-gray-500 dark:text-gray-400">{w.role}</td>
                          <td className="py-[9px] px-4 text-[12px] text-center text-gray-500 dark:text-gray-400">—</td>
                          <td className="py-[9px] px-4 text-[12px] text-right font-medium text-gray-700 dark:text-gray-300">{w.days} days</td>
                          <td className="py-[9px] pr-5 text-right text-[12px] text-gray-500 dark:text-gray-400">{formatYen(w.days * w.rate)}/mo</td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className={`${card} mt-5`}>
          <div className={`flex items-center justify-between px-5 py-[14px] ${divider}`}>
            <div className="flex items-center gap-2">
              <Receipt size={15} className="text-[#0F9D7A]" strokeWidth={1.5} />
              <span className="text-[14px] font-semibold text-gray-900 dark:text-gray-100">Invoice Summary</span>
            </div>
            <div className="flex items-center gap-4">
              {pendingCount > 0 && (
                <span className="text-[11px] font-medium px-[10px] py-[3px] rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300">
                  {pendingCount} pending
                </span>
              )}
              <span className="text-[13px] font-semibold text-[#0F9D7A]">Total {formatYen(totalBilling)}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[720px]">
              <thead>
                <tr className={rowDiv}>
                  <th className={`${th} px-5 w-[200px]`}>SITE</th>
                  <th className={`${th} px-4 w-[180px]`}>SUBCONTRACTOR</th>
                  <th className={`${th} px-4 text-center w-[70px]`}>PEOPLE</th>
                  <th className={`${th} px-4 text-right w-[130px]`}>AMOUNT</th>
                  <th className={`${th} px-4 text-center w-[90px]`}>STATUS</th>
                  <th className={`${th} pr-5 text-right w-[130px]`}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d, i) => {
                  const status    = resolveStatus(d.id, d.invoiceStatus);
                  const amount    = computeBilling(d.workers);
                  const isPending = status === INVOICE_STATUSES.PENDING;
                  return (
                    <tr key={d.id} className={i !== deployments.length - 1 ? rowDiv : ""}>
                      <td className="py-[13px] px-5 text-[13px] font-medium text-gray-900 dark:text-gray-100">{d.site}</td>
                      <td className="py-[13px] px-4 text-[13px] text-gray-700 dark:text-gray-300">{d.subcontractor}</td>
                      <td className="py-[13px] px-4 text-center text-[13px] text-gray-700 dark:text-gray-300">{d.workers.length}</td>
                      <td className="py-[13px] px-4 text-right text-[13px] font-semibold text-gray-900 dark:text-gray-100">{formatYen(amount)}</td>
                      <td className="py-[13px] px-4 text-center"><InvoiceStatusBadge status={status} /></td>
                      <td className="py-[13px] pr-5 text-right">
                        {isPending ? (
                          <button
                            onClick={() => handleSendInvoice(d.id)}
                            className="cursor-pointer inline-flex items-center gap-[6px] px-3 py-[5px] rounded-lg text-[12px] font-medium bg-[#0F9D7A] hover:bg-[#0B7A66] text-white transition-colors"
                          >
                            <Send size={12} strokeWidth={2} />
                            Send Invoice
                          </button>
                        ) : (
                          <span className="text-[12px] text-gray-300 dark:text-gray-600">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={`flex items-center justify-between px-5 py-[12px] border-t ${divider} bg-gray-50 dark:bg-gray-700/30 rounded-b-[12px]`}>
            <span className="text-[12px] text-gray-500 dark:text-gray-400">
              {pendingCount > 0
                ? `${pendingCount} invoice${pendingCount > 1 ? "s" : ""} awaiting dispatch`
                : "All invoices dispatched for this month"}
            </span>
            <div className="flex items-center gap-5">
              {pendingAmount > 0 && (
                <span className="text-[12px] text-yellow-800 dark:text-yellow-300">
                  Unbilled <span className="font-semibold">{formatYen(pendingAmount)}</span>
                </span>
              )}
              <span className="text-[12px] font-semibold text-[#0F9D7A]">Total {formatYen(totalBilling)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
