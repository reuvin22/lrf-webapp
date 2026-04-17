export const SUBCONTRACTORS_COLUMNS = [
  { key: 'name', label: 'Company Name' },
  { key: 'kana', label: 'Kana' },
  { key: 'contact', label: 'Contact Person' },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status', align: 'center', type: 'status' },
];

export const SUBCONTRACTORS_FIELDS = [
  {
    name: 'name',
    label: 'Company Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. Tanaka Construction Co.',
    span: 1,
  },
  {
    name: 'kana',
    label: 'Kana',
    type: 'text',
    required: true,
    placeholder: 'e.g. TANAKA KENSETSU',
    span: 1,
  },
  {
    name: 'contact',
    label: 'Contact Person',
    type: 'text',
    required: false,
    placeholder: 'e.g. Kenji Tanaka',
    span: 1,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    required: false,
    placeholder: '03-0000-0000',
    span: 1,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: false,
    placeholder: 'contact@example.com',
    span: 2,
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

export const SUBCONTRACTORS_INITIAL_DATA = [
  {
    id: 1,
    name: 'Tanaka Construction Co.',
    kana: 'TANAKA KENSETSU',
    contact: 'Kenji Tanaka',
    phone: '03-1234-5678',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Kato Building Services',
    kana: 'KATO BUILDING',
    contact: 'Hiroshi Kato',
    phone: '06-2345-6789',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Matsumoto Works',
    kana: 'MATSUMOTO WORKS',
    contact: 'Yuki Matsumoto',
    phone: '045-3456-789',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Hayashi Contractors',
    kana: 'HAYASHI CONT',
    contact: 'Daisuke Hayashi',
    phone: '052-4567-890',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Inoue Engineering',
    kana: 'INOUE ENG',
    contact: 'Takeshi Inoue',
    phone: '011-5678-901',
    status: 'Inactive',
  },
];

export const SUBCONTRACTOR_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];