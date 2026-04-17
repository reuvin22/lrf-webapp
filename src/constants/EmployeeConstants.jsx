export const EMPLOYEE_COLUMNS = [
  { key: 'employee_code', label: 'Code' },

  { key: 'name', label: 'Name' },

  { key: 'kana', label: 'Kana' },

  { key: 'email', label: 'Email' },

  {
    key: 'role',
    label: 'Role',
    type: 'badge',
    badgeColors: {
      Administrator: 'bg-[#1D69D7] text-white',
      Accountant: 'bg-gray-100 text-gray-700',
    },
  },

  {
    key: 'salary',
    label: 'Daily Rate',
    render: (value) => `¥${Number(value || 0).toLocaleString()}`,
  },

  {
    key: 'cost_rate',
    label: 'Cost Rate',
    render: (value) => `¥${Number(value || 0).toLocaleString()}`,
  },

  {
    key: 'monthly_work_hours',
    label: 'Work Hours',
  },

  {
    key: 'commute_cost_monthly',
    label: 'Commute Cost',
    render: (value) => `¥${Number(value || 0).toLocaleString()}`,
  },

  {
    key: 'joinDate',
    label: 'Join Date',
  },

  {
    key: 'line',
    label: 'LINE',
    align: 'center',
    render: (value) => (
      <span
        className={`inline-block px-3 py-0.5 rounded-full text-xs border ${
          value === 'Linked'
            ? 'text-green-500 border-green-200 bg-green-50/30'
            : 'text-gray-400 border-gray-200 bg-gray-50/50'
        }`}
      >
        {value}
      </span>
    ),
  },

  {
    key: 'status',
    label: 'Status',
    align: 'center',
    type: 'status',
  },
];

export const EMPLOYEE_FIELDS = [
  { name: 'employee_code', label: 'Employee Code', type: 'text', required: true, placeholder: 'e.g. EMP001', span: 1 },
  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Taro Yamada', span: 1 },
  { name: 'kana', label: 'Kana', type: 'text', required: true, placeholder: 'e.g. YAMADA TARO', span: 1 },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'e.g. taro.yamada@company.com', span: 1 },
  { name: 'role', label: 'Role', type: 'select', required: true, options: ['GENERAL', 'ADMIN', 'ACCOUNTING'], span: 1 },
  { name: 'monthly_work_hours', label: 'Monthly Work Hours', type: 'number', required: true, placeholder: 'e.g. 160', span: 1 },
  { name: 'salary', label: 'Daily Rate', type: 'number', required: true, placeholder: '¥25,000', span: 1 },
  { name: 'cost_rate', label: 'Cost Rate', type: 'number', required: true, placeholder: '¥25,000', span: 1 },
  { name: 'commute_cost_monthly', label: 'Monthly Commute Cost', type: 'number', required: true, placeholder: '¥5,000', span: 1 },
  { name: 'joinDate', label: 'Join Date', type: 'date', required: true, span: 1 },
  { name: 'line', label: 'LINE Status', type: 'radio', required: true, options: ['Linked', 'Not Linked'], span: 1 },
  { name: 'status', label: 'Status', type: 'radio', required: true, options: ['ACTIVE', 'INACTIVE'], span: 1 }
];
export const EMPLOYEE_INITIAL_DATA = [
  {
    id: 1,
    employee_code: 'EMP001',
    name: 'Taro Yamada',
    kana: 'YAMADA TARO',
    email: 'taro.yamada@company.com',
    role: 'Administrator',
    monthly_work_hours: 160,
    salary: 25000,
    cost_rate: 18000,
    commute_cost_monthly: 5000,
    joinDate: '2020-04-01',
    line: 'Linked',
    status: 'Active',
  },
  {
    id: 2,
    employee_code: 'EMP002',
    name: 'Hanako Sato',
    kana: 'SATO HANAKO',
    email: 'hanako.sato@company.com',
    role: 'Accountant',
    monthly_work_hours: 150,
    salary: 22000,
    cost_rate: 17000,
    commute_cost_monthly: 4000,
    joinDate: '2021-06-15',
    line: 'Linked',
    status: 'Active',
  },
];

export const EMPLOYEE_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'NOT_ACTIVE', label: 'Resigned' },
];