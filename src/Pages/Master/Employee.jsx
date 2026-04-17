import React from 'react';
import Table from '../../components/Table';
import {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from '../../store/api/master/EmployeeApi';
import {
  EMPLOYEE_COLUMNS,
  EMPLOYEE_FIELDS,
  EMPLOYEE_STATUS_OPTIONS,
} from '../../constants/EmployeeConstants';

function Employee() {
  const { data = [], isLoading } = useGetEmployeesQuery();

  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleAdd = async (payload) => {
    try {
      await createEmployee(payload).unwrap();
    } catch (err) {
      console.error('Failed to add employee:', err);
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      await updateEmployee(payload).unwrap();
    } catch (err) {
      console.error('Failed to update employee:', err);
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteEmployee(row.employee_id).unwrap();
    } catch (err) {
      console.error('Failed to delete employee:', err);
      throw err;
    }
  };

  return (
    <Table
      title="Employee Master"
      columns={EMPLOYEE_COLUMNS}
      data={data}
      loading={isLoading}
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
