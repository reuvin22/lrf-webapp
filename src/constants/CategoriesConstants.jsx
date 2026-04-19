export const CATEGORY_TYPE_TABS = [
  { value: 'expense', label: 'Site Expense Category' },
  { value: 'ocr',    label: 'OCR Upload Category' },
];

export const CATEGORY_COLUMNS = [
  { key: 'name',        label: 'Category Name' },
  { key: 'status',      label: 'Status', align: 'center', type: 'status' },
  { key: 'description', label: 'Description' },
];

export const CATEGORY_FIELDS = [
  {
    name: 'category_type',
    label: 'Category Type',
    type: 'radio',
    required: true,
    editDisabled: true,
    options: [
      { value: 'expense', label: 'Site Expense Category' },
      { value: 'ocr',    label: 'OCR Upload Category' },
    ],
    span: 2,
  },
  { name: 'category_name',        label: 'Category Name', type: 'text',     required: true,  placeholder: 'e.g. Labour Cost',     span: 1 },
  { name: 'status',      label: 'Status', type: 'radio',    required: true,  options: ['ACTIVE', 'INACTIVE'], span: 1 },
  { name: 'description', label: 'Description',   type: 'textarea', required: false, placeholder: 'Brief description...', span: 2, rows: 3 },
];

export const CATEGORY_STATUS_OPTIONS = [
  { value: 'ACTIVE',   label: 'ACTIVE' },
  { value: 'INACTIVE', label: 'INACTIVE' },
];
