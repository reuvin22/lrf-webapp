import { formatDate } from '../utils/dateUtils';

export const CALENDAR_COLUMNS = [
  { key: 'date',          label: 'Date',     render: (v) => formatDate(v) },
  { key: 'day_type_name', label: 'Day Type' },
  { key: 'note',          label: 'Note' },
];

export const CALENDAR_FIELDS = [
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
    span: 1,
  },
  {
    name: 'day_type',
    label: 'Day Type',
    type: 'select',
    required: true,
    placeholder: 'Select day type...',
    valueKey: 'value',
    labelKey: 'label',
    options: [],
    span: 1,
  },
  {
    name: 'note',
    label: 'Note',
    type: 'textarea',
    required: false,
    placeholder: 'Optional note...',
    rows: 3,
    span: 2,
  },
];
