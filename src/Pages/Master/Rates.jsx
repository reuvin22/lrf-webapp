import React, { useMemo } from 'react';
import Table from '../../components/Table';
import { RATES_COLUMNS, RATES_FIELDS } from '../../constants/RatesConstants';
import {
  useGetRatesQuery,
  useCreateRateMutation,
  useUpdateRateMutation,
  useDeleteRateMutation,
} from '../../store/api/master/RatesApi';
import { useGetSitesQuery }          from '../../store/api/master/SiteApi';
import { useGetEmployeesQuery }      from '../../store/api/master/EmployeeApi';
import { useGetWorkersQuery }        from '../../store/api/master/WorkerApi';
import { useGetSubcontractorsQuery } from '../../store/api/master/SubcontractorApi';

function Rates() {
  const { data = [], isLoading } = useGetRatesQuery();
  const { data: sites          = [] } = useGetSitesQuery();
  const { data: employees      = [] } = useGetEmployeesQuery();
  const { data: workers        = [] } = useGetWorkersQuery();
  const { data: subcontractors = [] } = useGetSubcontractorsQuery();

  const [createRate] = useCreateRateMutation();
  const [updateRate] = useUpdateRateMutation();
  const [deleteRate] = useDeleteRateMutation();

  const employeeOptions      = useMemo(() => employees.filter((e) => e.status === 'ACTIVE' || e.status === true || e.status === 1).map((e) => ({ id: e.id, label: e.name })), [employees]);
  const subcontractorOptions = useMemo(() => subcontractors.map((s) => ({ id: s.id, label: s.company_name })), [subcontractors]);
  const workerOptions        = useMemo(() => workers.map((w) => ({ id: w.id, label: w.name })), [workers]);

  const resolveTargetName = (rate) => {
    const id = String(rate.target_id ?? '');
    if (!id) return '—';
    switch (rate.target_type) {
      case 'EMPLOYEE':
        return employees.find((e) => String(e.id) === id)?.name ?? id;
      case 'SUBCONTRACTOR':
        return subcontractors.find((s) => String(s.id) === id)?.company_name ?? id;
      case 'SUBCONTRACTOR_WORKER':
        return workers.find((w) => String(w.id) === id)?.name ?? id;
      default:
        return id;
    }
  };

  const enrichedData = useMemo(() =>
    data.map((rate) => ({
      ...rate,
      target_name: resolveTargetName(rate),
      site_name: sites.find((s) => String(s.id) === String(rate.site_id))?.site_name ?? rate.site_id,
    })),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [data, sites, employees, subcontractors, workers]);

  const fields = useMemo(() =>
    RATES_FIELDS.map((f) => {
      if (f.name === 'target_type') {
        return { ...f, clearOnChange: ['target_id'] };
      }
      if (f.name === 'target_id') {
        return {
          ...f,
          options: (values) => {
            switch (values.target_type) {
              case 'EMPLOYEE':           return employeeOptions;
              case 'SUBCONTRACTOR':      return subcontractorOptions;
              case 'SUBCONTRACTOR_WORKER': return workerOptions;
              default:                   return [];
            }
          },
        };
      }
      if (f.name === 'site_id') return { ...f, options: sites };
      return f;
    }),
    [employeeOptions, subcontractorOptions, workerOptions, sites],
  );

  const handleAdd = async (payload) => {
    const { id: _id, ...data } = payload;
    await createRate(data).unwrap();
  };

  const handleEdit = async (payload) => {
    await updateRate(payload).unwrap();
  };

  const handleDelete = async (row) => {
    await deleteRate(row.rate_id).unwrap();
  };

  return (
    <Table
      title="Rates"
      columns={RATES_COLUMNS}
      data={enrichedData}
      fields={fields}
      formColumns={2}
      loading={isLoading}
      searchKeys={['rate_type', 'target_type', 'target_name', 'site_name']}
      searchPlaceholder="Search by Rate Type or Target..."
      addTitle="Add New Rate"
      editTitle="Edit Rate"
      viewTitle="Rate Details"
      deleteMessage={(row) =>
        `You're about to remove the ${row.rate_type} rate for ${row.target_name}. This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default Rates;
