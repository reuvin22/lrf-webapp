import React from 'react';
import Table from '../../components/Table';

const COLUMNS = [
  { key: 'name',     label: 'Site Name' },
  { key: 'code',     label: 'Code'      },
  { key: 'location', label: 'Location'  },
  { key: 'status',   label: 'Status', align: 'center', type: 'status' },
];

const FIELDS = [
  { name: 'name',     label: 'Site Name', type: 'text',  required: true,  placeholder: 'e.g. Shinjuku Tower A',   span: 1 },
  { name: 'code',     label: 'Site Code', type: 'text',  required: true,  placeholder: 'e.g. SJK-001',            span: 1 },
  { name: 'location', label: 'Location',  type: 'text',  required: true,  placeholder: 'e.g. Shinjuku, Tokyo',    span: 2 },
  { name: 'status',   label: 'Status',    type: 'radio', required: true,  options: ['Active', 'Inactive'],        span: 1 },
];

const INITIAL_DATA = [
  { id: 1, name: 'Shinjuku Tower A',  code: 'SJK-001', location: 'Shinjuku, Tokyo',    status: 'Active'   },
  { id: 2, name: 'Osaka Refinery B',  code: 'OSK-002', location: 'Namba, Osaka',       status: 'Active'   },
  { id: 3, name: 'Yokohama Port C',   code: 'YKH-003', location: 'Yokohama, Kanagawa', status: 'Active'   },
  { id: 4, name: 'Nagoya Station D',  code: 'NGY-004', location: 'Nakamura, Nagoya',   status: 'Active'   },
  { id: 5, name: 'Sapporo Complex E', code: 'SPR-005', location: 'Chuo, Sapporo',      status: 'Inactive' },
];

function Sites() {
  return (
    <Table
      title="Sites"
      columns={COLUMNS}
      data={INITIAL_DATA}
      fields={FIELDS}
      formColumns={2}
      searchKeys={['name', 'code', 'location']}
      searchPlaceholder="Search by Name, Code or Location..."
      statusOptions={[
        { value: 'Active',   label: 'Active'   },
        { value: 'Inactive', label: 'Inactive' },
      ]}
      addTitle="Add New Site"
      editTitle="Edit Site"
      viewTitle="Site Details"
      deleteMessage={(row) => `You're about to remove "${row.name}". This action can't be undone.`}
    />
  );
}

export default Sites;
