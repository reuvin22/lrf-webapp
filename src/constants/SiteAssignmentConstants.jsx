import { formatDate } from '../utils/dateUtils';

export const SITE_ASSIGNMENTS_COLUMNS = [
  { key: 'site_name',     label: 'Site' },
  { key: 'employee_name', label: 'Employee' },
  { key: 'is_leader',     label: 'Is Leader?', render: (v) => (v ? 'Yes' : 'No') },
  { key: 'start_date',    label: 'Start Date',  render: (v) => formatDate(v) },
  { key: 'end_date',      label: 'End Date',    render: (v) => formatDate(v) },
];

export const SITE_ASSIGNMENTS_FIELDS = [
  {
    name: 'site_id',
    label: 'Site',
    type: 'autocomplete',
    required: true,
    placeholder: 'Search site...',
    valueKey: 'id',
    labelKey: 'site_name',
    options: [],
    span: 1,
  },
  {
    name: 'employee_id',
    label: 'Employee',
    type: 'autocomplete',
    required: true,
    placeholder: 'Search employee...',
    valueKey: 'id',
    labelKey: 'name',
    displayKey: 'employee_name',
    options: [],
    span: 1,
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
    name: 'is_leader',
    label: 'Is Leader',
    type: 'checkbox',
    checkboxLabel: 'Mark as leader',
    span: 1,
  },
];
