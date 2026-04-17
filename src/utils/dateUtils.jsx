/**
 * Parse any date-like value into a Date object.
 * Handles: ISO strings, plain YYYY-MM-DD strings, Date objects, timestamps.
 * Returns null if the value is empty or unparseable.
 */
const parseDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value) ? null : value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * Format a date value to a readable string.
 *
 * @param {string|Date|number} value  - Any date-like value
 * @param {Intl.DateTimeFormatOptions} options - Intl.DateTimeFormat options
 * @param {string} locale             - BCP 47 locale tag (default: 'en-GB')
 * @param {string} fallback           - Returned when value is empty/invalid
 * @returns {string}
 *
 * @example
 * formatDate('2026-04-18T00:00:00.000000Z')   // '18 Apr 2026'
 * formatDate('2020-04-01')                     // '01 Apr 2020'
 * formatDate(null)                             // '—'
 * formatDate('2026-04-18', { year: 'numeric', month: 'long', day: 'numeric' })
 *                                              // 'April 18, 2026'
 */
export const formatDate = (
  value,
  options = { month: 'short', day: '2-digit', year: 'numeric' },
  locale = 'en-US',
  fallback = '—'
) => {
  const d = parseDate(value);
  if (!d) return fallback;
  return new Intl.DateTimeFormat(locale, options).format(d);
};

/**
 * Commonly used format presets.
 *
 * @example
 * formatDate(value, DATE_FORMATS.short)    // '18/04/2026'
 * formatDate(value, DATE_FORMATS.medium)   // '18 Apr 2026'  (default)
 * formatDate(value, DATE_FORMATS.long)     // 'April 18, 2026'
 * formatDate(value, DATE_FORMATS.full)     // 'Saturday, April 18, 2026'
 * formatDate(value, DATE_FORMATS.yearMonth)// 'April 2026'
 */
export const DATE_FORMATS = {
  short:     { year: 'numeric', month: '2-digit', day: '2-digit' },
  medium:    { year: 'numeric', month: 'short',   day: '2-digit' },
  long:      { year: 'numeric', month: 'long',    day: 'numeric' },
  full:      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  yearMonth: { year: 'numeric', month: 'long' },
};
