export const CATEGORY_COLUMNS = [
  { key: 'name', label: 'Category Name' },
  { key: 'code', label: 'Code' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', align: 'center', type: 'status' },
];

export const CATEGORY_FIELDS = [
  {
    name: 'name',
    label: 'Category Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. Labour Cost',
    span: 1,
  },
  {
    name: 'code',
    label: 'Code',
    type: 'text',
    required: true,
    placeholder: 'e.g. LAB-001',
    span: 1,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    placeholder: 'Brief description...',
    span: 2,
    rows: 3,
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

export const CATEGORY_INITIAL_DATA = [
  {
    id: 1,
    name: 'Labour Cost',
    code: 'LAB-001',
    description: 'Direct labour costs including regular and overtime wages.',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Material Cost',
    code: 'MAT-002',
    description: 'Raw materials, components, and supplies used on-site.',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Equipment Rental',
    code: 'EQP-003',
    description: 'Rental fees for heavy machinery and site equipment.',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Transport',
    code: 'TRP-004',
    description: 'Logistics and transport costs for materials and workers.',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Subcontract Work',
    code: 'SUB-005',
    description: 'Costs billed by subcontractors for specialist work.',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Safety & Welfare',
    code: 'SAF-006',
    description: 'PPE, welfare facilities, and safety compliance costs.',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Overhead',
    code: 'OVH-007',
    description: 'Site management, administration, and indirect overhead.',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Miscellaneous',
    code: 'MSC-008',
    description: 'One-off or unclassified site expenses.',
    status: 'Inactive',
  },
];

export const CATEGORY_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];