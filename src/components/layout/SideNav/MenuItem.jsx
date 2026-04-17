import { useNavigate, useLocation } from "react-router-dom";

function MenuItem({ icon, label, collapsed, to }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <div
      onClick={() => to && navigate(to)}
      title={collapsed ? label : ""}
      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer
      transition-all duration-200
      ${
        isActive
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "text-gray-500 dark:text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
      }`}
    >
      <div className="text-lg">{icon}</div>
      {!collapsed && <span className="text-sm">{label}</span>}
    </div>
  );
}

export default MenuItem;