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
    <div className="flex-1 min-w-0 overflow-x-auto bg-[#F6F8FB] dark:bg-gray-900 transition-colors duration-200">
      <div className="flex items-center gap-2 px-6 py-[14px] border-b border-[#EEF2F6] dark:border-gray-700">
        <PanelLeft size={18} className="text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
        <span className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Admin</span>
      </div>

      <div className="w-full min-w-0 px-4 lg:px-6 py-6">
        <h1 className="text-[22px] font-semibold mb-5 text-gray-900 dark:text-gray-100">
          Attendance List
        </h1>

        <div className="flex items-center gap-3 mb-5">
          {filters.map((f) => (
            <button
              key={f}
              className="flex items-center gap-2 px-4 py-[8px] rounded-lg border text-[13px] font-medium border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {f}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                <path d="M3 4.5L6 7.5L9 4.5" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[1200px] w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-[11px] font-semibold py-3 pr-4 pl-1 w-[100px] text-gray-500 dark:text-gray-400">NAME</th>
                {Array.from({ length: 28 }, (_, i) => (
                  <th key={i} className="text-[11px] font-semibold py-3 text-center w-[30px] text-gray-500 dark:text-gray-400">
                    {i + 1}
                  </th>
                ))}
                <th className="text-[11px] font-semibold py-3 text-right w-[50px] text-gray-500 dark:text-gray-400">DAYS</th>
                <th className="text-[11px] font-semibold py-3 text-right w-[50px] pr-1 text-gray-500 dark:text-gray-400">OT(H)</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="text-[13px] font-medium py-3 pr-4 pl-1 text-gray-900 dark:text-gray-100">{emp.name}</td>
                  {emp.attendance.slice(0, 28).map((s, i) => (
                    <td key={i} className="py-3 text-center">
                      <div className="flex items-center justify-center">
                        <StatusCell status={s} />
                      </div>
                    </td>
                  ))}
                  <td className="text-[13px] font-semibold py-3 text-right text-gray-900 dark:text-gray-100">{emp.days}</td>
                  <td className="text-[13px] font-semibold py-3 text-right pr-1 text-gray-900 dark:text-gray-100">{emp.otHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-5 mt-4 text-[12px] text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><Check size={13} className="text-teal-500" strokeWidth={2.5} /> Entered</span>
          <span className="flex items-center gap-1"><Minus size={13} className="text-red-500" strokeWidth={2.5} /> Missing</span>
          <span className="flex items-center gap-1"><Lock size={11} className="text-amber-500" strokeWidth={2} /> Locked</span>
          <span className="flex items-center gap-1"><span className="text-[12px] font-semibold text-amber-500">H</span> Holiday</span>
        </div>
      </div>
    </div>
  );
}
