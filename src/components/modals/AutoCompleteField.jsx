import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FORM_MODAL_INPUT_BASE } from '../../constants/ComponentConstants/modals/FormConstants';

const isSep = (o) => typeof o === 'object' && o !== null && !!o._separator;

const AutoCompleteField = ({ field, value, displayValue, disabled, onChange }) => {
  const options  = field.options ?? [];
  const valueKey = field.valueKey ?? 'value';
  const labelKey = field.labelKey ?? 'label';
  const inputRef = useRef(null);

  const getVal = (o) => (typeof o === 'object' && o !== null ? o[valueKey] : o);
  const getLbl = (o) => (typeof o === 'object' && o !== null ? o[labelKey] : o);

  const findLabel = (val, opts = options) => {
    if (val === '' || val === null || val === undefined) return '';
    const opt = opts.find((o) => !isSep(o) && String(getVal(o)) === String(val));
    return opt ? String(getLbl(opt) ?? '') : '';
  };

  const resolveQuery = (val, opts) => findLabel(val, opts) || displayValue || '';

  const [query, setQuery]         = useState(() => resolveQuery(value, options));
  const [open, setOpen]           = useState(false);
  const [inputRect, setInputRect] = useState(null);

  useEffect(() => {
    setQuery(resolveQuery(value, options));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, displayValue]);

  const filtered = (() => {
    if (!query) return options;
    const result = [];
    let pendingSep = null;
    for (const o of options) {
      if (isSep(o)) {
        pendingSep = o;
      } else {
        const lbl = String(getLbl(o) ?? '');
        if (lbl.toLowerCase().includes(query.toLowerCase())) {
          if (pendingSep) { result.push(pendingSep); pendingSep = null; }
          result.push(o);
        }
      }
    }
    return result;
  })();

  const handleFocus = () => {
    if (inputRef.current) setInputRect(inputRef.current.getBoundingClientRect());
    setOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  if (disabled) {
    return (
      <span className="text-sm text-gray-800 dark:text-gray-200">
        {findLabel(value, options) || displayValue || '—'}
      </span>
    );
  }

  const dropdown =
    open && inputRect
      ? createPortal(
          <ul
            style={{
              position: 'fixed',
              top:   inputRect.bottom + 4,
              left:  inputRect.left,
              width: inputRect.width,
              zIndex: 9999,
            }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500 select-none">
                No {field.label?.toLowerCase() ?? 'options'} available
              </li>
            ) : filtered.map((opt, idx) => {
              if (isSep(opt)) {
                return (
                  <li
                    key={`sep-${idx}`}
                    className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/60 select-none"
                  >
                    {opt.label}
                  </li>
                );
              }
              const val = getVal(opt);
              const lbl = getLbl(opt);
              return (
                <li
                  key={val}
                  onMouseDown={() => {
                    onChange(field.name, val);
                    setQuery(String(lbl ?? ''));
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  {lbl}
                </li>
              );
            })}
          </ul>,
          document.body,
        )
      : null;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder={field.placeholder ?? `Search ${field.label}...`}
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value);
          if (!e.target.value) onChange(field.name, '');
          setOpen(true);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={FORM_MODAL_INPUT_BASE}
      />
      {dropdown}
    </div>
  );
};

export default AutoCompleteField;
