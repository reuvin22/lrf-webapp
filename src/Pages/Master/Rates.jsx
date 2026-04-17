import React from 'react';
import Table from '../../components/Table';
import {
  RATES_COLUMNS,
  RATES_FIELDS,
  RATES_INITIAL_DATA,
  RATE_STATUS_OPTIONS,
} from '../../constants/RatesConstants';

function Rates() {
  return (
    <Table
      title="Rates"
      columns={RATES_COLUMNS}
      data={RATES_INITIAL_DATA}
      fields={RATES_FIELDS}
      formColumns={2}
      searchKeys={['role']}
      searchPlaceholder="Search by Role..."
      statusOptions={RATE_STATUS_OPTIONS}
      addTitle="Add New Rate"
      editTitle="Edit Rate"
      viewTitle="Rate Details"
      deleteMessage={(row) =>
        `You're about to remove the rate for ${row.role} (effective ${row.effectiveDate}). This action can't be undone.`
      }
    />
  );
}

export default Rates;