import React from 'react';
import Table from '../../components/Table';
import {
  SUBCONTRACTORS_COLUMNS,
  SUBCONTRACTORS_FIELDS,
  SUBCONTRACTORS_INITIAL_DATA,
  SUBCONTRACTOR_STATUS_OPTIONS,
} from '../../constants/SubcontractorsConstants';

function Subcontractors() {
  return (
    <Table
      title="Subcontractors"
      columns={SUBCONTRACTORS_COLUMNS}
      data={SUBCONTRACTORS_INITIAL_DATA}
      fields={SUBCONTRACTORS_FIELDS}
      formColumns={2}
      searchKeys={['name', 'kana', 'contact']}
      searchPlaceholder="Search by Name, Kana or Contact..."
      statusOptions={SUBCONTRACTOR_STATUS_OPTIONS}
      addTitle="Add New Subcontractor"
      editTitle="Edit Subcontractor"
      viewTitle="Subcontractor Details"
      deleteMessage={(row) =>
        `You're about to remove "${row.name}". This action can't be undone.`
      }
    />
  );
}

export default Subcontractors;