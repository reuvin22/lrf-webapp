import { PanelLeft, Check, Minus, Lock } from "lucide-react";

const employees = [
  {
    name: "Yamada T.",
    days: 20,
    otHours: 15.5,
    attendance: [
      "entered","entered","missing","entered","entered","entered","entered","entered","missing","entered",
      "entered","entered","entered","entered","entered","missing","entered","entered","entered","entered",
      "locked","entered","missing","entered","entered","entered","entered","entered","empty","empty",
    ],
  },
  {
    name: "Sato H.",
    days: 19,
    otHours: 12,
    attendance: [
      "entered","entered","entered","missing","entered","entered","entered","entered","missing","entered",
      "entered","entered","entered","entered","entered","entered","entered","entered","entered","entered",
      "missing","entered","entered","missing","entered","entered","entered","entered","empty","empty",
    ],
  },
  {
    name: "Tanaka I.",
    days: 21,
    otHours: 20,
    attendance: [
      "entered","entered","entered","entered","entered","entered","missing","entered","entered","entered",
      "entered","entered","entered","missing","entered","entered","missing","entered","entered","entered",
      "entered","entered","missing","entered","entered","entered","entered","missing","empty","empty",
    ],
  },
  {
    name: "Suzuki K.",
    days: 20,
    otHours: 8,
    attendance: [
      "entered","holiday","entered","entered","entered","entered","entered","holiday","entered","entered",
      "entered","entered","entered","entered","holiday","entered","entered","entered","entered","entered",
      "holiday","entered","entered","entered","entered","entered","entered","entered","empty","empty",
    ],
  },
];

const StatusCell = ({ status }) => {
  switch (status) {
    case "entered":
      return <Check size={14} className="text-teal-500" strokeWidth={2.5} />;
    case "missing":
      return <Minus size={14} className="text-red-500" strokeWidth={2.5} />;
    case "locked":
      return <Lock size={12} className="text-amber-500" strokeWidth={2} />;
    case "holiday":
      return <span className="text-[12px] font-semibold text-amber-500">H</span>;
    default:
      return null;
  }
};

const filters = ["Feb 2026", "All Employees", "All Sites", "All Status"];

export default function AttendanceList() {
  return (
    <div className="flex-1 min-w-0 overflow-x-auto" style={{ backgroundColor: "#F6F8FB" }}>
      <div className="flex items-center gap-2 px-6 py-[14px] border-b" style={{ borderColor: "#EEF2F6" }}>
        <PanelLeft size={18} style={{ color: "#6B7280" }} strokeWidth={1.5} />
        <span className="text-[13px] font-medium" style={{ color: "#6B7280" }}>Admin</span>
      </div>

      <div className="w-full min-w-0 px-4 lg:px-6 py-6">
        <h1 className="text-[22px] font-semibold mb-5" style={{ color: "#111827" }}>
          Attendance List
        </h1>

        <div className="flex items-center gap-3 mb-5">
          {filters.map((f) => (
            <button
              key={f}
              className="flex items-center gap-2 px-4 py-[8px] rounded-lg border text-[13px] font-medium"
              style={{ borderColor: "#E6EAF0", backgroundColor: "#fff", color: "#374151" }}
            >
              {f}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[1200px] w-full text-left">
            <thead>
              <tr className="border-b" style={{ borderColor: "#E6EAF0" }}>
                <th className="text-[11px] font-semibold py-3 pr-4 pl-1 w-[100px]" style={{ color: "#6B7280" }}>NAME</th>
                {Array.from({ length: 28 }, (_, i) => (
                  <th key={i} className="text-[11px] font-semibold py-3 text-center w-[30px]" style={{ color: "#6B7280" }}>
                    {i + 1}
                  </th>
                ))}
                <th className="text-[11px] font-semibold py-3 text-right w-[50px]" style={{ color: "#6B7280" }}>DAYS</th>
                <th className="text-[11px] font-semibold py-3 text-right w-[50px] pr-1" style={{ color: "#6B7280" }}>OT(H)</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr key={idx} className="border-b" style={{ borderColor: "#F1F5F9" }}>
                  <td className="text-[13px] font-medium py-3 pr-4 pl-1" style={{ color: "#111827" }}>{emp.name}</td>
                  {emp.attendance.slice(0, 28).map((s, i) => (
                    <td key={i} className="py-3 text-center">
                      <div className="flex items-center justify-center">
                        <StatusCell status={s} />
                      </div>
                    </td>
                  ))}
                  <td className="text-[13px] font-semibold py-3 text-right" style={{ color: "#111827" }}>{emp.days}</td>
                  <td className="text-[13px] font-semibold py-3 text-right pr-1" style={{ color: "#111827" }}>{emp.otHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-4 text-[12px]" style={{ color: "#6B7280" }}>
          <span className="flex items-center gap-1"><Check size={13} className="text-teal-500" strokeWidth={2.5} /> Entered</span>
          <span className="flex items-center gap-1"><Minus size={13} className="text-red-500" strokeWidth={2.5} /> Missing</span>
          <span className="flex items-center gap-1"><Lock size={11} className="text-amber-500" strokeWidth={2} /> Locked</span>
          <span className="flex items-center gap-1"><span className="text-[12px] font-semibold text-amber-500">H</span> Holiday</span>
        </div>
      </div>
    </div>
  );
}