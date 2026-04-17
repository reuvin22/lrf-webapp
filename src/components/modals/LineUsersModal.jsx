import { X, UserPlus, MessageCircleOff } from 'lucide-react';

const LineUsersModal = ({ isOpen, employees = [], onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <MessageCircleOff size={18} className="text-amber-500" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">
              Employees Without LINE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {employees.length === 0 ? (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-6">
              All employees are linked to LINE.
            </p>
          ) : (
            employees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => onSelect(emp)}
                className="cursor-pointer w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 text-sm font-bold text-gray-500 dark:text-gray-400">
                    {(emp.name ?? '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                      {emp.name ?? '—'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {emp.employee_code ?? 'No code'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <UserPlus size={14} />
                  <span>Link LINE</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Click an employee to update their LINE connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default LineUsersModal;
