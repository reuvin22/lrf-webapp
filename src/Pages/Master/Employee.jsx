import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { employeeApi } from '../../api/Api';

import {
  EMPLOYEE_COLUMNS,
  EMPLOYEE_FIELDS,
  EMPLOYEE_INITIAL_DATA,
  EMPLOYEE_STATUS_OPTIONS
} from '../../constants/EmployeeConstants';

function Employee() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const handleAdd = async (payload) => {
    try {
      await employeeApi.create(payload);
    } catch (err) {
      console.error('Failed to add employee:', err);
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      await employeeApi.update(payload.employee_id, payload);
    } catch (err) {
      console.error('Failed to update employee:', err);
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await employeeApi.delete(row.employee_id);
    } catch (err) {
      console.error('Failed to delete employee:', err);
      throw err;
    }
  };

  const handleGet = async () => {
    setLoading(true)
    try {
      const res = await employeeApi.getAll();
      // Normalize employee_id → id so Table's internal key/match logic works,
      // while keeping employee_id on the record for API calls (edit/delete).
      const rows = (res.data.data ?? []).map((emp) => ({ ...emp, id: emp.employee_id }));
      setData(rows)
    } catch (err) {
      console.error('Failed to get employee:', err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGet()
  }, [])
  
  return (
    <Table
      title="Employee Master"
      columns={EMPLOYEE_COLUMNS}
      data={data}
      loading={loading}
      fields={EMPLOYEE_FIELDS}
      formColumns={2}
      searchKeys={['name', 'kana']}
      searchPlaceholder="Search by Name or Kana..."
      statusOptions={EMPLOYEE_STATUS_OPTIONS}
      addTitle="Add New Employee"
      editTitle="Edit Employee"
      viewTitle="Employee Details"
      deleteMessage={(row) =>
        `You're about to remove ${row.name}. This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default Employee;