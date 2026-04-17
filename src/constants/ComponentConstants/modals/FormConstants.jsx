// formModalConstants.js

export const FORM_MODAL_COLS_CLASS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export const FORM_MODAL_SPAN_CLASS = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
};

export const FORM_MODAL_MAX_W_CLASS = {
  1: 'max-w-md',
  2: 'max-w-2xl',
  3: 'max-w-4xl',
  4: 'max-w-5xl',
};

export const FORM_MODAL_MODE_DEFAULTS = {
  add:  { title: 'Add New',      submitLabel: 'Save' },
  edit: { title: 'Edit Details', submitLabel: 'Save Changes' },
  view: { title: 'View Details', submitLabel: null },
};

export const FORM_MODAL_INPUT_BASE =
  'w-full px-3 py-2 text-sm text-gray-800 dark:text-gray-100 ' +
  'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl ' +
  'focus:outline-none focus:ring-2 focus:ring-[#0F9D7A]/30 focus:border-[#0F9D7A] ' +
  'transition-colors disabled:bg-gray-50 dark:disabled:bg-gray-600 ' +
  'disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed';