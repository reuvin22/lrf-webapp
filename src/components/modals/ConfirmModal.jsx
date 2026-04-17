import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../Button';

const VARIANT_BUTTON_MAP = {
  danger:  'danger',
  warning: 'warning',
  info:    'teal',
};

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
  variant = 'danger',
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger:  { icon: 'bg-red-50 text-[#EF4444]'         },
    warning: { icon: 'bg-amber-50 text-amber-500'        },
    info:    { icon: 'bg-[#0F9D7A]/10 text-[#0F9D7A]'   },
  };

  const styles        = variantStyles[variant] ?? variantStyles.danger;
  const buttonVariant = VARIANT_BUTTON_MAP[variant]  ?? 'danger';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
        onClick={!loading ? onCancel : undefined}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 animate-modal-in">
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${styles.icon}`}>
          <AlertTriangle size={24} />
        </div>

        <h2 id="confirm-modal-title" className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{message}</p>

        <div className="flex gap-3 justify-end">
          <Button
            variant="gray"
            disabled={loading}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>

          <Button
            variant={buttonVariant}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
