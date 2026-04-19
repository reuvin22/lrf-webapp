import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  FORM_MODAL_COLS_CLASS,
  FORM_MODAL_SPAN_CLASS,
  FORM_MODAL_MAX_W_CLASS,
  FORM_MODAL_MODE_DEFAULTS,
} from '../../constants/ComponentConstants/modals/FormConstants';
import Button from '../Button';
import FieldRenderer from './FieldRenderer';

const toDateInputValue = (v) => {
  if (!v) return '';
  const match = String(v).match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  const d = new Date(v);
  if (isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const FormModal = ({
  isOpen,
  mode = 'add',
  title,
  fields = [],
  columns = 2,
  initialValues = {},
  submitting = false,
  onSubmit,
  onClose,
  submitLabel,
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const justOpened = isOpen && !wasOpenRef.current;
    wasOpenRef.current = isOpen;

    if (!justOpened) return;

    const seed = {};
    fields.forEach((f) => {
      const raw = initialValues[f.name];
      seed[f.name] =
        raw !== undefined
          ? f.type === 'date' ? toDateInputValue(raw) : raw
          : f.type === 'checkbox'
          ? false
          : '';
    });

    setValues(seed);
    setErrors({});
  }, [isOpen, fields, initialValues]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const defaults = FORM_MODAL_MODE_DEFAULTS[mode] ?? FORM_MODAL_MODE_DEFAULTS.add;

  const resolvedTitle = title ?? defaults.title;
  const resolvedSubmitLabel = submitLabel ?? defaults.submitLabel ?? 'Save';

  const gridCols = FORM_MODAL_COLS_CLASS[columns] ?? 'grid-cols-2';
  const maxW = FORM_MODAL_MAX_W_CLASS[columns] ?? 'max-w-2xl';

  const handleChange = (name, value) => {
    const field = fields.find((f) => f.name === name);
    const updates = { [name]: value };
    if (field?.clearOnChange) {
      field.clearOnChange.forEach((dep) => { updates[dep] = ''; });
    }
    setValues((prev) => ({ ...prev, ...updates }));
    const clearedErrors = { ...(field?.clearOnChange ?? []).reduce((acc, dep) => ({ ...acc, [dep]: null }), {}) };
    if (errors[name]) clearedErrors[name] = null;
    if (Object.keys(clearedErrors).length) {
      setErrors((prev) => ({ ...prev, ...clearedErrors }));
    }
  };

  const validate = () => {
    const next = {};
    fields.forEach((f) => {
      const val = values[f.name];
      if (f.required && (val === '' || val === null || val === undefined)) {
        next[f.name] = `${f.label} is required.`;
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return onClose?.();
    if (validate()) onSubmit?.(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${maxW} bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between px-6 py-4 border-b dark:border-gray-700">
          <h2 className="font-bold dark:text-gray-100">{resolvedTitle}</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="px-6 py-5 overflow-y-auto flex-1">
            <div className={`grid gap-4 ${gridCols}`}>
              {fields.map((field) => {
                const span =
                  FORM_MODAL_SPAN_CLASS[
                    Math.min(field.span ?? 1, columns)
                  ] ?? 'col-span-1';

                const fieldDisabled = isView || (mode === 'edit' && !!field.editDisabled);

                return (
                  <div key={field.name} className={span}>
                    <FieldRenderer
                      field={field}
                      value={values[field.name]}
                      allValues={values}
                      sourceValues={initialValues}
                      error={errors[field.name]}
                      disabled={fieldDisabled}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-700">
            <Button
              type="button"
              variant="gray"
              onClick={onClose}
            >
              {isView ? 'Close' : 'Cancel'}
            </Button>

            {!isView && (
              <Button
                type="submit"
                variant="teal"
                loading={submitting}
                disabled={submitting}
              >
                {resolvedSubmitLabel}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
