export const WORKERS_COLUMNS = [
  { key: 'name', label: 'Full Name' },
  { key: 'name_kana', label: 'Kana' },
  { key: 'subcontractor', label: 'Subcontractor' },
  { key: 'status', label: 'Status', align: 'center', type: 'status' },
];

export const WORKERS_FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Taro Yamada', span: 1 },
  { name: 'name_kana', label: 'Kana', type: 'text', required: true, placeholder: 'e.g. YAMADA TARO', span: 1 },
  { name: 'status', label: 'Status', type: 'radio', required: true, options: ['ACTIVE', 'RESIGNED'], span: 1 }
];

export const WORKERS_INITIAL_DATA = [
  { id: 1, name: 'Taro Yamada', kana: 'YAMADA TARO', role: 'Carpenter', subcontractor: 'Tanaka Construction Co.', rate: '¥25,000', status: 'Active' },
  { id: 2, name: 'Hiroshi Ito', kana: 'ITO HIROSHI', role: 'Scaffolder', subcontractor: 'Tanaka Construction Co.', rate: '¥22,000', status: 'Active' },
  { id: 3, name: 'Hanako Sato', kana: 'SATO HANAKO', role: 'Steel Worker', subcontractor: 'Kato Building Services', rate: '¥28,000', status: 'Active' },
];

export const WORKER_STATUS_OPTIONS = [
  { value: 'status', label: 'Active' },
  { value: 'status', label: 'Resigned' },
];