function MenuItem({ icon, label, collapsed, active }) {
  return (
    <div
      title={collapsed ? label : ""}
      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer
      transition-all duration-200
      ${
        active
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400'
      }`}
    >
      <div className="text-lg">{icon}</div>
      {!collapsed && <span className="text-sm">{label}</span>}
    </div>
  );
}

export default MenuItem;