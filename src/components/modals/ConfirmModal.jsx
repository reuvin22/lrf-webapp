import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Reusable confirmation modal.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen       - Controls visibility.
 * @param {string}   props.title        - Modal heading.
 * @param {string}   props.message      - Body message shown to the user.
 * @param {string}   [props.confirmLabel='Confirm'] - Label for the confirm button.
 * @param {string}   [props.cancelLabel='Cancel']   - Label for the cancel button.
 * @param {Function} props.onConfirm    - Called when the user confirms.
 * @param {Function} props.onCancel     - Called when the user cancels or closes.
 * @param {'danger'|'warning'|'info'} [props.variant='danger'] - Visual variant.
 */
const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger',
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'bg-red-50 text-[#EF4444]',
      confirm: 'bg-[#EF4444] hover:bg-red-600 focus:ring-red-300',
    },
    warning: {
      icon: 'bg-amber-50 text-amber-500',
      confirm: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-300',
    },
    info: {
      icon: 'bg-[#0F9D7A]/10 text-[#0F9D7A]',
      confirm: 'bg-[#0F9D7A] hover:bg-[#0B7A66] focus:ring-[#0F9D7A]/30',
    },
  };

  const styles = variantStyles[variant] ?? variantStyles.danger;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-modal-in">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${styles.icon}`}>
          <AlertTriangle size={24} />
        </div>

        {/* Content */}
        <h2 id="confirm-modal-title" className="text-base font-bold text-gray-800 mb-1">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 ${styles.confirm} cursor-pointer`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
