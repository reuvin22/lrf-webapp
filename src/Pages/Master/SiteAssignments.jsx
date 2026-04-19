import React, { useMemo } from 'react';
import Table from '../../components/Table';
import {
  SITE_ASSIGNMENTS_COLUMNS,
  SITE_ASSIGNMENTS_FIELDS,
} from '../../constants/SiteAssignmentConstants';
import {
  useGetSiteAssignmentsQuery,
  useCreateSiteAssignmentMutation,
  useUpdateSiteAssignmentMutation,
  useDeleteSiteAssignmentMutation,
} from '../../store/api/master/SiteAssignmentApi';
import { useGetSitesQuery }     from '../../store/api/master/SiteApi';
import { useGetEmployeesQuery } from '../../store/api/master/EmployeeApi';

function SiteAssignments() {
  const { data = [], isLoading } = useGetSiteAssignmentsQuery();
  const { data: sites = [] }     = useGetSitesQuery();
  const { data: employees = [] } = useGetEmployeesQuery();


  const [createSiteAssignment] = useCreateSiteAssignmentMutation();
  const [updateSiteAssignment] = useUpdateSiteAssignmentMutation();
  const [deleteSiteAssignment] = useDeleteSiteAssignmentMutation();

  const fields = useMemo(
    () =>
      SITE_ASSIGNMENTS_FIELDS.map((f) => {
        if (f.name === 'site_id')     return { ...f, options: sites };
        if (f.name === 'employee_id') return { ...f, options: employees.filter((e) => e.status === 'ACTIVE' || e.status === true || e.status === 1) };
        return f;
      }),
    [sites, employees],
  );

  const enrichedData = useMemo(() => data, [data]);

  const handleAdd = async (payload) => {
    try {
      const { id: _id, ...data } = payload;
      await createSiteAssignment(data).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      await updateSiteAssignment(payload).unwrap();
      console.log(payload)
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteSiteAssignment(row.site_assignment_id).unwrap();
    } catch (err) {
      throw err;
    }
  };

  return (
    <Table
      title="Site Assignments"
      columns={SITE_ASSIGNMENTS_COLUMNS}
      data={enrichedData}
      fields={fields}
      formColumns={2}
      searchKeys={['site_name', 'name']}
      searchPlaceholder="Search by Site or Employee..."
      addTitle="Add New Assignment"
      editTitle="Edit Assignment"
      viewTitle="Assignment Details"
      deleteMessage={(row) =>
        `You're about to remove the assignment for ${row.employee_name} at ${row.site_name}. This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={isLoading}
    />
  );
}

export default SiteAssignments;
