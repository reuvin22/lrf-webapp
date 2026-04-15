import React from 'react';
import Table from '../../components/Table';
import { WORKER_ROLES } from '../../constants/Constants';

const COLUMNS = [
  { key: 'role',          label: 'Worker Role'    },
  { key: 'dailyRate',     label: 'Daily Rate'     },
  { key: 'overtimeRate',  label: 'Overtime Rate'  },
  { key: 'effectiveDate', label: 'Effective Date' },
  { key: 'status',        label: 'Status', align: 'center', type: 'status' },
];

const FIELDS = [
  { name: 'role',          label: 'Worker Role',    type: 'select', required: true,  options: Object.values(WORKER_ROLES), span: 1 },
  { name: 'dailyRate',     label: 'Daily Rate',     type: 'text',   required: true,  placeholder: '¥25,000',              span: 1 },
  { name: 'overtimeRate',  label: 'Overtime Rate',  type: 'text',   required: false, placeholder: '¥35,000',              span: 1 },
  { name: 'effectiveDate', label: 'Effective Date', type: 'date',   required: true,  span: 1 },
  { name: 'status',        label: 'Status',         type: 'radio',  required: true,  options: ['Active', 'Inactive'],     span: 1 },
];

const INITIAL_DATA = [
  { id: 1, role: 'Carpenter',        dailyRate: '¥25,000', overtimeRate: '¥35,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 2, role: 'Steel Worker',     dailyRate: '¥28,000', overtimeRate: '¥38,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 3, role: 'Electrician',      dailyRate: '¥30,000', overtimeRate: '¥42,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 4, role: 'Plumber',          dailyRate: '¥27,000', overtimeRate: '¥37,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 5, role: 'Scaffolder',       dailyRate: '¥22,000', overtimeRate: '¥31,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 6, role: 'Concrete Worker',  dailyRate: '¥23,000', overtimeRate: '¥32,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 7, role: 'Machine Operator', dailyRate: '¥32,000', overtimeRate: '¥45,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 8, role: 'Safety Officer',   dailyRate: '¥35,000', overtimeRate: '¥48,000', effectiveDate: '2026-01-01', status: 'Active'   },
  { id: 9, role: 'Carpenter',        dailyRate: '¥22,000', overtimeRate: '¥30,000', effectiveDate: '2025-01-01', status: 'Inactive' },
];

function Rates() {
  return (
    <Table
      title="Rates"
      columns={COLUMNS}
      data={INITIAL_DATA}
      fields={FIELDS}
      formColumns={2}
      searchKeys={['role']}
      searchPlaceholder="Search by Role..."
      statusOptions={[
        { value: 'Active',   label: 'Active'   },
        { value: 'Inactive', label: 'Inactive' },
      ]}
      addTitle="Add New Rate"
      editTitle="Edit Rate"
      viewTitle="Rate Details"
      deleteMessage={(row) => `You're about to remove the rate for ${row.role} (effective ${row.effectiveDate}). This action can't be undone.`}
    />
  );
}

export default Rates;
