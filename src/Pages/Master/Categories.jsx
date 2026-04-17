import { useState } from 'react';
import Table from '../../components/Table';

import {
  CATEGORY_COLUMNS,
  CATEGORY_FIELDS,
  CATEGORY_STATUS_OPTIONS,
  CATEGORY_TYPE_TABS,
} from '../../constants/CategoriesConstants';

import {
  useGetCategoriesQuery,
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,
  useGetOcrCategoriesQuery,
  useCreateOcrCategoryMutation,
  useUpdateOcrCategoryMutation,
  useDeleteOcrCategoryMutation,
} from '../../store/api/master/CategoryApi';

function Categories() {
  const [activeTab, setActiveTab] = useState('expense');

  // ── Expense queries / mutations ────────────────────────────────────────────
  const { data: expenseData = [], isLoading: expenseLoading } = useGetCategoriesQuery();
  const [createExpense]  = useCreateCategoriesMutation();
  const [updateExpense]  = useUpdateCategoriesMutation();
  const [deleteExpense]  = useDeleteCategoriesMutation();

  // ── OCR queries / mutations ────────────────────────────────────────────────
  const { data: ocrData = [], isLoading: ocrLoading } = useGetOcrCategoriesQuery();
  const [createOcr] = useCreateOcrCategoryMutation();
  const [updateOcr] = useUpdateOcrCategoryMutation();
  const [deleteOcr] = useDeleteOcrCategoryMutation();

  // ── Route to correct endpoint based on category_type ──────────────────────
  const handleAdd = async (payload) => {
    try {
      if (payload.category_type === 'ocr') {
        await createOcr(payload).unwrap();
      } else {
        await createExpense(payload).unwrap();
      }
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      if (payload.category_type === 'ocr') {
        await updateOcr(payload).unwrap();
      } else {
        await updateExpense(payload).unwrap();
      }
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      if (row.category_type === 'ocr') {
        await deleteOcr(row.category_id).unwrap();
      } else {
        await deleteExpense(row.category_id).unwrap();
      }
    } catch (err) {
      throw err;
    }
  };

  const isExpense = activeTab === 'expense';

  return (
    <Table
      title="Categories"
      columns={CATEGORY_COLUMNS}
      data={isExpense ? expenseData : ocrData}
      loading={isExpense ? expenseLoading : ocrLoading}
      fields={CATEGORY_FIELDS}
      formColumns={2}
      defaultValues={{ category_type: activeTab }}
      segmentTabs={CATEGORY_TYPE_TABS}
      activeSegment={activeTab}
      onSegmentChange={setActiveTab}
      searchKeys={['name', 'code', 'description']}
      searchPlaceholder="Search by Name or Code..."
      statusOptions={CATEGORY_STATUS_OPTIONS}
      addTitle="Add New Category"
      editTitle="Edit Category"
      viewTitle="Category Details"
      deleteMessage={(row) =>
        `You're about to remove "${row.name}". This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default Categories;
