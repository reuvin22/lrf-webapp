import React, { useMemo } from 'react';
import Table from '../../components/Table';
import {
  WORKERS_COLUMNS,
  WORKERS_FIELDS,
  WORKER_STATUS_OPTIONS,
} from '../../constants/WorkersConstants';
import { useCreateWorkerMutation, useDeleteWorkerMutation, useGetWorkersQuery, useUpdateWorkerMutation } from '../../store/api/master/WorkerApi';
import { useGetSubcontractorsQuery } from '../../store/api/master/SubcontractorApi';

function Workers() {
  const { data = [], isLoading } = useGetWorkersQuery();
  const { data: subcontractors = [] } = useGetSubcontractorsQuery();
  console.log('THI IS DATA: ', data)
  const [createWorker] = useCreateWorkerMutation();
  const [updateWorker] = useUpdateWorkerMutation();
  const [deleteWorker] = useDeleteWorkerMutation();

  const fields = useMemo(
    () =>
      WORKERS_FIELDS.map((f) =>
        f.name === 'subcontractor_id' ? { ...f, options: subcontractors } : f,
      ),
    [subcontractors],
  );

  const enrichedData = useMemo(
    () =>
      data.map((w) => ({
        ...w,
        subcontractor:
          subcontractors.find((s) => s.id === w.subcontractor_id)?.company_name ??
          w.subcontractor ??
          w.subcontractor_id,
      })),
    [data, subcontractors],
  );

  const handleAdd = async (payload) => {
    try {
      const { id: _id, ...data } = payload;
      console.log('handleAdd payload:', data);
      await createWorker(data).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      const data = { ...payload, worker_id: payload.worker_id ?? payload.id };
      console.log('handleEdit payload:', data);
      await updateWorker(data).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteWorker(row.worker_id).unwrap();
    } catch (err) {
      throw err;
    }
  };

  return (
    <Table
      title="Workers"
      columns={WORKERS_COLUMNS}
      data={enrichedData}
      fields={fields}
      formColumns={2}
      searchKeys={['name', 'name_kana', 'subcontractor']}
      searchPlaceholder="Search by Name, Kana or Subcontractor..."
      statusOptions={WORKER_STATUS_OPTIONS}
      addTitle="Add New Worker"
      editTitle="Edit Worker"
      viewTitle="Worker Details"
      deleteMessage={(row) =>
        `You're about to remove ${row.name}. This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={isLoading}
    />
  );
}

export default Workers;
