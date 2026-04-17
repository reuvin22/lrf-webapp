export const WORKER_ROLES = [
  'Carpenter',
  'Steel Worker',
  'Electrician',
  'Plumber',
  'Scaffolder',
  'Concrete Worker',
  'Machine Operator',
  'Safety Officer',
];

export const WORKERS_COLUMNS = [
  { key: 'name', label: 'Full Name' },
  { key: 'kana', label: 'Kana' },
  {
    key: 'role',
    label: 'Role',
    type: 'badge',
    badgeColors: {
      Carpenter: 'bg-amber-100 text-amber-800',
      'Steel Worker': 'bg-blue-100 text-blue-800',
      Electrician: 'bg-yellow-100 text-yellow-800',
      Plumber: 'bg-cyan-100 text-cyan-800',
      Scaffolder: 'bg-purple-100 text-purple-800',
      'Concrete Worker': 'bg-stone-100 text-stone-800',
      'Machine Operator': 'bg-orange-100 text-orange-800',
      'Safety Officer': 'bg-green-100 text-green-800',
    },
  },
  { key: 'subcontractor', label: 'Subcontractor' },
  { key: 'rate', label: 'Daily Rate' },
  { key: 'status', label: 'Status', align: 'center', type: 'status' },
];

export const WORKERS_FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Taro Yamada', span: 1 },
  { name: 'kana', label: 'Kana', type: 'text', required: true, placeholder: 'e.g. YAMADA TARO', span: 1 },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: WORKER_ROLES,
    span: 1,
  },
  {
    name: 'subcontractor',
    label: 'Subcontractor',
    type: 'text',
    required: true,
    placeholder: 'e.g. Tanaka Construction Co.',
    span: 1,
  },
  { name: 'rate', label: 'Daily Rate', type: 'text', required: true, placeholder: '¥25,000', span: 1 },
  {
    name: 'status',
    label: 'Status',
    type: 'radio',
    required: true,
    options: ['Active', 'Resigned'],
    span: 1,
  },
];

export const WORKERS_INITIAL_DATA = [
  { id: 1, name: 'Taro Yamada', kana: 'YAMADA TARO', role: 'Carpenter', subcontractor: 'Tanaka Construction Co.', rate: '¥25,000', status: 'Active' },
  { id: 2, name: 'Hiroshi Ito', kana: 'ITO HIROSHI', role: 'Scaffolder', subcontractor: 'Tanaka Construction Co.', rate: '¥22,000', status: 'Active' },
  { id: 3, name: 'Hanako Sato', kana: 'SATO HANAKO', role: 'Steel Worker', subcontractor: 'Kato Building Services', rate: '¥28,000', status: 'Active' },
];

export const WORKER_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Resigned', label: 'Resigned' },
];