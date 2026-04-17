import React from 'react';
import Table from '../../components/Table';
import {
  WORKERS_COLUMNS,
  WORKERS_FIELDS,
  WORKERS_INITIAL_DATA,
  WORKER_STATUS_OPTIONS,
} from '../../constants/WorkersConstants';
import { useCreateWorkerMutation, useDeleteWorkerMutation, useGetWorkersQuery, useUpdateWorkerMutation } from '../../store/api/master/WorkerApi';

function Workers() {
  const { data = [], isLoading } = useGetWorkersQuery();

  const [createWorker] = useCreateWorkerMutation();
  const [updateWorker] = useUpdateWorkerMutation();
  const [deleteWorker] = useDeleteWorkerMutation();

  const handleAdd = async (payload) => {
    try {
      await createWorker(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      await updateWorker(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteWorker(row.site_worker_id).unwrap();
    } catch (err) {
      throw err;
    }
  };

  return (
    <Table
      title="Workers"
      columns={WORKERS_COLUMNS}
      data={data}
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
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={isLoading}
    />
  );
}

export default Workers;