import React from 'react';
import Table from '../../components/Table';

const COLUMNS = [
  { key: 'name',     label: 'Name' },
  { key: 'kana',     label: 'Kana' },
  {
    key: 'role',
    label: 'Role',
    type: 'badge',
    badgeColors: {
      'Administrator': 'bg-[#1D69D7] text-white',
      'Accountant':    'bg-gray-100 text-gray-700',
    },
  },
  { key: 'salary',   label: 'Daily Rate' },
  { key: 'joinDate', label: 'Join Date'  },
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
  { key: 'status', label: 'Status', align: 'center', type: 'status' },
];

const FIELDS = [
  { name: 'name',     label: 'Full Name',   type: 'text',   required: true,  placeholder: 'e.g. Taro Yamada',   span: 1 },
  { name: 'kana',     label: 'Kana',        type: 'text',   required: true,  placeholder: 'e.g. YAMADA TARO',   span: 1 },
  { name: 'role',     label: 'Role',        type: 'select', required: true,  options: ['Administrator', 'Accountant'], span: 1 },
  { name: 'salary',   label: 'Daily Rate',  type: 'text',   required: true,  placeholder: '¥25,000',            span: 1 },
  { name: 'joinDate', label: 'Join Date',   type: 'date',   required: true,  span: 1 },
  { name: 'line',     label: 'LINE Status', type: 'radio',  required: true,  options: ['Linked', 'Not Linked'],  span: 1 },
  { name: 'status',   label: 'Status',      type: 'radio',  required: true,  options: ['Active', 'Resigned'],   span: 1 },
];

const INITIAL_DATA = [
  { id: 1, name: 'Taro Yamada',      kana: 'YAMADA TARO',      role: 'Administrator', salary: '¥25,000', joinDate: '2020-04-01', line: 'Linked',     status: 'Active'   },
  { id: 2, name: 'Hanako Sato',      kana: 'SATO HANAKO',      role: 'Accountant',    salary: '¥22,000', joinDate: '2021-06-15', line: 'Linked',     status: 'Active'   },
  { id: 3, name: 'Ichiro Tanaka',    kana: 'TANAKA ICHIRO',    role: 'Administrator', salary: '¥23,000', joinDate: '2019-01-10', line: 'Not Linked', status: 'Active'   },
  { id: 4, name: 'Jiro Suzuki',      kana: 'SUZUKI JIRO',      role: 'Accountant',    salary: '¥20,000', joinDate: '2018-03-01', line: 'Linked',     status: 'Resigned' },
  { id: 5, name: 'Saburo Takahashi', kana: 'TAKAHASHI SABURO', role: 'Administrator', salary: '¥24,000', joinDate: '2022-09-01', line: 'Linked',     status: 'Active'   },
];

function Employee() {
  return (
    <Table
      title="Employee Master"
      columns={COLUMNS}
      data={INITIAL_DATA}
      fields={FIELDS}
      formColumns={2}
      searchKeys={['name', 'kana']}
      searchPlaceholder="Search by Name or Kana..."
      statusOptions={[
        { value: 'Active',   label: 'Active'   },
        { value: 'Resigned', label: 'Resigned' },
      ]}
      addTitle="Add New Employee"
      editTitle="Edit Employee"
      viewTitle="Employee Details"
      deleteMessage={(row) => `You're about to remove ${row.name}. This action can't be undone.`}
    />
  );
}

export default Employee;
