import React from 'react';
import Table from '../../components/Table';
import {
  SITE_ASSIGNMENTS_COLUMNS,
  SITE_ASSIGNMENTS_FIELDS,
  SITE_ASSIGNMENTS_INITIAL_DATA,
  SITE_ASSIGNMENT_STATUS_OPTIONS,
} from '../../constants/SiteAssignmentConstants';

function SiteAssignments() {
  return (
    <Table
      title="Site Assignments"
      columns={SITE_ASSIGNMENTS_COLUMNS}
      data={SITE_ASSIGNMENTS_INITIAL_DATA}
      fields={SITE_ASSIGNMENTS_FIELDS}
      formColumns={2}
      searchKeys={['site', 'subcontractor', 'worker']}
      searchPlaceholder="Search by Site, Subcontractor or Worker..."
      statusOptions={SITE_ASSIGNMENT_STATUS_OPTIONS}
      addTitle="Add New Assignment"
      editTitle="Edit Assignment"
      viewTitle="Assignment Details"
      deleteMessage={(row) =>
        `You're about to remove the assignment for ${row.worker} at ${row.site}. This action can't be undone.`
      }
    />
  );
}

export default SiteAssignments;