import React from 'react';
import Table from '../../components/Table';
import {
  SITES_COLUMNS,
  SITES_FIELDS,
  SITES_INITIAL_DATA,
  SITE_STATUS_OPTIONS,
} from '../../constants/SitesConstants';

function Sites() {
  return (
    <Table
      title="Sites"
      columns={SITES_COLUMNS}
      data={SITES_INITIAL_DATA}
      fields={SITES_FIELDS}
      formColumns={2}
      searchKeys={['name', 'code', 'location']}
      searchPlaceholder="Search by Name, Code or Location..."
      statusOptions={SITE_STATUS_OPTIONS}
      addTitle="Add New Site"
      editTitle="Edit Site"
      viewTitle="Site Details"
      deleteMessage={(row) =>
        `You're about to remove "${row.name}". This action can't be undone.`
      }
    />
  );
}

export default Sites;