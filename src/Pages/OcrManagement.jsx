import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import OcrViewModal from '../components/modals/OcrViewModal';
import { OCR_COLUMNS, OCR_STATUS_OPTIONS } from '../constants/OcrConstants';
import { useGetOcrUploadsQuery, useUpdateOcrUploadMutation } from '../store/api/OcrApi';
import { useGetEmployeesQuery } from '../store/api/master/EmployeeApi';
import { useGetOcrCategoriesQuery } from '../store/api/master/CategoryApi';

function OcrManagement() {
  const [searchParams] = useSearchParams();
  const initialStatus  = searchParams.get('status') ?? '';

  const { data = [], isLoading }  = useGetOcrUploadsQuery();
  const { data: employees = [] }  = useGetEmployeesQuery();
  const { data: categories = [] } = useGetOcrCategoriesQuery();
  const [updateOcrUpload]         = useUpdateOcrUploadMutation();

  const enrichedData = useMemo(() =>
    data.map((item, index) => {
      const cat = item.category;
      const categoryName = typeof cat === 'object' && cat !== null
        ? (cat.category_name ?? cat.name ?? '')
        : (item.category_name ?? cat ?? '');
      return {
        ...item,
        row_number:    index + 1,
        uploader_name: employees.find((e) => String(e.id) === String(item.uploaded_by))?.name ?? item.uploaded_by,
        category_name: categoryName,
      };
    }),
    [data, employees],
  );

  const categoryFilterOptions = useMemo(() =>
    categories.map((c) => ({ value: c.category_name ?? c.name, label: c.category_name ?? c.name })),
    [categories],
  );

  const [selected, setSelected]         = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const runUpdate = async (id, payload, successMsg) => {
    setActionLoading(true);
    try {
      await updateOcrUpload({ id, ...payload }).unwrap();
      toast.success(successMsg);
      setSelected(null);
    } catch {
      toast.error('Action failed. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <Table
        title="OCR Management"
        columns={OCR_COLUMNS}
        data={enrichedData}
        loading={isLoading}
        searchKeys={['uploader_name', 'status']}
        searchPlaceholder="Search by Uploader or Status..."
        statusOptions={OCR_STATUS_OPTIONS}
        statusFilterKey="status"
        initialStatusFilter={initialStatus}
        extraFilters={[
          { key: 'category_name', label: 'Categories', placeholder: 'All Categories', options: categoryFilterOptions },
        ]}
        onRowClick={setSelected}
      />

      <OcrViewModal
        record={selected}
        categories={categories}
        onClose={() => setSelected(null)}
        isLoading={actionLoading}
        onConfirm={(rec)               => runUpdate(rec.upload_id, { status: 'COMPLETED' },  'Marked as completed.')}
        onReturnError={(rec)           => runUpdate(rec.upload_id, { status: 'ERROR' },      'Returned as error.')}
        onReprocess={(rec)             => runUpdate(rec.upload_id, { status: 'PROCESSING' }, 'Reprocessing started.')}
        onChangeCategory={(rec, catId) => runUpdate(rec.upload_id, { category_id: catId },   'Category updated.')}
      />
    </>
  );
}

export default OcrManagement;
