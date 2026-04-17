import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  FORM_MODAL_COLS_CLASS,
  FORM_MODAL_SPAN_CLASS,
  FORM_MODAL_MAX_W_CLASS,
  FORM_MODAL_MODE_DEFAULTS,
  FORM_MODAL_INPUT_BASE,
} from '../../constants/ComponentConstants/modals/FormConstants';
import Button from '../Button';

const FieldRenderer = ({ field, value, error, disabled, onChange }) => {
  const isCheckbox = field.type === 'checkbox';
  const label = !isCheckbox && (
    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
      {field.label}
      {field.required && !disabled && (
        <span className="text-[#EF4444] ml-0.5">*</span>
      )}
    </label>
  );

  let control;

  if (field.type === 'textarea') {
    control = (
      <textarea
        name={field.name}
        value={value ?? ''}
        placeholder={disabled ? '' : field.placeholder ?? ''}
        disabled={disabled}
        required={field.required}
        rows={field.rows ?? 3}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={`${FORM_MODAL_INPUT_BASE} resize-none`}
      />
    );

  } else if (field.type === 'select') {
    control = (
      <div className="relative">
        <select
          name={field.name}
          value={value ?? ''}
          disabled={disabled}
          required={field.required}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${FORM_MODAL_INPUT_BASE} appearance-none pr-8`}
        >
          <option value="">
            {field.placeholder ?? `Select ${field.label}`}
          </option>
          {(field.options ?? []).map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
      </div>
    );

  } else if (field.type === 'radio') {
    control = (
      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
        {(field.options ?? []).map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <label
              key={val}
              className={`flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 ${
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              }`}
            >
              <input
                type="radio"
                name={field.name}
                value={val}
                checked={value === val}
                disabled={disabled}
                onChange={() => onChange(field.name, val)}
                className="accent-[#0F9D7A]"
              />
              {lbl}
            </label>
          );
        })}
      </div>
    );

  } else if (isCheckbox) {
    return (
      <div className="flex flex-col justify-end h-full pt-5">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name={field.name}
            checked={!!value}
            disabled={disabled}
            onChange={(e) => onChange(field.name, e.target.checked)}
            className="accent-[#0F9D7A] w-4 h-4 rounded"
          />
          {field.checkboxLabel ?? field.label}
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );

  } else {
    control = (
      <input
        type={field.type ?? 'text'}
        name={field.name}
        value={value ?? ''}
        placeholder={disabled ? '' : field.placeholder ?? ''}
        disabled={disabled}
        required={field.required}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={FORM_MODAL_INPUT_BASE}
      />
    );
  }

  return (
    <div>
      {label}
      {control}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
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

  useEffect(() => {
    if (!isOpen) return;

    const seed = {};
    fields.forEach((f) => {
      seed[f.name] =
        initialValues[f.name] !== undefined
          ? initialValues[f.name]
          : f.type === 'checkbox'
          ? false
          : '';
    });

    setValues(seed);
    setErrors({});
  }, [isOpen, fields, initialValues]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const defaults =
    FORM_MODAL_MODE_DEFAULTS[mode] ?? FORM_MODAL_MODE_DEFAULTS.add;

  const resolvedTitle = title ?? defaults.title;
  const resolvedSubmitLabel =
    submitLabel ?? defaults.submitLabel ?? 'Save';

  const gridCols =
    FORM_MODAL_COLS_CLASS[columns] ?? 'grid-cols-2';

  const maxW =
    FORM_MODAL_MAX_W_CLASS[columns] ?? 'max-w-2xl';

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
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

                return (
                  <div key={field.name} className={span}>
                    <FieldRenderer
                      field={field}
                      value={values[field.name]}
                      error={errors[field.name]}
                      disabled={isView}
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