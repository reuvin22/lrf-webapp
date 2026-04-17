import React from 'react';
import Table from '../../components/Table';

import {
  CATEGORY_COLUMNS,
  CATEGORY_FIELDS,
  CATEGORY_INITIAL_DATA,
  CATEGORY_STATUS_OPTIONS,
} from '../../constants/CategoriesConstants';

function Categories() {
  return (
    <Table
      title="Categories"
      columns={CATEGORY_COLUMNS}
      data={CATEGORY_INITIAL_DATA}
      fields={CATEGORY_FIELDS}
      formColumns={2}
      searchKeys={['name', 'code', 'description']}
      searchPlaceholder="Search by Name or Code..."
      statusOptions={CATEGORY_STATUS_OPTIONS}
      addTitle="Add New Category"
      editTitle="Edit Category"
      viewTitle="Category Details"
      deleteMessage={(row) =>
        `You're about to remove "${row.name}". This action can't be undone.`
      }
    />
  );
}

export default Categories;