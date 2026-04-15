import React from 'react';
import Table from '../../components/Table';

const SITE_OPTIONS    = ['Shinjuku Tower A', 'Osaka Refinery B', 'Yokohama Port C', 'Nagoya Station D', 'Sapporo Complex E'];
const SUB_OPTIONS     = ['Tanaka Construction Co.', 'Kato Building Services', 'Matsumoto Works', 'Hayashi Contractors', 'Inoue Engineering'];

const COLUMNS = [
  { key: 'site',          label: 'Site'          },
  { key: 'subcontractor', label: 'Subcontractor' },
  { key: 'worker',        label: 'Worker'        },
  { key: 'startDate',     label: 'Start Date'    },
  { key: 'endDate',       label: 'End Date'      },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    render: (value) => {
      const colors = {
        Active:    'bg-[#0F9D7A]',
        Completed: 'bg-[#1D69D7]',
      };
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-bold text-white ${colors[value] ?? 'bg-gray-400'}`}>
          {value}
        </span>
      );
    },
  },
];

const FIELDS = [
  { name: 'site',          label: 'Site',          type: 'select', required: true,  options: SITE_OPTIONS, span: 1 },
  { name: 'subcontractor', label: 'Subcontractor', type: 'select', required: true,  options: SUB_OPTIONS,  span: 1 },
  { name: 'worker',        label: 'Worker',        type: 'text',   required: true,  placeholder: 'e.g. Taro Yamada', span: 1 },
  { name: 'startDate',     label: 'Start Date',    type: 'date',   required: true,  span: 1 },
  { name: 'endDate',       label: 'End Date',      type: 'date',   required: false, span: 1 },
  { name: 'status',        label: 'Status',        type: 'radio',  required: true,  options: ['Active', 'Completed'], span: 1 },
];

const INITIAL_DATA = [
  { id: 1,  site: 'Shinjuku Tower A',  subcontractor: 'Tanaka Construction Co.', worker: 'Taro Yamada',     startDate: '2026-01-06', endDate: '2026-03-31', status: 'Active'    },
  { id: 2,  site: 'Shinjuku Tower A',  subcontractor: 'Tanaka Construction Co.', worker: 'Hiroshi Ito',     startDate: '2026-01-06', endDate: '2026-03-31', status: 'Active'    },
  { id: 3,  site: 'Osaka Refinery B',  subcontractor: 'Kato Building Services',  worker: 'Hanako Sato',     startDate: '2026-01-06', endDate: '2026-02-28', status: 'Completed' },
  { id: 4,  site: 'Osaka Refinery B',  subcontractor: 'Kato Building Services',  worker: 'Ryo Watanabe',    startDate: '2026-01-06', endDate: '2026-03-31', status: 'Active'    },
  { id: 5,  site: 'Yokohama Port C',   subcontractor: 'Matsumoto Works',         worker: 'Ichiro Tanaka',   startDate: '2026-02-01', endDate: '',           status: 'Active'    },
  { id: 6,  site: 'Yokohama Port C',   subcontractor: 'Matsumoto Works',         worker: 'Yuki Kobayashi',  startDate: '2026-02-01', endDate: '2026-03-15', status: 'Completed' },
  { id: 7,  site: 'Nagoya Station D',  subcontractor: 'Hayashi Contractors',     worker: 'Satoshi Nakamura',startDate: '2026-01-15', endDate: '',           status: 'Active'    },
  { id: 8,  site: 'Sapporo Complex E', subcontractor: 'Inoue Engineering',       worker: 'Kenji Suzuki',    startDate: '2026-03-01', endDate: '',           status: 'Active'    },
];

function SiteAssignments() {
  return (
    <Table
      title="Site Assignments"
      columns={COLUMNS}
      data={INITIAL_DATA}
      fields={FIELDS}
      formColumns={2}
      searchKeys={['site', 'subcontractor', 'worker']}
      searchPlaceholder="Search by Site, Subcontractor or Worker..."
      statusOptions={[
        { value: 'Active',    label: 'Active'    },
        { value: 'Completed', label: 'Completed' },
      ]}
      addTitle="Add New Assignment"
      editTitle="Edit Assignment"
      viewTitle="Assignment Details"
      deleteMessage={(row) => `You're about to remove the assignment for ${row.worker} at ${row.site}. This action can't be undone.`}
    />
  );
}

export default SiteAssignments;
