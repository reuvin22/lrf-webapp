import { useState } from "react";
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

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Sum all worker billing for one deployment entry. */
function computeBilling(workers) {
  return workers.reduce((sum, w) => sum + w.days * w.rate, 0);
}

/** Format a number as Japanese yen string. */
function formatYen(amount) {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

// ─── static data (does not depend on month) ───────────────────────────────────

const actionItems = [
  { label: "Unconfirmed OCR",        count: 5, icon: FileText,   color: "text-[#6B7280]" },
  { label: "Expense Conflicts",      count: 2, icon: DollarSign, color: "text-[#EF4444]" },
  { label: "Missing Entries (today)",count: 3, icon: Users,      color: "text-[#F59E0B]" },
  { label: "Lock Released",          count: 1, icon: Unlock,     color: "text-[#6B7280]" },
];

const realtimeSites = [
  { name: "Shinjuku Tower A", workers: 8, status: "Active"  },
  { name: "Osaka Refinery B", workers: 5, status: "Active"  },
  { name: "Yokohama Port C",  workers: 3, status: "Standby" },
];

// ─── sub-components ───────────────────────────────────────────────────────────

function InvoiceStatusBadge({ status }) {
  const styles = {
    [INVOICE_STATUSES.PENDING]: { bg: "#FEF3C7", color: "#92400E", label: "Pending" },
    [INVOICE_STATUSES.SENT]:    { bg: "#DBEAFE", color: "#1E40AF", label: "Sent"    },
    [INVOICE_STATUSES.PAID]:    { bg: "#D1FAE5", color: "#065F46", label: "Paid"    },
  };
  const s = styles[status] ?? styles[INVOICE_STATUSES.PENDING];
  return (
    <span
      className="text-[11px] font-semibold px-[10px] py-[3px] rounded-full"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Feb 2026");
  const [expandedId, setExpandedId]       = useState(null);
  // Local invoice status overrides keyed by `${month}_${id}`
  const [sentOverrides, setSentOverrides] = useState({});

  const { summary, deployments } = MONTHLY_DATA[selectedMonth];

  // Resolve current invoice status (local override takes precedence)
  const resolveStatus = (id, defaultStatus) =>
    sentOverrides[`${selectedMonth}_${id}`] ?? defaultStatus;

  const handleSendInvoice = (id) => {
    setSentOverrides((prev) => ({
      ...prev,
      [`${selectedMonth}_${id}`]: INVOICE_STATUSES.SENT,
    }));
  };

  // Aggregate totals for the selected month
  const totalWorkers  = deployments.reduce((s, d) => s + d.workers.length, 0);
  const totalBilling  = deployments.reduce((s, d) => s + computeBilling(d.workers), 0);
  const pendingAmount = deployments
    .filter((d) => resolveStatus(d.id, d.invoiceStatus) === INVOICE_STATUSES.PENDING)
    .reduce((s, d) => s + computeBilling(d.workers), 0);

  const pendingCount = deployments.filter(
    (d) => resolveStatus(d.id, d.invoiceStatus) === INVOICE_STATUSES.PENDING
  ).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F6F8FB" }}>
      {/* ── Breadcrumb header ── */}
      <div
        className="flex items-center gap-2 px-6 py-[14px] border-b"
        style={{ borderColor: "#EEF2F6" }}
      >
        <PanelLeft size={18} style={{ color: "#6B7280" }} strokeWidth={1.5} />
        <span className="text-[13px] font-medium" style={{ color: "#6B7280" }}>
          Admin
        </span>
      </div>

      <div className="max-w-[1050px] mx-auto px-4 py-6">

        {/* ── Title row with month filter ── */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[22px] font-semibold" style={{ color: "#111827" }}>
            Dashboard
          </h1>

          {/* Month picker */}
          <div
            className="relative flex items-center gap-2 px-3 py-[6px] rounded-lg border"
            style={{ borderColor: "#E6EAF0", backgroundColor: "#fff" }}
          >
            <CalendarDays size={14} style={{ color: "#6B7280" }} />
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setExpandedId(null);
              }}
              className="text-[13px] font-medium appearance-none bg-transparent border-none outline-none cursor-pointer pr-5"
              style={{ color: "#374151" }}
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <ChevronDown
              size={12}
              style={{ color: "#9CA3AF", position: "absolute", right: 10, pointerEvents: "none" }}
            />
          </div>
        </div>

        {/* ── Action Required ── */}
        <div
          className="rounded-[12px] border"
          style={{ backgroundColor: "#fff", borderColor: "#E6EAF0" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-[14px] border-b"
            style={{ borderColor: "#EEF2F6" }}
          >
            <AlertCircle size={16} style={{ color: "#EF4444" }} strokeWidth={1.8} />
            <span className="text-[14px] font-semibold" style={{ color: "#111827" }}>
              Action Required
            </span>
          </div>

          {actionItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-[12px] cursor-pointer transition-colors duration-150 hover:bg-[#EFF6FF] ${
                  i !== actionItems.length - 1 ? "border-b" : ""
                }`}
                style={{ borderColor: "#F1F5F9" }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={item.color} strokeWidth={1.5} />
                  <span className="text-[13px]" style={{ color: "#2563EB" }}>
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="min-w-[26px] h-[22px] flex items-center justify-center text-[12px] rounded-full px-2"
                    style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
                  >
                    {item.count}
                  </span>
                  <span
                    style={{ color: "#9CA3AF" }}
                    className="text-[16px] cursor-pointer inline-block transition-transform duration-200 hover:scale-130"
                  >
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div
            className="rounded-[12px] border px-5 py-[16px]"
            style={{ backgroundColor: "#fff", borderColor: "#E6EAF0" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} style={{ color: "#6B7280" }} strokeWidth={1.5} />
              <p className="text-[12px]" style={{ color: "#6B7280" }}>Attendance Rate</p>
            </div>
            <p className="text-[24px] font-bold" style={{ color: "#111827" }}>
              {summary.attendanceRate}%
            </p>
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>{summary.attendanceDays} days</p>
          </div>

          <div
            className="rounded-[12px] border px-5 py-[16px]"
            style={{ backgroundColor: "#fff", borderColor: "#E6EAF0" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} style={{ color: "#6B7280" }} strokeWidth={1.5} />
              <p className="text-[12px]" style={{ color: "#6B7280" }}>Cost Total</p>
            </div>
            <p className="text-[24px] font-bold" style={{ color: "#111827" }}>{summary.costTotal}</p>
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>{summary.sitesCount} sites</p>
          </div>

          <div
            className="rounded-[12px] border px-5 py-[16px]"
            style={{ backgroundColor: "#fff", borderColor: "#E6EAF0" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Lock size={14} style={{ color: "#6B7280" }} strokeWidth={1.5} />
              <p className="text-[12px]" style={{ color: "#6B7280" }}>Closing Status</p>
            </div>
            <p className="text-[22px] font-bold" style={{ color: "#111827" }}>
              {summary.closingStatus}
            </p>
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
              {summary.closingDaysLeft > 0
                ? `${summary.closingDaysLeft} days left`
                : "Closed"}
            </p>
          </div>
        </div>

        {/* ── Real-time Site Status ── */}
        <div
          className="rounded-[12px] border mt-5"
          style={{ backgroundColor: "#fff", borderColor: "#E6EAF0" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-[14px] border-b"
            style={{ borderColor: "#EEF2F6" }}
          >
            <Globe size={15} style={{ color: "#374151" }} strokeWidth={1.5} />
            <span className="text-[14px] font-semibold" style={{ color: "#374151" }}>
              Real-time Site Status
            </span>
          </div>

          {realtimeSites.map((site, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-[14px] ${
                i !== realtimeSites.length - 1 ? "border-b" : ""
              }`}
              style={{ borderColor: "#F1F5F9" }}
            >
              <span className="text-[13px] font-medium" style={{ color: "#111827" }}>
                {site.name}
              </span>
              <div className="flex items-center gap-6">
                <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
                  {site.workers} workers
                </span>
                <span
                  className="text-[11px] font-medium px-3 py-[4px] rounded-full"
                  style={
                    site.status === "Active"
                      ? { backgroundColor: "#0F9D7A", color: "#fff" }
                      : { backgroundColor: "#F3F4F6", color: "#374151" }
                  }
                >
                  {site.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            NEW: Worker Deployment — Who Went Where
        ════════════════════════════════════════════════════════════════════ */}
        <div
          className="rounded-[12px] border mt-5"
          style={{ backgroundColor: "#fff", borderColor: "#E6EAF0" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-[14px] border-b"
            style={{ borderColor: "#EEF2F6" }}
          >
            <div className="flex items-center gap-2">
              <HardHat size={15} style={{ color: "#0F9D7A" }} strokeWidth={1.5} />
              <span className="text-[14px] font-semibold" style={{ color: "#111827" }}>
                Worker Deployment
              </span>
              <span
                className="text-[11px] font-medium ml-1 px-2 py-[2px] rounded-full"
                style={{ backgroundColor: "#ECFDF5", color: "#065F46" }}
              >
                {selectedMonth}
              </span>
            </div>
            <span className="text-[12px]" style={{ color: "#6B7280" }}>
              {totalWorkers} workers &nbsp;·&nbsp; {deployments.length} sites
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <th className="text-[11px] font-semibold py-3 px-5 w-[220px]" style={{ color: "#6B7280" }}>SITE</th>
                  <th className="text-[11px] font-semibold py-3 px-4 w-[200px]" style={{ color: "#6B7280" }}>SUBCONTRACTOR</th>
                  <th className="text-[11px] font-semibold py-3 px-4 text-center w-[80px]"  style={{ color: "#6B7280" }}>PEOPLE</th>
                  <th className="text-[11px] font-semibold py-3 px-4 text-right w-[100px]"  style={{ color: "#6B7280" }}>TOTAL DAYS</th>
                  <th className="text-[11px] font-semibold py-3 pr-5 text-right w-[40px]"   style={{ color: "#6B7280" }}></th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d) => {
                  const isExpanded = expandedId === d.id;
                  const totalDays  = d.workers.reduce((s, w) => s + w.days, 0);

                  return (
                    <>
                      {/* Site row */}
                      <tr
                        key={d.id}
                        onClick={() => setExpandedId(isExpanded ? null : d.id)}
                        className="cursor-pointer transition-colors duration-150"
                        style={{ borderBottom: "1px solid #F1F5F9" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0FDF9")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <td className="py-[12px] px-5">
                          <div className="flex items-center gap-2">
                            {isExpanded
                              ? <ChevronDown size={13} style={{ color: "#0F9D7A" }} />
                              : <ChevronRight size={13} style={{ color: "#9CA3AF" }} />
                            }
                            <span className="text-[13px] font-medium" style={{ color: "#111827" }}>
                              {d.site}
                            </span>
                          </div>
                        </td>
                        <td className="py-[12px] px-4 text-[13px]" style={{ color: "#374151" }}>
                          {d.subcontractor}
                        </td>
                        <td className="py-[12px] px-4 text-center">
                          <span
                            className="inline-flex items-center justify-center w-[32px] h-[22px] rounded-full text-[12px] font-semibold"
                            style={{ backgroundColor: "#ECFDF5", color: "#0F9D7A" }}
                          >
                            {d.workers.length}
                          </span>
                        </td>
                        <td className="py-[12px] px-4 text-[13px] font-medium text-right" style={{ color: "#374151" }}>
                          {totalDays}
                        </td>
                        <td className="py-[12px] pr-5 text-right">
                          <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
                            {isExpanded ? "▲" : "▼"}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded worker rows */}
                      {isExpanded && d.workers.map((w, wi) => (
                        <tr
                          key={`${d.id}-w-${wi}`}
                          style={{ borderBottom: "1px solid #F1F5F9", backgroundColor: "#F9FFFE" }}
                        >
                          <td className="py-[9px] pl-12 pr-4">
                            <span className="text-[12px]" style={{ color: "#374151" }}>
                              {w.name}
                            </span>
                          </td>
                          <td className="py-[9px] px-4 text-[12px]" style={{ color: "#6B7280" }}>
                            {w.role}
                          </td>
                          <td className="py-[9px] px-4 text-[12px] text-center" style={{ color: "#6B7280" }}>
                            —
                          </td>
                          <td className="py-[9px] px-4 text-[12px] text-right font-medium" style={{ color: "#374151" }}>
                            {w.days} days
                          </td>
                          <td className="py-[9px] pr-5 text-right text-[12px]" style={{ color: "#6B7280" }}>
                            {formatYen(w.days * w.rate)}/mo
                          </td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            NEW: Invoice Summary — How Much to Bill
        ════════════════════════════════════════════════════════════════════ */}
        <div
          className="rounded-[12px] border mt-5"
          style={{ backgroundColor: "#fff", borderColor: "#E6EAF0" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-[14px] border-b"
            style={{ borderColor: "#EEF2F6" }}
          >
            <div className="flex items-center gap-2">
              <Receipt size={15} style={{ color: "#0F9D7A" }} strokeWidth={1.5} />
              <span className="text-[14px] font-semibold" style={{ color: "#111827" }}>
                Invoice Summary
              </span>
            </div>
            <div className="flex items-center gap-4">
              {pendingCount > 0 && (
                <span
                  className="text-[11px] font-medium px-[10px] py-[3px] rounded-full"
                  style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
                >
                  {pendingCount} pending
                </span>
              )}
              <span className="text-[13px] font-semibold" style={{ color: "#0F9D7A" }}>
                Total&nbsp;{formatYen(totalBilling)}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[720px]">
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <th className="text-[11px] font-semibold py-3 px-5 w-[200px]"  style={{ color: "#6B7280" }}>SITE</th>
                  <th className="text-[11px] font-semibold py-3 px-4 w-[180px]"  style={{ color: "#6B7280" }}>SUBCONTRACTOR</th>
                  <th className="text-[11px] font-semibold py-3 px-4 text-center w-[70px]"  style={{ color: "#6B7280" }}>PEOPLE</th>
                  <th className="text-[11px] font-semibold py-3 px-4 text-right w-[130px]"  style={{ color: "#6B7280" }}>AMOUNT</th>
                  <th className="text-[11px] font-semibold py-3 px-4 text-center w-[90px]"  style={{ color: "#6B7280" }}>STATUS</th>
                  <th className="text-[11px] font-semibold py-3 pr-5 text-right w-[130px]"  style={{ color: "#6B7280" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d, i) => {
                  const status  = resolveStatus(d.id, d.invoiceStatus);
                  const amount  = computeBilling(d.workers);
                  const isPending = status === INVOICE_STATUSES.PENDING;

                  return (
                    <tr
                      key={d.id}
                      style={{
                        borderBottom: i !== deployments.length - 1 ? "1px solid #F1F5F9" : "none",
                      }}
                    >
                      <td className="py-[13px] px-5 text-[13px] font-medium" style={{ color: "#111827" }}>
                        {d.site}
                      </td>
                      <td className="py-[13px] px-4 text-[13px]" style={{ color: "#374151" }}>
                        {d.subcontractor}
                      </td>
                      <td className="py-[13px] px-4 text-center text-[13px]" style={{ color: "#374151" }}>
                        {d.workers.length}
                      </td>
                      <td className="py-[13px] px-4 text-right text-[13px] font-semibold" style={{ color: "#111827" }}>
                        {formatYen(amount)}
                      </td>
                      <td className="py-[13px] px-4 text-center">
                        <InvoiceStatusBadge status={status} />
                      </td>
                      <td className="py-[13px] pr-5 text-right">
                        {isPending ? (
                          <button
                            onClick={() => handleSendInvoice(d.id)}
                            className="inline-flex items-center gap-[6px] px-3 py-[5px] rounded-lg text-[12px] font-medium transition-colors duration-150"
                            style={{ backgroundColor: "#0F9D7A", color: "#fff" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0B7A66")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0F9D7A")}
                          >
                            <Send size={12} strokeWidth={2} />
                            Send Invoice
                          </button>
                        ) : (
                          <span className="text-[12px]" style={{ color: "#D1D5DB" }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer totals */}
          <div
            className="flex items-center justify-between px-5 py-[12px] border-t rounded-b-[12px]"
            style={{ borderColor: "#EEF2F6", backgroundColor: "#F9FFFE" }}
          >
            <span className="text-[12px]" style={{ color: "#6B7280" }}>
              {pendingCount > 0
                ? `${pendingCount} invoice${pendingCount > 1 ? "s" : ""} awaiting dispatch`
                : "All invoices dispatched for this month"}
            </span>
            <div className="flex items-center gap-5">
              {pendingAmount > 0 && (
                <span className="text-[12px]" style={{ color: "#92400E" }}>
                  Unbilled&nbsp;
                  <span className="font-semibold">{formatYen(pendingAmount)}</span>
                </span>
              )}
              <span className="text-[12px] font-semibold" style={{ color: "#0F9D7A" }}>
                Total&nbsp;{formatYen(totalBilling)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
