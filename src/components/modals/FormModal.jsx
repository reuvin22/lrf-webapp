import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Maps column count to Tailwind grid class.
 * Defined as a static object so Tailwind can scan all class names.
 */
const COLS_CLASS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

/**
 * Maps span value to Tailwind col-span class.
 */
const SPAN_CLASS = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
};

/**
 * Maps column count to modal max-width class.
 */
const MAX_W_CLASS = {
  1: 'max-w-md',
  2: 'max-w-2xl',
  3: 'max-w-4xl',
  4: 'max-w-5xl',
};

/** Default title and submit label per mode. */
const MODE_DEFAULTS = {
  add:  { title: 'Add New',      submitLabel: 'Save'         },
  edit: { title: 'Edit Details', submitLabel: 'Save Changes' },
  view: { title: 'View Details', submitLabel: null           },
};

const INPUT_BASE =
  'w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl ' +
  'focus:outline-none focus:ring-2 focus:ring-[#0F9D7A]/30 focus:border-[#0F9D7A] ' +
  'transition-colors disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed';

// ---------------------------------------------------------------------------
// Internal field renderer
// ---------------------------------------------------------------------------

/**
 * Renders a single form field based on its config.
 *
 * @param {Object}   props
 * @param {Object}   props.field    - Field config object.
 * @param {*}        props.value    - Current field value.
 * @param {string}   props.error    - Validation error message (or undefined).
 * @param {boolean}  props.disabled - True when in view mode.
 * @param {Function} props.onChange - (name, value) => void
 */
const FieldRenderer = ({ field, value, error, disabled, onChange }) => {
  const isCheckbox = field.type === 'checkbox';

  const label = !isCheckbox && (
    <label className="block text-xs font-medium text-gray-600 mb-1.5">
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
        placeholder={disabled ? '' : (field.placeholder ?? '')}
        disabled={disabled}
        required={field.required}
        rows={field.rows ?? 3}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={`${INPUT_BASE} resize-none`}
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
          className={`${INPUT_BASE} appearance-none pr-8`}
        >
          <option value="" disabled>
            {field.placeholder ?? `Select ${field.label}`}
          </option>
          {(field.options ?? []).map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        {!disabled && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
        )}
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
              className={`flex items-center gap-2 text-sm text-gray-700 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
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
        <label
          className={`flex items-center gap-2 text-sm text-gray-700 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          <input
            type="checkbox"
            name={field.name}
            checked={!!value}
            disabled={disabled}
            onChange={(e) => onChange(field.name, e.target.checked)}
            className="accent-[#0F9D7A] w-4 h-4 rounded"
          />
          {field.checkboxLabel ?? field.label}
          {field.required && !disabled && (
            <span className="text-[#EF4444]">*</span>
          )}
        </label>
        {error && <p className="mt-1 text-xs text-[#EF4444]">{error}</p>}
      </div>
    );

  } else {
    control = (
      <input
        type={field.type ?? 'text'}
        name={field.name}
        value={value ?? ''}
        placeholder={disabled ? '' : (field.placeholder ?? '')}
        disabled={disabled}
        required={field.required}
        min={field.min}
        max={field.max}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={INPUT_BASE}
      />
    );
  }

  return (
    <div>
      {label}
      {control}
      {error && <p className="mt-1 text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// FormModal
// ---------------------------------------------------------------------------

/**
 * Reusable form modal for add, edit, and view operations.
 * The field list and grid layout are fully configurable via props.
 *
 * @param {Object}              props
 * @param {boolean}             props.isOpen           - Controls visibility.
 * @param {'add'|'edit'|'view'} [props.mode='add']     - Determines behaviour and default labels.
 * @param {string}              [props.title]           - Heading (falls back to mode default).
 * @param {Array<FieldConfig>}  props.fields            - Array of field config objects (see below).
 * @param {1|2|3|4}             [props.columns=2]       - Grid column count for the form layout.
 * @param {Object}              [props.initialValues]   - Pre-filled values used in edit / view mode.
 * @param {Function}            props.onSubmit          - Called with form values object on submit.
 * @param {Function}            props.onClose           - Called when the modal is dismissed.
 * @param {string}              [props.submitLabel]     - Overrides the default submit button label.
 *
 * FieldConfig shape:
 * @typedef {Object} FieldConfig
 * @property {string}  name           - Key used in form values object.
 * @property {string}  label          - Human-readable field label.
 * @property {'text'|'number'|'email'|'password'|'tel'|'date'|'textarea'|'select'|'radio'|'checkbox'} [type='text']
 * @property {string}  [placeholder]  - Input placeholder text.
 * @property {boolean} [required]     - Marks the field as required.
 * @property {number}  [span=1]       - How many grid columns this field spans (1–4).
 * @property {Array}   [options]      - Options for select / radio (string[] or {label, value}[]).
 * @property {number}  [min]          - Minimum value for number inputs.
 * @property {number}  [max]          - Maximum value for number inputs.
 * @property {number}  [rows=3]       - Row count for textarea inputs.
 * @property {string}  [checkboxLabel] - Inline label shown next to a checkbox (falls back to label).
 */
const FormModal = ({
  isOpen,
  mode = 'add',
  title,
  fields = [],
  columns = 2,
  initialValues = {},
  onSubmit,
  onClose,
  submitLabel,
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  // Re-seed form values whenever the modal opens or initialValues change.
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
  }, [isOpen]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const defaults = MODE_DEFAULTS[mode] ?? MODE_DEFAULTS.add;
  const resolvedTitle = title ?? defaults.title;
  const resolvedSubmitLabel = submitLabel ?? defaults.submitLabel ?? 'Save';
  const gridCols = COLS_CLASS[columns] ?? 'grid-cols-2';
  const maxW = MAX_W_CLASS[columns] ?? 'max-w-2xl';

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const next = {};
    fields.forEach((f) => {
      const val = values[f.name];
      const empty = val === '' || val === null || val === undefined;
      if (f.required && empty) {
        next[f.name] = `${f.label} is required.`;
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) { onClose(); return; }
    if (validate()) onSubmit(values);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className={`relative w-full ${maxW} bg-white rounded-2xl shadow-xl border border-gray-100 animate-modal-in flex flex-col max-h-[90vh]`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 id="form-modal-title" className="text-base font-bold text-gray-800">
            {resolvedTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col min-h-0">
          <div className="px-6 py-5 overflow-y-auto flex-1">
            <div className={`grid gap-x-4 gap-y-5 ${gridCols}`}>
              {fields.map((field) => {
                const rawSpan = field.span ?? 1;
                const clampedSpan = Math.min(rawSpan, columns);
                const spanCls = SPAN_CLASS[clampedSpan] ?? 'col-span-1';
                return (
                  <div key={field.name} className={spanCls}>
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

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60 shrink-0 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {isView ? 'Close' : 'Cancel'}
            </button>
            {!isView && (
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#0F9D7A] hover:bg-[#0B7A66] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F9D7A]/30"
              >
                {resolvedSubmitLabel}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
