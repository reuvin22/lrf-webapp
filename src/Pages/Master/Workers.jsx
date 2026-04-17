import React from 'react';
import Table from '../../components/Table';
import {
  WORKERS_COLUMNS,
  WORKERS_FIELDS,
  WORKERS_INITIAL_DATA,
  WORKER_STATUS_OPTIONS,
} from '../../constants/WorkersConstants';

function Workers() {
  return (
    <Table
      title="Workers"
      columns={WORKERS_COLUMNS}
      data={WORKERS_INITIAL_DATA}
      fields={WORKERS_FIELDS}
      formColumns={2}
      searchKeys={['name', 'kana', 'subcontractor']}
      searchPlaceholder="Search by Name, Kana or Subcontractor..."
      statusOptions={WORKER_STATUS_OPTIONS}
      addTitle="Add New Worker"
      editTitle="Edit Worker"
      viewTitle="Worker Details"
      deleteMessage={(row) =>
        `You're about to remove ${row.name}. This action can't be undone.`
      }
    />
  );
}

export default Workers;