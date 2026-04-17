// buttonConstants.js

export const BUTTON_VARIANTS = {
  primary: {
    base: 'bg-[#1D69D7] text-white',
    hover: 'hover:bg-blue-700',
    focus: 'focus:ring-[#1D69D7]/30',
  },
  teal: {
    base: 'bg-[#0F9D7A] text-white',
    hover: 'hover:bg-[#0B7A66]',
    focus: 'focus:ring-[#0F9D7A]/30',
  },
  danger: {
    base: 'bg-[#EF4444] text-white',
    hover: 'hover:bg-red-600',
    focus: 'focus:ring-red-300',
  },
  warning: {
    base: 'bg-amber-500 text-white',
    hover: 'hover:bg-amber-600',
    focus: 'focus:ring-amber-300',
  },
  emerald: {
    base: 'bg-emerald-500 text-white',
    hover: 'hover:bg-emerald-600',
    focus: 'focus:ring-emerald-300',
  },
  gray: {
    base: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    hover: 'hover:bg-gray-200 dark:hover:bg-gray-600',
    focus: 'focus:ring-gray-300 dark:focus:ring-gray-600',
  },
};

export const BUTTON_SIZES = {
  sm: {
    padding: 'px-3 py-1.5',
    text: 'text-xs',
    gap: 'gap-1.5',
    iconPad: 'p-1.5',
  },
  md: {
    padding: 'px-4 py-2',
    text: 'text-sm',
    gap: 'gap-2',
    iconPad: 'p-2',
  },
  lg: {
    padding: 'px-5 py-2.5',
    text: 'text-sm',
    gap: 'gap-2',
    iconPad: 'p-2.5',
  },
};

export const BUTTON_ICON_SIZES = {
  sm: 14,
  md: 16,
  lg: 18,
};