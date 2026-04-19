import React from 'react';
import { FORM_MODAL_INPUT_BASE } from '../../constants/ComponentConstants/modals/FormConstants';
import AutoCompleteField from './AutoCompleteField';

const toDateInputValue = (v) => {
  if (!v) return '';
  const match = String(v).match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  const d = new Date(v);
  if (isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const FieldRenderer = ({ field, value, allValues, sourceValues, error, disabled, onChange }) => {
  const resolvedField = {
    ...field,
    options: typeof field.options === 'function'
      ? field.options(allValues ?? {})
      : (field.options ?? []),
  };
  const isCheckbox = resolvedField.type === 'checkbox';
  const label = !isCheckbox && (
    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
      {resolvedField.label}
      {resolvedField.required && !disabled && (
        <span className="text-[#EF4444] ml-0.5">*</span>
      )}
    </label>
  );

  let control;

  if (resolvedField.type === 'textarea') {
    control = (
      <textarea
        name={resolvedField.name}
        value={value ?? ''}
        placeholder={disabled ? '' : resolvedField.placeholder ?? ''}
        disabled={disabled}
        required={resolvedField.required}
        rows={resolvedField.rows ?? 3}
        onChange={(e) => onChange(resolvedField.name, e.target.value)}
        className={`${FORM_MODAL_INPUT_BASE} resize-none`}
      />
    );

  } else if (resolvedField.type === 'select') {
    control = (
      <div className="relative">
        <select
          name={resolvedField.name}
          value={value ?? ''}
          disabled={disabled}
          required={resolvedField.required}
          onChange={(e) => onChange(resolvedField.name, e.target.value)}
          className={`${FORM_MODAL_INPUT_BASE} appearance-none pr-8`}
        >
          <option value="">
            {resolvedField.placeholder ?? `Select ${resolvedField.label}`}
          </option>
          {resolvedField.options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
      </div>
    );

  } else if (resolvedField.type === 'radio') {
    if (disabled) {
      const matched = resolvedField.options.find((opt) => {
        const val = typeof opt === 'object' ? opt.value : opt;
        return val === value;
      });
      const display = matched
        ? (typeof matched === 'object' ? matched.label : matched)
        : (value ?? '—');

      control = (
        <div className="pt-1">
          <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {display}
          </span>
        </div>
      );
    } else {
      control = (
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          {resolvedField.options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <label
                key={val}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <input
                  type="radio"
                  name={resolvedField.name}
                  value={val}
                  checked={value === val}
                  onChange={() => onChange(resolvedField.name, val)}
                  className="accent-[#0F9D7A]"
                />
                {lbl}
              </label>
            );
          })}
        </div>
      );
    }

  } else if (resolvedField.type === 'autocomplete') {
    const displayValue = resolvedField.displayKey
      ? (sourceValues?.[resolvedField.displayKey] ?? allValues?.[resolvedField.displayKey] ?? '')
      : '';
    return (
      <div>
        {label}
        <AutoCompleteField
          field={resolvedField}
          value={value}
          displayValue={displayValue}
          disabled={disabled}
          onChange={onChange}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );

  } else if (isCheckbox) {
    if (disabled) {
      return (
        <div className="flex flex-col justify-end h-full pt-5">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            {resolvedField.checkboxLabel ?? resolvedField.label}
          </label>
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {value ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col justify-end h-full pt-5">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name={resolvedField.name}
            checked={!!value}
            disabled={disabled}
            onChange={(e) => onChange(resolvedField.name, e.target.checked)}
            className="accent-[#0F9D7A] w-4 h-4 rounded"
          />
          {resolvedField.checkboxLabel ?? resolvedField.label}
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );

  } else {
    const inputValue = resolvedField.type === 'date' ? toDateInputValue(value) : (value ?? '');
    control = (
      <input
        type={resolvedField.type ?? 'text'}
        name={resolvedField.name}
        value={inputValue}
        placeholder={disabled ? '' : resolvedField.placeholder ?? ''}
        disabled={disabled}
        required={resolvedField.required}
        onChange={(e) => onChange(resolvedField.name, e.target.value)}
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

export default FieldRenderer;
