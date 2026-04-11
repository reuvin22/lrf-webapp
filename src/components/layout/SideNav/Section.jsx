import { FaChevronDown } from "react-icons/fa";

function Section({ title, children, collapsed, open, onClick }) {
  const isOpen = collapsed ? true : open;

  return (
    <div>
      {!collapsed && (
        <div
          onClick={onClick}
          className="cursor-pointer flex items-center justify-between text-xs text-gray-400 mt-4 mb-1 px-2 cursor-pointer hover:text-emerald-400 transition"
        >
          <span>{title}</span>

          <FaChevronDown
            className={`transition-transform duration-300 ${
              open ? 'rotate-180 text-emerald-400' : ''
            }`}
          />
        </div>
      )}

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
}

export default Section;