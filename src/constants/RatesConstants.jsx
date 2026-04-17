export const RATES_COLUMNS = [
  { key: 'role', label: 'Worker Role' },
  { key: 'dailyRate', label: 'Daily Rate' },
  { key: 'overtimeRate', label: 'Overtime Rate' },
  { key: 'effectiveDate', label: 'Effective Date' },
  { key: 'status', label: 'Status', align: 'center', type: 'status' },
];

export const RATES_FIELDS = [
  {
    name: 'role',
    label: 'Worker Role',
    type: 'select',
    required: true,
    options: ['Carpenter', 'Steel Worker', 'Electrician', 'Plumber', 'Scaffolder', 'Concrete Worker', 'Machine Operator', 'Safety Officer'],
    span: 1,
  },
  {
    name: 'dailyRate',
    label: 'Daily Rate',
    type: 'text',
    required: true,
    placeholder: '¥25,000',
    span: 1,
  },
  {
    name: 'overtimeRate',
    label: 'Overtime Rate',
    type: 'text',
    required: false,
    placeholder: '¥35,000',
    span: 1,
  },
  {
    name: 'effectiveDate',
    label: 'Effective Date',
    type: 'date',
    required: true,
    span: 1,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'radio',
    required: true,
    options: ['Active', 'Inactive'],
    span: 1,
  },
];

export const RATES_INITIAL_DATA = [
  { id: 1, role: 'Carpenter', dailyRate: '¥25,000', overtimeRate: '¥35,000', effectiveDate: '2026-01-01', status: 'Active' },
  { id: 2, role: 'Steel Worker', dailyRate: '¥28,000', overtimeRate: '¥38,000', effectiveDate: '2026-01-01', status: 'Active' },
  { id: 3, role: 'Electrician', dailyRate: '¥30,000', overtimeRate: '¥42,000', effectiveDate: '2026-01-01', status: 'Active' },
  { id: 4, role: 'Plumber', dailyRate: '¥27,000', overtimeRate: '¥37,000', effectiveDate: '2026-01-01', status: 'Active' },
  { id: 5, role: 'Scaffolder', dailyRate: '¥22,000', overtimeRate: '¥31,000', effectiveDate: '2026-01-01', status: 'Active' },
];

export const RATE_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];