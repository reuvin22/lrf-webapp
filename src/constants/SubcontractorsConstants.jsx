export const SUBCONTRACTORS_COLUMNS = [
  { key: 'company_name',   label: 'Company Name' },
  { key: 'contact_person', label: 'Contact Person' },
  { key: 'contact_phone',  label: 'Contact Phone' },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    render: (value) => {
      const active = value === true || value === 1;
      return (
        <span
          className={`px-3 py-1 rounded-md text-xs font-bold text-white ${
            active ? 'bg-[#0F9D7A]' : 'bg-[#EF4444]'
          }`}
        >
          {active ? 'ACTIVE' : 'TERMINATED'}
        </span>
      );
    },
  },
];

export const SUBCONTRACTORS_FIELDS = [
  {
    name: 'company_name',
    label: 'Company Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. Tanaka Construction Co.',
    span: 1,
  },
  {
    name: 'contact_person',
    label: 'Contact Person',
    type: 'text',
    required: true,
    placeholder: 'e.g. Kenji Tanaka',
    span: 1,
  },
  {
    name: 'contact_phone',
    label: 'Contact Phone',
    type: 'text',
    required: false,
    placeholder: 'e.g. 03-1234-5678',
    span: 1,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'radio',
    required: true,
    options: [
      { value: true,  label: 'Active' },
      { value: false, label: 'Terminated' },
    ],
    span: 1,
  },
];

export const SUBCONTRACTOR_STATUS_OPTIONS = [
  { value: true,  label: 'Active' },
  { value: false, label: 'Terminated' },
];
