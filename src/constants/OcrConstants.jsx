import { formatDate } from '../utils/dateUtils';

export const OCR_STATUS_OPTIONS = [
  { value: 'PENDING',    label: 'Pending'    },
  { value: 'COMPLETED',  label: 'Completed'  },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'ERROR',      label: 'Error'      },
];

const resolveName = (val, nameKey) =>
  typeof val === 'object' && val !== null ? (val[nameKey] ?? val.name ?? '—') : (val ?? '—');

export const OCR_COLUMNS = [
  {
    key: 'row_number',
    label: '#',
    render: (v) => v ?? '—',
  },
  {
    key: 'uploaded_at',
    label: 'Date',
    render: (v) => formatDate(v),
  },
  {
    key: 'category',
    label: 'Category',
    render: (v) => resolveName(v, 'category_name'),
  },
  {
    key: 'uploader_name',
    label: 'Uploader',
    render: (v) => v ?? '—',
  },
  {
    key: 'site',
    label: 'Site',
    render: (v) => resolveName(v, 'site_name'),
  },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    render: (v) => {
      const map = {
        PENDING:    'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
        COMPLETED:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        PROCESSING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
        ERROR:      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
      };
      const cls = map[String(v ?? '').toUpperCase()] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-bold ${cls}`}>{v ?? '—'}</span>
      );
    },
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (v) => v != null ? `¥${Number(v).toLocaleString()}` : '—',
  },
];
