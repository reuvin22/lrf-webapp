import { formatDate } from '../utils/dateUtils';

// Converts "QUASI_DELEGATION" → "Quasi Delegation"
const formatEnumLabel = (value) =>
  value
    ? value
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
    : '—';

export const SITES_COLUMNS = [
  { key: 'site_code',   label: 'Site Code' },
  { key: 'site_name',   label: 'Site Name' },
  { key: 'client_name', label: 'Client' },
  {
    key: 'contract_type',
    label: 'Contract Type',
    render: (value) => (
      <span
        className={`px-3 py-1 rounded-md text-xs font-bold text-white ${
          value === 'QUASI_DELEGATION' ? 'bg-[#1D69D7]' : 'bg-gray-400'
        }`}
      >
        {formatEnumLabel(value)}
      </span>
    ),
  },
  { key: 'start_date', label: 'Start Date', render: (value) => formatDate(value) },
  { key: 'end_date',   label: 'End Date',   render: (value) => formatDate(value) },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    render: (value) => {
      const colors =
        value === 'COMPLETED'   ? 'bg-[#1D69D7]' :
        value === 'IN_PROGRESS' ? 'bg-[#0F9D7A]' :
                                  'bg-gray-400';
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-bold text-white ${colors}`}>
          {formatEnumLabel(value)}
        </span>
      );
    },
  },
];

export const SITES_FIELDS = [
  {
    name: 'site_code',
    label: 'Site Code',
    type: 'text',
    required: true,
    placeholder: 'e.g. SJK-001',
    span: 1,
  },
  {
    name: 'site_name',
    label: 'Site Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. Shinjuku Tower A',
    span: 1,
  },
  {
    name: 'client_name',
    label: 'Client Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. Yamada Construction Co.',
    span: 1,
  },
  {
    name: 'contract_type',
    label: 'Contract Type',
    type: 'select',
    required: true,
    placeholder: 'Select Contract Type',
    options: [
      { value: 'QUASI_DELEGATION', label: 'Quasi Delegation' },
      { value: 'FIXED_PRICE',      label: 'Fixed Price' },
    ],
    span: 1,
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    required: true,
    placeholder: 'e.g. 1-1 Shinjuku, Tokyo',
    span: 2,
  },
  {
    name: 'start_date',
    label: 'Start Date',
    type: 'date',
    required: true,
    span: 1,
  },
  {
    name: 'end_date',
    label: 'End Date',
    type: 'date',
    required: false,
    span: 1,
  },
  {
    name: 'contract_amount',
    label: 'Contract Amount',
    type: 'number',
    required: true,
    placeholder: 'e.g. 5000000',
    span: 1,
  },
  {
    name: 'dotto_genka_code',
    label: 'Dotto Genka Code',
    type: 'text',
    required: false,
    placeholder: 'e.g. DG-0001',
    span: 1,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    placeholder: 'Select Status',
    options: [
      { value: 'PREPARING',   label: 'Preparing' },
      { value: 'IN_PROGRESS', label: 'In Progress' },
      { value: 'COMPLETED',   label: 'Completed' },
    ],
    span: 2,
  },
];

export const SITE_STATUS_OPTIONS = [
  { value: 'PREPARING',   label: 'Preparing' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED',   label: 'Completed' },
];
